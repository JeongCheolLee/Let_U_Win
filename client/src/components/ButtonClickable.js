import { React, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    laneBtn: {
        width: '100px',
        height: '100px',
        margin: '10px',
        // backgroundColor:'black',
        padding: '0px',
        fontSize: '35px',
        fontWeight: 'bold',
        fontFamily: ['궁서', '궁서체'],
    },
}));

function ButtonClickable(props) {
    const history = props.history;
    const [lane, setLane] = useState(props.lane.ko);
    const btnClickHandler = () => {
        history.push({
            pathname: '/pickorder',
            state: props.lane.en,
        });
        console.log(lane);
    };

    // const classes = useStyles();

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
        <Button onClick={btnClickHandler} variant="contained" size="large">
            <img src={laneImgSrc}></img>
            <span>{props.lane.ko}</span>
        </Button>
    );
}

export default ButtonClickable;
