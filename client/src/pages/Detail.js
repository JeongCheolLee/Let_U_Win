import { React, useEffect, useState } from 'react';
// import axios from 'axios';
import getChampionsList from '../data/championList';
import Layout from '../components/DetailLayout/Layout';
import '../css/Detail.css';

function Detail({ location, history }) {
    const myPick = location.state.myPick;
    const enemyPick = location.state.enemyPick;
    const lane = location.state.lane;
    const [myPickEn, setMyPickEn] = useState('');
    const [enemyPickEn, setEnemyPickEn] = useState('');

    function pageGoBack() {
        history.goBack();
    }

    // componentDidMount
    useEffect(() => {
        getChampionsList().then((result) => {
            setMyPickEn(result.filter((s) => s.name === myPick)[0].id);
            setEnemyPickEn(result.filter((s) => s.name === enemyPick)[0].id);
        });
    }, []);

    return (
        <Layout
            myPick={myPick}
            enemyPick={enemyPick}
            myPickEn={myPickEn}
            enemyPickEn={enemyPickEn}
            lane={lane}
            // perkStyles={[8100, 8200]}
            // perkActivation={[
            //     [8112, 8126, 8120, 8105],
            //     [8234, 8237],
            // ]}
            // perkStat={[5007, 5008, 5002]}
        ></Layout>
    );
}

export default Detail;
