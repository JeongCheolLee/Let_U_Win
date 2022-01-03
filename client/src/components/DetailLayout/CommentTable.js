import { React, useState, useEffect } from 'react';
import axios from 'axios';

function Comment({ list }) {
    return (
        <div id="wrapper">
            <div
                id="commentList"
                style={{ textAlign: 'left', paddingTop: '10px' }}
            >
                <li>
                    <b>{list.name}</b>
                </li>
                <span>{list.comment}</span>
            </div>
        </div>
    );
}

function CommentTable(props) {
    let myPick = props.myPick;
    let enemyPick = props.enemyPick;

    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/comments/all/${myPick}/${enemyPick}`)
            .then((res) => {
                setCommentList(res.data.list);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div
            style={{
                padding: '20px',
                border: '1px solid grey',
                backgroundColor: 'white',
            }}
        >
            <h1 style={{ borderBottom: '1px solid grey' }}>익명 꿀팁 Zone</h1>
            {commentList.map((comment) => (
                <Comment list={comment} key={comment._id} />
            ))}
        </div>
    );
}

export default CommentTable;
