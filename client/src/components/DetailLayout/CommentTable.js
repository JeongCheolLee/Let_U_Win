import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Pagination from './Pagination.js';
import BackendURL from '../../shared/BackendURL';

function Comment({ list, setRefresh, refresh }) {
    const [liked, setLiked] = useState(false);
    const [disliked, setdisLiked] = useState(false);

    useEffect(() => {
        if (liked !== false) {
            const recordId = list._id;
            let likeBefore = list.like;
            axios
                .patch(`${BackendURL}/comments/rating/like/${recordId}`, {
                    like: likeBefore + 1,
                })
                .then((res) => {
                    console.log(
                        `like was ${likeBefore}, now ${likeBefore + 1}`
                    );
                    setRefresh(refresh + 1);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [liked]);

    useEffect(() => {
        if (disliked !== false) {
            const recordId = list._id;
            let dislikeBefore = list.dislike;

            axios
                .patch(`${BackendURL}/comments/rating/dislike/${recordId}`, {
                    dislike: dislikeBefore + 1,
                })
                .then((res) => {
                    console.log(res);
                    console.log(
                        `dislike was ${dislikeBefore}, now ${dislikeBefore + 1}`
                    );
                    setRefresh(refresh + 1);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [disliked]);

    function likeClickHandler() {
        setLiked(liked + 1);
    }

    function dislikeClickHandler() {
        setdisLiked(disliked + 1);
    }

    return (
        <div id="wrapper" style={{ height: '8rem' }}>
            <div
                id="commentList"
                style={{ textAlign: 'left', paddingTop: '10px' }}
            >
                <li>
                    <b>{list.name}</b>
                </li>
                <span>{list.comment}</span>
                <br></br>
                <div style={{ textAlign: 'right' }}>
                    <IconButton
                        onClick={() => {
                            likeClickHandler();
                        }}
                    >
                        <ThumbUpIcon fontSize="small"></ThumbUpIcon>
                    </IconButton>
                    {list.like}
                    <IconButton
                        onClick={() => {
                            dislikeClickHandler();
                        }}
                    >
                        <ThumbDownIcon fontSize="small"></ThumbDownIcon>
                    </IconButton>
                    {list.dislike}
                </div>
            </div>
        </div>
    );
}

function CommentTable(props) {
    let myPick = props.myPick;
    let enemyPick = props.enemyPick;

    const [commentListLength, setCommentListLength] = useState(3);
    const [commentCnt, setCommentCnt] = useState(3);
    const [commentList, setCommentList] = useState([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        axios
            .get(`${BackendURL}/comments/all/${myPick}/${enemyPick}`)
            .then((res) => {
                setCommentList(res.data.list.slice(commentCnt - 3, commentCnt));
                setCommentListLength(res.data.list.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh]);

    return (
        <div
            style={{
                padding: '20px',
                border: '1px solid grey',
                backgroundColor: 'white',
                width: '100%',
                height: '33rem',
            }}
        >
            <h1 style={{ borderBottom: '1px solid grey' }}>익명 꿀팁 Zone</h1>
            {commentList.map((comment) => (
                <Comment
                    list={comment}
                    key={comment._id}
                    setRefresh={setRefresh}
                    refresh={refresh}
                />
            ))}
            <div
                style={{
                    display: 'absolute',
                    bottom: '0px',
                    textAlign: 'center',
                }}
            >
                <Pagination
                    setCommentCnt={setCommentCnt}
                    commentCnt={commentCnt}
                    commentListLength={commentListLength}
                    setFunc={setRefresh}
                    refresh={refresh}
                ></Pagination>
                <div style={{ display: 'absolute', bottom: '1px' }}>
                    {`${commentCnt / 3} / ${Math.ceil(commentListLength / 3)}`}
                </div>
            </div>
        </div>
    );
}

export default CommentTable;
