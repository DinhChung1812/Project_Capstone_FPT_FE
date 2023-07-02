/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination } from 'antd';
import { Rating, Stack } from '@mui/material';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import MyComment from './MyComment';
import AuthContext from '../../context/auth-context';

const ViewComments = () => {
    const { dishId } = useParams();
    const [content, setContent] = useState('');
    const [star, setStar] = useState(3);
    const [changed, setChanged] = useState(1);
    const [comment, setComment] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const {
        userInfo: { accessToken },
    } = useContext(AuthContext);
    const token = `Bearer ${accessToken}`;
    const [index, setIndex] = useState(1);

    const getData = () => {
        axios
            .get(`/getListCommentOfRecipe?dishId=${dishId}`)
            .then((response) => {
                setComment(response.data);
                setCommentList(response.data.dishCommentAccountVoList);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getData();
    }, [changed]);

    useEffect(() => {
        getListComment();
    }, [index]);

    const getListComment = () => {
        axios
            .get(`/getListCommentOfRecipe?dishId=${dishId}&pageIndex=${index}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setCommentList(response.data.dishCommentAccountVoList);
            })
            .catch((err) => console.log(err));
    };

    const AddComment = async (e) => {
        e.preventDefault();
        if (accessToken && star) {
            await axios
                .post(
                    `/saveDishComment`,
                    { dishId, content: content, starRate: star },
                    {
                        headers: {
                            headers: { 'Content-Type': 'application/json' },
                            Authorization: token,
                        },
                    },
                )
                .then((response) => {
                    setChanged(comment.length);
                })
                .catch((err) => {});
        }
    };

    return (
        <>
            <div className="view-cmt" key={commentList.dishId}>
                <Form onSubmit={AddComment} autoComplete={'off'}>
                    <Form.Group className="mb-3" controlId="commentContent">
                        <Form.Label>Bình luận</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Nhập nội dung bình luận..."
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    <Stack spacing={1}>
                        {' '}
                        Đánh giá công thức nấu ăn :
                        <Rating
                            name="half-rating"
                            defaultValue={5}
                            precision={1}
                            value={star}
                            onChange={(e) => setStar(e.target.value)}
                        />
                    </Stack>
                    <hr />
                    <Button className="cmt" variant="info" type="submit">
                        Thêm bình luận
                    </Button>
                </Form>
                <br />
            </div>
            <div>
                {commentList?.map((listCmt, index) => (
                    <MyComment
                        key={index}
                        comment={listCmt}
                        changed={changed}
                        cmtContent={content}
                        onDelete={getListComment}
                    />
                ))}
            </div>
            <Pagination
                className="page-cmt"
                size="small"
                total={comment.numOfPages * 10}
                onChange={(value) => {
                    setIndex(value);
                }}
            />
        </>
    );
};
export default ViewComments;
