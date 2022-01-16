import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BackendURL from '../../shared/BackendURL';

function Comment({ list, setRefresh, refresh }) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

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
        setDisliked(disliked + 1);
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

export default Comment;
