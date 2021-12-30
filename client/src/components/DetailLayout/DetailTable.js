import {React, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import getChampionsList from '../../data/championList';

export default function DetailTable(props) {

  const laneTranslate = {
    top : '탑',
    jungle : '정글',
    midddle : '미드',
    bottom : '원딜',
    utility : '서포터'
  }

  const [myPickEn, setMypickEn] = useState('');
  const [enemyPickEn, setEnemyPickEn] = useState('');
  const [totalWinRate, setTotalWinRate] = useState('');
  const [relativeWinRate, setRelativeWinRate] = useState('');
  const [myBanRate, setMyBanRate] = useState('');
  const [enemyBanRate, setEnemyBanRate] = useState('');
  const [myPickRate, setMyPickRate] = useState('');
  const [myLanePickRate, setMyLanePickRate] = useState('');
  const [enemyPickRate, setEnemyPickRate] = useState('');
  const [enemyLanePickRate, setEnemyLanePickRate] = useState('');  

  const myPick = props.myPick;
  const enemyPick = props.enemyPick;
  const lane = props.lane;
  const mounted = useRef(false);

  // componentDidMount
  useEffect( () => {
    console.log('Mount')
    getChampionsList().then((result) => {
      setMypickEn(result.filter((s) => s.name === myPick)[0].id);
      setEnemyPickEn(result.filter((s) => s.name === enemyPick)[0].id);
      console.log(result.filter((s) => s.name === myPick)[0].id)
      console.log(myPickEn)
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
      if (myPick !== undefined) {
        axios
          .get(`http://localhost:3001/statistic/winrate/${myPickEn}/${lane}`)
          .then((res) => {
            setTotalWinRate(res.data.winRate)
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`http://localhost:3001/statistic/winrate/${myPickEn}/${lane}/${enemyPickEn}`)
          .then((res) => {
            setRelativeWinRate(res.data.relativeWinRate)
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`http://localhost:3001/statistic/banrate/${myPickEn}`)
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
          .get(`http://localhost:3001/statistic/pickrate/${myPickEn}/${lane}`)
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
  }, [myPickEn,enemyPickEn]);


  return (
    <table>
      <thead>
        <tr>
          <th>{props.myPick}</th>
          <th></th>
          <th>{props.enemyPick}</th>
        </tr>
      </thead>
      <tbody style = {{textAlign : 'center'}}>
        <tr>
          <td>{(totalWinRate*100).toFixed(2)}%</td>
          <td>전체 승률</td>
          <td>{100 - (totalWinRate*100).toFixed(2)}%</td>
        </tr>
        <tr>
          <td>{relativeWinRate}%</td>
          <td> 포지션 승률</td>
          <td>{100 - relativeWinRate}%</td>
        </tr>
        <tr>
          <td>{(myPickRate*100).toFixed(2)}%</td>
          <td> 전체 픽률</td>
          <td>{(enemyPickRate*100).toFixed(2)}%</td>
        </tr>
        <tr>
          <td>{(myLanePickRate*100).toFixed(2)}%</td>
          <td> 포지션 픽률</td>
          <td>{(enemyLanePickRate*100).toFixed(2)}%</td>
        </tr>
        <tr>
          <td>{myBanRate}%</td>
          <td>밴률 </td>
          <td>{enemyBanRate}%</td>
        </tr>
      </tbody>
      <tfoot>
      </tfoot>
    </table>
  );
}