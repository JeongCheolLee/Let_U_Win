import { React } from 'react';
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
    const btnClickHandler = () => {
        history.push({
            pathname: '/pick',
            state: props.lane.en,
        });
    };

    const classes = useStyles();

    return (
        <Button
            onClick={btnClickHandler}
            variant="contained"
            size="large"
            className={classes.laneBtn}
        >
            {props.lane.ko}
        </Button>
    );
}

export default ButtonClickable;
