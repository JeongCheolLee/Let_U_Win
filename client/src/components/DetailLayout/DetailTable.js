import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import BackendURL from '../../shared/BackendURL';
import { isEmptyOrUndefinedOrNull } from '../../util/stringUtils';

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
        if (
            isEmptyOrUndefinedOrNull(props.lane) ||
            isEmptyOrUndefinedOrNull(props.myPickEn) ||
            isEmptyOrUndefinedOrNull(props.enemyPickEn)
        ) {
            return;
        }
        axios
            .get(`${BackendURL}/statistic/winrate/${myPickEn}/${lane}`)
            .then((res) => {
                setTotalWinRate(res.data.winRate);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(
                `${BackendURL}/statistic/kda/${lane}/${myPickEn}/${enemyPickEn}`
            )
            .then((res) => {
                if (res.status === 204) {
                    alert(
                        `???????????????. ${lane} ??????????????? ${props.myPick}, ${props.enemyPick} ????????? ????????? ????????? ???????????? ?????? ???????????? ????????? ??? ????????????.`
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
                `${BackendURL}/statistic/kda/${lane}/${enemyPickEn}/${myPickEn}`
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
            .get(`${BackendURL}/statistic/banrate/${myPickEn}`)
            .then((res) => {
                setMyBanRate(res.data.banRate);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`${BackendURL}/statistic/banrate/${enemyPickEn}`)
            .then((res) => {
                setEnemyBanRate(res.data.banRate);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`${BackendURL}/statistic/pickrate/${myPickEn}/${lane}`)
            .then((res) => {
                setMyPickRate(res.data.totalPickRate);
                setMyLanePickRate(res.data.lanePickRate);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`${BackendURL}/statistic/pickrate/${enemyPickEn}/${lane}`)
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
                    <td>????????? ?????? ?????????</td>
                    <td></td>
                    <td>????????? ?????? ?????????</td>
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
                            title={`?????? ?????? :?????? ???????????? ?????? ?????????????????? ????????? ???????????????.`}
                            followCursor={true}
                        >
                            <td>?????? ?????? </td>
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
                            title={`????????? ?????? : ?????? ???????????? ${props.lane} ?????????????????? ????????? ???????????????.
                        ${props.myPick} ???????????? ${props.enemyPick} ???????????? ${count} ??? ???????????????, ${wins}??? ???????????????!`}
                            followCursor={true}
                        >
                            <td>????????? ??????</td>
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
                            title={`KDA : ${props.lane} ??????????????? ${props.myPick} vs  ${props.enemyPick} ????????? ??? KDA ?????????.
                        ${props.myPick} ???????????? ${props.enemyPick} ???????????? ${count} ??? ???????????????,
                        ??? ${kills} ???, ${assists} ????????????, ${deaths} ????????? ???????????????!`}
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
                            title={`??????????????? ?????? ?????? : ${props.lane} ??????????????? ${props.myPick} vs  ${props.enemyPick} ????????? ??? ????????? ?????? ????????? ?????????.
                        `}
                            followCursor={true}
                        >
                            <td> ??????????????? ?????? ?????? </td>
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
                            title={`?????? : ${props.lane} ??????????????? ${props.myPick} vs  ${props.enemyPick} ????????? ??? ?????? ?????? ????????? ???????????????`}
                            followCursor={true}
                        >
                            <td> ?????? </td>
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
                        <td> ?????? ??????</td>
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
                        <td> ????????? ??????</td>
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
                        <td>?????? </td>
                        <td className={findWinner(myBanRate, enemyBanRate)[1]}>
                            {enemyBanRate}%
                        </td>
                    </tr>
                </tbody>
                <tfoot></tfoot>
            </table>
            {/* 
            <div>
                <h1>???-???</h1>
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
                    ??? 8?????? ?????????, {props.myPick} ???????????? {betterCnt} ??????
                    ???????????? ????????? ?????????
                </li>
            </div> */}
        </div>
    );
}
