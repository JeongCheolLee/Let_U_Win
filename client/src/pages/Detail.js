import { React, useEffect, useState, useRef } from 'react';
// import axios from 'axios';
import getChampionsList from '../data/championList';
import Layout from '../components/DetailLayout/Layout';
import '../css/Detail.css';

function Detail({ location }) {
    const myPick = location.state.myPick;
    const enemyPick = location.state.enemyPick;
    const lane = location.state.lane;
    const mounted = useRef(false);
    const [myPickEn, setMyPickEn] = useState('');
    const [enemyPickEn, setEnemyPickEn] = useState('');

    // componentDidMount
    useEffect(() => {
        getChampionsList().then((result) => {
            setMyPickEn(result.filter((s) => s.name === myPick)[0].id);
            setEnemyPickEn(result.filter((s) => s.name === enemyPick)[0].id);
        });
    }, []);

    // // componentDidUpdate
    // useEffect(() => {
    //     if (!mounted.current) {
    //         mounted.current = true;
    //     } else {
    //         if (myPick !== undefined) {
    //             axios
    //                 .get(
    //                     `http://localhost:3001/statistic/winrate/${myPickEn}/${lane}`
    //                 )
    //                 .then((res) => {
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                 });
    //             axios
    //                 .get(`http://localhost:3001/statistic/banrate/${myPickEn}`)
    //                 .then((res) => {
    //                     //banRate test done

    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                 });
    //             axios
    //                 .get(
    //                     `http://localhost:3001/statistic/pickrate/${myPickEn}/${lane}`
    //                 )
    //                 .then((res) => {
    //                     //pickRate test done
    //                     console.log(res.data);
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                 });
    //         }
    //     }
    // }, [myPickEn]);

    return (
        <Layout
            myPick={myPick}
            enemyPick={enemyPick}
            myPickEn={myPickEn}
            enemyPickEn={enemyPickEn}
            lane={lane}
            perkStyles={[8100, 8200]}
            perkActivation={[
                [8112, 8126, 8120, 8105],
                [8234, 8237],
            ]}
            perkStat={[5007, 5008, 5002]}
        ></Layout>
    );
}

export default Detail;
