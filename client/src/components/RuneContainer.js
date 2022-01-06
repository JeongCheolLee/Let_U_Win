import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import RuneContainerMain from './RuneContainerMain';
import RuneContainerSub from './RuneContainerSub';
import RuneContainerStat from './RuneContainerStat';

function RuneContainer(props) {
    //what is in props
    // lane={props.lane}
    // myPick={props.myPick} also english
    // enemyPick={props.enemyPick} also english
    // const [myPick, setMyPick] = useState(props.myPick);
    // const [enemyPick, setEnemyPick] = useState(props.enemyPick);

    useEffect(() => {
        console.log(props.lane, props.myPickEn, props.enemyPickEn);
        axios
            .get(
                `http://localhost:3001/rune/${props.lane}/${props.myPickEn}/${props.enemyPickEn}`
            )
            .then((res) => {
                console.log(typeof res.data.list);
                console.log(props.lane, props.myPickEn, props.enemyPickEn);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Grid sx={{ height: '100%' }} container spacing={10} columns={3}>
            <Grid item xs={1}>
                <RuneContainerMain
                    style={props.style[0]}
                    activateList={props.activation[0]}
                />
            </Grid>
            <Grid item xs={1}>
                <RuneContainerSub
                    style={props.style[1]}
                    activateList={props.activation[1]}
                />
            </Grid>
            <Grid item xs={1}>
                <RuneContainerStat activateList={props.stat} />
            </Grid>
        </Grid>
    );
}

export default RuneContainer;
