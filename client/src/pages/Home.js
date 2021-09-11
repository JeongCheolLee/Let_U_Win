import {React, useState} from 'react';
import {Button, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Home({history}) {
    const [lane, setLane] = useState("none");

    const changeHandler = (e) => {
        setLane(e.target.value);
    }

    const btnClickHandler = () => {
        history.push({
            pathname:"/pickorder",
            state:lane
        });
    }

    const useStyles = makeStyles((theme) => ({
        laneBtn:{
            width:"100px",
            height:"100px",
            margin:"10px",
            // backgroundColor:"black",
            padding:"0px",
            fontSize:"35px",
            fontWeight:"bold",
            fontFamily:"궁서",
        }
    }))

    const classes = useStyles();

    const lanes = [
        {
            ko:"탑",
            en:"top",
        },
        {
            ko:"정글",
            en:"jungle",
        },
        {
            ko:"미드",
            en:"middle",
        },
        {
            ko:"원딜",
            en:"bottom",
        },
        {
            ko:"서폿",
            en:"support",
        },
    ]

    return (
        <div align='center'>
            {/* <div>
                <select name="lane" onChange={changeHandler}>
                    <option value="none" selected>which?</option>
                    <option value="top">top</option>
                    <option value="jungle">jungle</option>
                    <option value="mid">mid</option>
                    <option value="bottom">bottom</option>
                    <option value="supporter">supporter</option>
                </select>
                <button onClick={btnClickHandler}>OK</button>
            </div> */}
            {lanes.map((item) => {
                return (
                    <Button variant="contained" size="large" className={classes.laneBtn}>
                        {item.ko}
                    </Button>    
                )
            })}
        </div>
    )
}

export default Home
