import { React, useEffect } from 'react';
import axios from 'axios';

function Detail({ location }) {
  const mypick = location.state.myPick;
  const enemyPick = location.state.enemyPick;
  const lane = location.state.lane;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/winrate/${mypick}/${lane}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
