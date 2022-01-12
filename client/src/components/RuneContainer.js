import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import RuneContainerMain from './RuneContainerMain';
import RuneContainerSub from './RuneContainerSub';
import RuneContainerStat from './RuneContainerStat';
import BackendURL from '../shared/BackendURL';
import { isEmptyOrUndefinedOrNull } from '../util/stringUtils';

function RuneContainer(props) {
    //what is in props
    // lane={props.lane}
    // myPick={props.myPick} also english
    // enemyPick={props.enemyPick} also english
    // const [myPick, setMyPick] = useState(props.myPick);
    // const [enemyPick, setEnemyPick] = useState(props.enemyPick);
    const [styles, setStyles] = useState([]);
    const [activation, setActivation] = useState([]);
    const [stat, setStat] = useState([]);

    useEffect(() => {
        if (
            isEmptyOrUndefinedOrNull(props.lane) ||
            isEmptyOrUndefinedOrNull(props.myPickEn) ||
            isEmptyOrUndefinedOrNull(props.enemyPickEn)
        ) {
            return;
        }

        console.log(props.lane, props.myPickEn, props.enemyPickEn);
        axios
            .get(
                `${BackendURL}/rune/${props.lane}/${props.myPickEn}/${props.enemyPickEn}`
            )
            .then((res) => {
                if (res.status === 204) {
                    props.pageGoBack();
                } else {
                    setStyles(res.data.perkStyles);
                    setActivation(res.data.perkActivation);
                    setStat(res.data.perkStat);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Grid sx={{ height: '100%' }} container spacing={10} columns={3}>
            <Grid item xs={1}>
                <RuneContainerMain
                    style={styles[0]}
                    activateList={activation[0]}
                />
            </Grid>
            <Grid item xs={1}>
                <RuneContainerSub
                    style={styles[1]}
                    activateList={activation[1]}
                />
            </Grid>
            <Grid item xs={1}>
                <RuneContainerStat activateList={stat} />
            </Grid>
        </Grid>
    );
}

export default RuneContainer;
