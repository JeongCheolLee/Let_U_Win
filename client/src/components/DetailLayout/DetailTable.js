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

    useEffect(() => {
        axios
            .get(`http://localhost:3001/statistic/winrate/${myPickEn}/${lane}`)
            .then((res) => {
                setTotalWinRate(res.data.winRate);
            })
            .catch((err) => {
                console.log(err);
            });
        // axios
        //     .get(
        //         `http://localhost:3001/statistic/winrate/${myPickEn}/${lane}/${enemyPickEn}`
        //     )
        //     .then((res) => {
        //         setRelativeWinRate(res.data.relativeWinRate);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        axios
            .get(
                `http://localhost:3001/statistic/winrate/${myPickEn}/${lane}/${enemyPickEn}`
            )
            .then((res) => {
                setRelativeWinRate(res.data.relativeWinRate);
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
                        {(100 - relativeWinRate).toFixed(2)}%
                    </td>
                </tr>
                <tr>
                    <td
                        className={
                            findWinner(totalWinRate, 1 - totalWinRate)[0]
                        }
                    >
                        {(totalWinRate * 100).toFixed(2)}%
                    </td>
                    <td> KDA </td>
                    <td
                        className={
                            findWinner(totalWinRate, 1 - totalWinRate)[1]
                        }
                    >
                        {100 - (totalWinRate * 100).toFixed(2)}%
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
