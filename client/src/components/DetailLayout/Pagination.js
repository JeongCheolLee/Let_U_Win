import * as React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { IconButton } from '@material-ui/core';

export default function PaginationIcon(props) {
    function LeftButtonClickHandler(commentCnt) {
        if (commentCnt <= 3) {
            return 0;
        }
        props.setCommentCnt(commentCnt - 3);
    }

    function RightButtonClickHandler(commentCnt) {
        if (commentCnt > props.commentListLength) {
            return 0;
        }
        props.setCommentCnt(commentCnt + 3);
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <IconButton
                onClick={() => {
                    LeftButtonClickHandler(props.commentCnt);
                }}
            >
                <ChevronLeftIcon></ChevronLeftIcon>
            </IconButton>
            <IconButton
                onClick={() => {
                    RightButtonClickHandler(props.commentCnt);
                }}
            >
                <ChevronRightIcon></ChevronRightIcon>
            </IconButton>
        </div>
    );
}
