import { React, useEffect, useState } from 'react';
import axios from 'axios';

export default function DetailTable(props) {
    const lane = props.lane;
    const myPickEn = props.myPickEn;
    const enemyPickEn = props.enemyPickEn;

    const [totalWinRate, setTotalWinRate] = useState('');
    const [relativeWinRate, setRelativeWinRate] = useState('');
    const [myBanRate, setMyBanRate] = useState('');
    const [enemyBanRate, setEnemyBanRate] = useState('');
    const [myPickRate, setMyPickRate] = useState('');
    const [myLanePickRate, setMyLanePickRate] = useState('');
    const [enemyPickRate, setEnemyPickRate] = useState('');
    const [enemyLanePickRate, setEnemyLanePickRate] = useState('');
    const [kda, setKda] = useState('');
    const [totalDamage, setTotalDamage] = useState('');
    const [champLevel, setChampLevel] = useState('');
    const [enemyKda, setEnemyKda] = useState('');
    const [enemyTotalDamage, setEnemyTotalDamage] = useState('');
    const [enemyChampLevel, setEnemyChampLevel] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:3001/statistic/winrate/${myPickEn}/${lane}`)
            .then((res) => {
                setTotalWinRate(res.data.winRate);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(
                `http://localhost:3001/statistic/kda/${lane}/${myPickEn}/${enemyPickEn}`
            )
            .then((res) => {
                const count = res.data.cnt;
                const win = res.data.win;
                const kills = res.data.kills;
                const deaths = res.data.deaths;
                const assists = res.data.assists;
                const champLevel = res.data.champLevel;
                const totalDamage = res.data.totalDamageDealtToChampions;

                setKda(((kills + assists) / deaths).toFixed(2));
                setRelativeWinRate(((win / count) * 100).toFixed(2));
                setTotalDamage((totalDamage / count).toFixed(2));
                setChampLevel((champLevel / count).toFixed(2));
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(
                `http://localhost:3001/statistic/kda/${lane}/${enemyPickEn}/${myPickEn}`
            )
            .then((res) => {
                const count = res.data.cnt;
                const kills = res.data.kills;
                const deaths = res.data.deaths;
                const assists = res.data.assists;
                const champLevel = res.data.champLevel;
                const totalDamage = res.data.totalDamageDealtToChampions;

                setEnemyKda(((kills + assists) / deaths).toFixed(2));
                setEnemyTotalDamage((totalDamage / count).toFixed(2));
                setEnemyChampLevel((champLevel / count).toFixed(2));
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`http://localhost:3001/statistic/banrate/${myPickEn}`)
            .then((res) => {
                setMyBanRate(res.data.banRate);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`http://localhost:3001/statistic/banrate/${enemyPickEn}`)
            .then((res) => {
                setEnemyBanRate(res.data.banRate);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`http://localhost:3001/statistic/pickrate/${myPickEn}/${lane}`)
            .then((res) => {
                setMyPickRate(res.data.totalPickRate);
                setMyLanePickRate(res.data.lanePickRate);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(
                `http://localhost:3001/statistic/pickrate/${enemyPickEn}/${lane}`
            )
            .then((res) => {
                setEnemyPickRate(res.data.totalPickRate);
                setEnemyLanePickRate(res.data.lanePickRate);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function findWinner(my, enemy) {
        if (my < enemy) {
            return ['purpleLose', 'greenWin'];
        } else {
            return ['purpleWin', 'greenLose'];
        }
    }
    console.log();

    return (
        <table
            id="detailTable"
            style={{
                width: '100%',
                height: '80%',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                textAlign: 'center',
            }}
        >
            <thead>
                <td>매치업 평균 데이터</td>
                <td></td>
                <td>매치업 평균 데이터</td>
            </thead>
            <tbody>
                <tr>
                    <td
                        className={
                            findWinner(totalWinRate, 1 - totalWinRate)[0]
                        }
                    >
                        {(totalWinRate * 100).toFixed(2)}%
                    </td>
                    <td>전체 승률</td>
                    <td
                        className={
                            findWinner(totalWinRate, 1 - totalWinRate)[1]
                        }
                    >
                        {100 - (totalWinRate * 100).toFixed(2)}%
                    </td>
                </tr>
                <tr className="tableBorder">
                    <td
                        className={
                            findWinner(
                                relativeWinRate,
                                100 - relativeWinRate
                            )[0]
                        }
                    >
                        {relativeWinRate}%
                    </td>
                    <td> 포지션 승률</td>
                    <td
                        className={
                            findWinner(
                                relativeWinRate,
                                100 - relativeWinRate
                            )[1]
                        }
                    >
                        {100 - relativeWinRate}%
                    </td>
                </tr>
                <tr>
                    <td className={findWinner(kda, enemyKda)[0]}>{kda}</td>
                    <td> KDA </td>
                    <td className={findWinner(kda, enemyKda)[1]}>{enemyKda}</td>
                </tr>
                <tr>
                    <td
                        className={findWinner(totalDamage, enemyTotalDamage)[0]}
                    >
                        {totalDamage}
                    </td>
                    <td> 챔피언에게 가한 피해 </td>
                    <td
                        className={findWinner(totalDamage, enemyTotalDamage)[1]}
                    >
                        {enemyTotalDamage}
                    </td>
                </tr>
                <tr>
                    <td className={findWinner(champLevel, enemyChampLevel)[0]}>
                        {champLevel}
                    </td>
                    <td> 레벨 </td>
                    <td className={findWinner(champLevel, enemyChampLevel)[1]}>
                        {enemyChampLevel}
                    </td>
                </tr>
                <tr>
                    <td className={findWinner(myPickRate, enemyPickRate)[0]}>
                        {(myPickRate * 100).toFixed(2)}%
                    </td>
                    <td> 전체 픽률</td>
                    <td className={findWinner(myPickRate, enemyPickRate)[1]}>
                        {(enemyPickRate * 100).toFixed(2)}%
                    </td>
                </tr>
                <tr>
                    <td
                        className={findWinner(myLanePickRate, enemyPickRate)[0]}
                    >
                        {(myLanePickRate * 100).toFixed(2)}%
                    </td>
                    <td> 포지션 픽률</td>
                    <td
                        className={findWinner(myLanePickRate, enemyPickRate)[1]}
                    >
                        {(enemyLanePickRate * 100).toFixed(2)}%
                    </td>
                </tr>
                <tr>
                    <td className={findWinner(myBanRate, enemyBanRate)[0]}>
                        {myBanRate}%
                    </td>
                    <td>밴률 </td>
                    <td className={findWinner(myBanRate, enemyBanRate)[1]}>
                        {enemyBanRate}%
                    </td>
                </tr>
            </tbody>
            <tfoot></tfoot>
        </table>
    );
}
