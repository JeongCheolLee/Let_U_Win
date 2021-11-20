import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import getChampionsList from '../data/championList';

function Detail({ location }) {
  const mypick = location.state.myPick;
  const enemyPick = location.state.enemyPick;
  const lane = location.state.lane;
  const mounted = useRef(false);
  const [mypickEn, setMypickEn] = useState('');

  // componentDidMount
  useEffect(() => {
    getChampionsList().then((result) => {
      setMypickEn(result.filter((s) => s.name === mypick)[0].id);
    });
  }, []);

  // componentDidUpdate
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (mypick !== undefined) {
        axios
          .get(`http://localhost:3001/statistic/winrate/${mypickEn}/${lane}`)
          .then((res) => {
            //winRate test done
            console.log(res.data.winRate);
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`http://localhost:3001/statistic/banrate/${mypickEn}`)
          .then((res) => {
            //banRate test done
            console.log(res.data.banRate);
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`http://localhost:3001/statistic/pickrate/${mypickEn}/${lane}`)
          .then((res) => {
            //pickRate test done
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [mypickEn]);

  return (
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
  );
}

export default Detail;
