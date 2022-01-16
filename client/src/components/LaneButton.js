import { React, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/Home.css';

function LaneButton(props) {
    const history = props.history;
    const [lane, setLane] = useState(props.lane.ko);

    const btnClickHandler = () => {
        history.push({
            pathname: '/pick',
            state: props.lane.en,
        });
        console.log(lane);
    };

    let laneImgSrc;
    switch (props.lane.en) {
        case 'top':
            laneImgSrc = '/images/lanes/Top_icon.png';
            break;
        case 'jungle':
            laneImgSrc = '/images/lanes/Jungle_icon.png';
            break;
        case 'middle':
            laneImgSrc = '/images/lanes/Middle_icon.png';
            break;
        case 'bottom':
            laneImgSrc = '/images/lanes/Bottom_icon.png';
            break;
        case 'utility':
            laneImgSrc = '/images/lanes/Support_icon.png';
            break;
    }

    return (
        <IconButton onClick={btnClickHandler} variant="contained" size="medium">
            <img src={laneImgSrc}></img>
            <span
                style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '2rem',
                }}
            >
                {props.lane.ko}
            </span>
        </IconButton>
    );
}

export default LaneButton;
