import styles from './data-list.module.css';
import { useMediaQuery } from 'react-responsive';
import { SettingOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Paginator from '../common/Paginator';
import { mapRoleKeyToText, MAX_ITEMS, role_options } from '../../constants';
import Input from '../common/Input/Input';

function MobileCard({mode, item, no, onEdit, onDelete, onChangeRole, selectedEditItem, onCancelEdit }) {
    return (
        <div className="custom-card">
            <div className="custom-row">
                <div className="custom-col">
                    <strong />
                    <div className="d-flex align-items-center mw-60-px gap-2">
                        {selectedEditItem === item.accountId ? (
                            <CloseCircleOutlined
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 18,
                                    color: '#289AE7',
                                }}
                                onClick={onCancelEdit}
                            />
                        ) : (
                            <SettingOutlined
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 18,
                                    color: '#289AE7',
                                }}
                                onClick={() => onEdit(item.accountId)}
                            />
                        )}
                        <DeleteOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#f53838',
                            }}
                            onClick={() => onDelete(item.accountId)}
                        />
                    </div>
                </div>
                <div className="custom-col">
                    <strong>No</strong>
                    <p>{no}</p>
                </div>
                <div className="custom-col">
                    <strong>Họ và tên</strong>
                    <p>{item.userName}</p>
                </div>
                <div className="custom-col">
                    <strong>E-mail </strong>
                    <p>{item?.email}</p>
                </div>
                <div className="custom-col">
                    <strong>Chức vụ</strong>
                    <p className="text-capitalize">
                        {selectedEditItem === item.accountId ? (
                            <Input
                                type="select"
                                onChange={(e) => {
                                    onChangeRole(item.accountId, e.target.value);
                                }}
                                value={mapRoleKeyToText(item.role)}
                                touched={true}
                                containerNoMarginBottom
                                className="w-100"
                            >
                                {role_options.map((r) => (
                                    <option className="text-capitalize" key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </Input>
                        ) : (
                            mapRoleKeyToText(item.role)
                        )}
                    </p>
                </div>
                {mode == 0 &&
                    <div className="custom-col">
                        <strong>CCCD</strong>
                        <p>{item.identity}</p>
                    </div>
                }
            </div>
        </div>
    );
}

const UserDataList = ({
    list,
    onEdit,
    onDelete,
    currentPage,
    maxPage,
    paginateCallback,
    onChangeRole,
    selectedEditItem,
    onCancelEdit,
    mode
}) => {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    let newList;
    if ((window.location.pathname).includes('mod')) {
        mode = 0;
    }
    if (mode == 0) {
        newList = [];
        for (let i = 0; i <= list.length; i++) {
            if (list[i] && list[i].role === 'ROLE_MOD') {
                console.log("HERE")
                newList.push(list[i])
            }
        }
    } else if (mode == 1){
        newList = list
    }
    console.log(newList)
    let listUserMarkup = newList && newList.map((item, index) => (
        <li key={item.accountId} className={styles.dataItem}>
            <span className={styles.no}>{(currentPage - 1) * MAX_ITEMS + index + 1}</span>
            <span>{item.userName || '-'}</span>
            <span>{item?.email}</span>
            <span className="text-capitalize">
                {selectedEditItem === item.accountId ? (
                    <Input
                        type="select"
                        onChange={(e) => {
                            onChangeRole(item.accountId, e.target.value);
                        }}
                        value={mapRoleKeyToText(item.role)}
                        touched={true}
                        containerNoMarginBottom
                        className="w-100"
                    >
                        {role_options.map((r) => (
                            <option className="text-capitalize" key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </Input>
                ) : (
                    mapRoleKeyToText(item.role)
                )}
            </span>
            {mode == 0 &&
                <span>{item.identity_mod || ''}</span>
            }
            <span>
                <div className="d-flex align-items-center mw-60-px gap-sm">
                    {selectedEditItem === item.accountId ? (
                        <CloseCircleOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#289AE7',
                            }}
                            onClick={onCancelEdit}
                        />
                    ) : (
                        <SettingOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#289AE7',
                            }}
                            onClick={() => onEdit(item.accountId)}
                        />
                    )}
                    <DeleteOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#f53838',
                        }}
                        onClick={() => onDelete(item.accountId)}
                    />
                </div>
            </span>
        </li>
    ));

    if (isMobile) {
        listUserMarkup = list.map((item, index) => (
            <MobileCard
                mode={mode}
                no={(currentPage - 1) * MAX_ITEMS + index + 1}
                key={item.accountId}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                selectedEditItem={selectedEditItem}
                onCancelEdit={onCancelEdit}
            />
        ));
    }

    return (
        <>
            <ul className={styles.dataList}>
                {!isMobile && (
                    <li className={[styles.dataItem, styles.dataItemHead].join(' ')}>
                        <strong className={styles.no}>No</strong>
                        <strong>Họ và tên</strong>
                        <strong>E-mail</strong>
                        <strong>Chức vụ</strong>
                        {mode == 0 &&
                            <strong>CCCD</strong>
                        }
                        <strong />
                    </li>
                )}
                {listUserMarkup}
            </ul>
            <Paginator
                curPage={currentPage}
                maxPage={maxPage}
                scrollAfterClicking
                isLoading={false}
                callback={(page) => {
                    paginateCallback(page);
                }}
            />
        </>
    );
};

export default UserDataList;
