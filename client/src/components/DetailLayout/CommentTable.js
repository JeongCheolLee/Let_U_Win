import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination.js';
import BackendURL from '../../shared/BackendURL';
import Comment from './Comment';

function CommentTable(props) {
    let myPick = props.myPick;
    let enemyPick = props.enemyPick;

    const [commentListLength, setCommentListLength] = useState(3);
    const [commentCnt, setCommentCnt] = useState(3);
    const [commentList, setCommentList] = useState([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        console.log(`${BackendURL}/comments/all/${myPick}/${enemyPick}`);
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
