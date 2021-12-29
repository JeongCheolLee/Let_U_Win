import * as React from 'react';

export default function DetailTable(props) {

  const laneTranslate = {
    top : '탑',
    jungle : '정글',
    midddle : '미드',
    bottom : '원딜',
    utility : '서포터'
  }

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
          <td>{(props.totalWinRate*100).toFixed(2)}%</td>
          <td>전체 승률</td>
          <td>{100 - (props.totalWinRate*100).toFixed(2)}%</td>
        </tr>
        <tr>
          <td>{props.relativeWinRate}%</td>
          <td> 포지션 승률</td>
          <td>{100 - props.relativeWinRate}%</td>
        </tr>
        <tr>
          <td>{(props.myPickRate*100).toFixed(2)}%</td>
          <td> 전체 픽률</td>
          <td>{(props.enemyPickRate*100).toFixed(2)}%</td>
        </tr>
        <tr>
          <td>{(props.myLanePickRate*100).toFixed(2)}%</td>
          <td> 포지션 픽률</td>
          <td>{(props.enemyLanePickRate*100).toFixed(2)}%</td>
        </tr>
        <tr>
          <td>{props.myBanRate}%</td>
          <td>밴률 </td>
          <td>{props.enemyBanRate}%</td>
        </tr>
      </tbody>
      <tfoot>
      </tfoot>
    </table>
  );
}