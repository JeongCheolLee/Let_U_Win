import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

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
    const [count, setCount] = useState('');
    const [kills, setKills] = useState('');
    const [assists, setAssists] = useState('');
    const [deaths, setDeaths] = useState('');
    const [wins, setWins] = useState('');

    const [enemyKda, setEnemyKda] = useState('');
    const [enemyTotalDamage, setEnemyTotalDamage] = useState('');
    const [enemyChampLevel, setEnemyChampLevel] = useState('');

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:3001/statistic/winrate/${myPickEn}/${lane}`)
            .then((res) => {
                setTotalWinRate(res.data.winRate);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(
                `http://127.0.0.1:3001/statistic/kda/${lane}/${myPickEn}/${enemyPickEn}`
            )
            .then((res) => {
                if (res.status === 204) {
                    alert(
                        `죄송합니다. ${lane} 포지션에서 ${props.myPick}, ${props.enemyPick} 구도는 충분한 표본이 집계되지 않아 서비스를 제공할 수 없습니다.`
                    );
                    props.pageGoBack();
                }
                const count_ = res.data.cnt;
                const kills_ = res.data.kills;
                const deaths_ = res.data.deaths;
                const assists_ = res.data.assists;
                const champLevel_ = res.data.champLevel;
                const totalDamage_ = res.data.totalDamageDealtToChampions;

                setKda(((kills_ + assists_) / deaths_).toFixed(2));
                setTotalDamage((totalDamage_ / count_).toFixed(2));
                setChampLevel((champLevel_ / count_).toFixed(2));

                setCount(count_);
                setWins(res.data.win);
                setKills(kills_);
                setDeaths(deaths_);
                setAssists(assists_);
                setRelativeWinRate(res.data.win / res.data.cnt);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(
                `http://127.0.0.1:3001/statistic/kda/${lane}/${enemyPickEn}/${myPickEn}`
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
            .get(`http://127.0.0.1:3001/statistic/banrate/${myPickEn}`)
            .then((res) => {
                setMyBanRate(res.data.banRate);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`http://127.0.0.1:3001/statistic/banrate/${enemyPickEn}`)
            .then((res) => {
                setEnemyBanRate(res.data.banRate);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`http://127.0.0.1:3001/statistic/pickrate/${myPickEn}/${lane}`)
            .then((res) => {
                setMyPickRate(res.data.totalPickRate);
                setMyLanePickRate(res.data.lanePickRate);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(
                `http://127.0.0.1:3001/statistic/pickrate/${enemyPickEn}/${lane}`
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
        <div id="wrapper">
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

                        <Tooltip
                            title={`전체 승률 :해당 챔피언의 모든 포지션에서의 승률을 의미합니다.`}
                            followCursor={true}
                        >
                            <td>전체 승률 </td>
                        </Tooltip>

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
                                    1 - relativeWinRate
                                )[0]
                            }
                        >
                            {(relativeWinRate * 100).toFixed(2)}%
                        </td>
                        <Tooltip
                            title={`포지션 승률 : 해당 챔피언의 ${props.lane} 포지션에서의 승률을 의미합니다.
                        ${props.myPick} 챔피언은 ${props.enemyPick} 챔피언을 ${count} 회 상대했으며, ${wins}회 승리했네요!`}
                            followCursor={true}
                        >
                            <td>포지션 승률</td>
                        </Tooltip>

                        <td
                            className={
                                findWinner(
                                    relativeWinRate,
                                    1 - relativeWinRate
                                )[1]
                            }
                        >
                            {((1 - relativeWinRate) * 100).toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td className={findWinner(kda, enemyKda)[0]}>{kda}</td>
                        <Tooltip
                            title={`KDA : ${props.lane} 포지션에서 ${props.myPick} vs  ${props.enemyPick} 구도일 때 KDA 입니다.
                        ${props.myPick} 챔피언은 ${props.enemyPick} 챔피언을 ${count} 회 상대했으며,
                        총 ${kills} 킬, ${assists} 어시스트, ${deaths} 데스를 기록했네요!`}
                            followCursor={true}
                        >
                            <td>KDA</td>
                        </Tooltip>
                        <td className={findWinner(kda, enemyKda)[1]}>
                            {enemyKda}
                        </td>
                    </tr>
                    <tr>
                        <td
                            className={
                                findWinner(totalDamage, enemyTotalDamage)[0]
                            }
                        >
                            {totalDamage}
                        </td>

                        <Tooltip
                            title={`챔피언에게 가한 피해 : ${props.lane} 포지션에서 ${props.myPick} vs  ${props.enemyPick} 구도일 때 적에게 입힌 피해량 입니다.
                        `}
                            followCursor={true}
                        >
                            <td> 챔피언에게 가한 피해 </td>
                        </Tooltip>

                        <td
                            className={
                                findWinner(totalDamage, enemyTotalDamage)[1]
                            }
                        >
                            {enemyTotalDamage}
                        </td>
                    </tr>
                    <tr>
                        <td
                            className={
                                findWinner(champLevel, enemyChampLevel)[0]
                            }
                        >
                            {champLevel}
                        </td>
                        <Tooltip
                            title={`레벨 : ${props.lane} 포지션에서 ${props.myPick} vs  ${props.enemyPick} 구도일 때 매치 종료 시점의 레벨입니다`}
                            followCursor={true}
                        >
                            <td> 레벨 </td>
                        </Tooltip>
                        <td
                            className={
                                findWinner(champLevel, enemyChampLevel)[1]
                            }
                        >
                            {enemyChampLevel}
                        </td>
                    </tr>
                    <tr>
                        <td
                            className={findWinner(myPickRate, enemyPickRate)[0]}
                        >
                            {(myPickRate * 100).toFixed(2)}%
                        </td>
                        <td> 전체 픽률</td>
                        <td
                            className={findWinner(myPickRate, enemyPickRate)[1]}
                        >
                            {(enemyPickRate * 100).toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td
                            className={
                                findWinner(myLanePickRate, enemyPickRate)[0]
                            }
                        >
                            {(myLanePickRate * 100).toFixed(2)}%
                        </td>
                        <td> 포지션 픽률</td>
                        <td
                            className={
                                findWinner(myLanePickRate, enemyPickRate)[1]
                            }
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
            {/* 
            <div>
                <h1>분-석</h1>
            </div>
            <div
                style={{
                    marginTop: '2rem',
                    display: 'flex',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                }}
            >
                <img width="150" src="/images/leesin/Leesin.png"></img>
                <li>
                    총 8개의 지표중, {props.myPick} 챔피언은 {betterCnt} 개의
                    지표에서 앞서는 중이오
                </li>
            </div> */}
        </div>
    );
}
