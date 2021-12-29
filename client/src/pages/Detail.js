import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import getChampionsList from '../data/championList';
import DetailTable from '../components/DetailTable';

function Detail({location}) {

  const [mypickEn, setMypickEn] = useState('');
  const [enemyPickEn, setEnemyPickEn] = useState('');
  const [totalWinRate, setTotalWinRate] = useState('');
  const [relativeWinRate, setRelativeWinRate] = useState('');
  const [myBanRate, setMyBanRate] = useState('');
  const [enemyBanRate, setEnemyBanRate] = useState('');
  const [myPickRate, setMyPickRate] = useState('');
  const [myLanePickRate, setMyLanePickRate] = useState('');
  const [enemyPickRate, setEnemyPickRate] = useState('');
  const [enemyLanePickRate, setEnemyLanePickRate] = useState('');  

  const mypick = location.state.myPick;
  const enemyPick = location.state.enemyPick;
  const lane = location.state.lane;
  const mounted = useRef(false);


  // componentDidMount
  useEffect( () => {
    console.log('Mount')
    getChampionsList().then((result) => {
      setMypickEn(result.filter((s) => s.name === mypick)[0].id);
      setEnemyPickEn(result.filter((s) => s.name === enemyPick)[0].id);
      console.log(result.filter((s) => s.name === mypick)[0].id)
      console.log(mypickEn)
      console.log(enemyPickEn)
      console.log('나왔나')
    });
  }, []);


  // componentDidUpdate
  useEffect(() => {
    if (!mounted.current) {
      console.log('update_if')
      mounted.current = true;
    } else {
      console.log('update_else')
      if (mypick !== undefined) {
        axios
          .get(`http://localhost:3001/statistic/winrate/${mypickEn}/${lane}`)
          .then((res) => {
            setTotalWinRate(res.data.winRate)
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`http://localhost:3001/statistic/winrate/${mypickEn}/${lane}/${enemyPickEn}`)
          .then((res) => {
            setRelativeWinRate(res.data.relativeWinRate)
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`http://localhost:3001/statistic/banrate/${mypickEn}`)
          .then((res) => {
            setMyBanRate(res.data.banRate)
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`http://localhost:3001/statistic/banrate/${enemyPickEn}`)
          .then((res) => {
            console.log(res.data)
            setEnemyBanRate(res.data.banRate)
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`http://localhost:3001/statistic/pickrate/${mypickEn}/${lane}`)
          .then((res) => {
            setMyPickRate(res.data.totalPickRate)
            setMyLanePickRate(res.data.lanePickRate)
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`http://localhost:3001/statistic/pickrate/${enemyPickEn}/${lane}`)
          .then((res) => {
            setEnemyPickRate(res.data.totalPickRate)
            setEnemyLanePickRate(res.data.lanePickRate)
          })
          .catch((err) => {
            console.log(err);
          });                   
      }
    }
  }, [mypickEn,enemyPickEn]);

  return (
    <div id = 'wrapper'>
      <div>
        상세페이지
        <br />
        라인:{lane}
        <br />
        내픽:{mypick}
        <br />
        상대픽:{enemyPick}
        <br />
      </div>
      <DetailTable
        lane = {lane}
        myPick = {mypick}
        enemyPick = {enemyPick}
        totalWinRate = {totalWinRate}
        relativeWinRate = {relativeWinRate}
        myBanRate = {myBanRate}
        enemyBanRate = {enemyBanRate}
        myPickRate = {myPickRate}
        myLanePickRate = {myLanePickRate}
        enemyPickRate = {enemyPickRate}
        enemyLanePickRate = {enemyLanePickRate}

      ></DetailTable>
    </div>
  );
}

export default Detail;
