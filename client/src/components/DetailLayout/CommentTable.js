import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Pagination from './Pagination.js';

function likeClickHandler(recordId, likeBefore) {
    axios
        .patch(`http://localhost:3001/comments/rating/like/${recordId}`, {
            like: likeBefore + 1,
        })
        .then((res) => {
            console.log(res);
            console.log(`like was ${likeBefore}, now ${likeBefore + 1}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

function dislikeClickHandler(recordId, dislikeBefore) {
    axios
        .patch(`http://localhost:3001/comments/rating/dislike/${recordId}`, {
            dislike: dislikeBefore + 1,
        })
        .then((res) => {
            console.log(res);
            console.log(
                `dislike was ${dislikeBefore}, now ${dislikeBefore + 1}`
            );
        })
        .catch((err) => {
            console.log(err);
        });
}

function Comment({ list, setFunc }) {
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
                            likeClickHandler(list._id, list.like);
                            setFunc([]);
                            console.log('rendering test');
                        }}
                    >
                        <ThumbUpIcon fontSize="small"></ThumbUpIcon>
                    </IconButton>
                    {list.like}
                    <IconButton
                        onClick={() => {
                            dislikeClickHandler(list._id, list.dislike);
                            setFunc([]);
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
            .get(`http://localhost:3001/comments/all/${myPick}/${enemyPick}`)
            .then((res) => {
                // setCommentList(res.data.list.slice(commentCnt - 3, commentCnt));
                // setCommentListLength(res.data.list.length);
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
                    setFunc={setRefresh}
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
