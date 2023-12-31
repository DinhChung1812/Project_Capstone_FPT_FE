import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/svg-icons/search';

export default function SearchBar() {
    const [searchTitle, setSearchTitle] = useState('');
    const [domain, setDomain] = useState('');
    const navigate = useNavigate();
    return (
        <div className="home_view-search-container">
            <select onChange={(e) => setDomain(e.target.value)} style={{borderRadius:"2rem"}}>
                <option disabled selected>Miền</option>
                <option value={'Miền Bắc'}>Miền Bắc</option>
                <option value={'Miền Trung'}>Miền Trung</option>
                <option value={'Miền Nam'}>Miền Nam</option>
            </select>
            <div className="home-search__form">
                <input
                    className="home_input-search"
                    type="text"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    placeholder="Bạn muốn tìm kiếm gì?"
                />
                <button
                    className=""
                    type="button"
                    onClick={() => {
                        if (searchTitle) {
                            navigate(`/list-recipe-by-name?name=${searchTitle.trim()}${domain && "&domain=" + domain}`);
                        }
                    }}
                >
                    <SearchIcon />
                </button>
            </div>
        </div>
    );
}
