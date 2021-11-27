import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import getChampionsList from '../data/championList';
import RuneAvatar from '../components/RuneAvatar';
import RuneContainerMain from '../components/RuneContainerMain';
import RuneList from '../data/runesReforged_10_10_5.json';
import RuneContainerSub from '../components/RuneContainerSub';
import { flexbox } from '@mui/system';
import RuneContainerStat from '../components/RuneContainerStat';
import '../css/Detail.css';

function Detail({ location }) {
    const mypick = location.state.myPick;
    const enemyPick = location.state.enemyPick;
    const lane = location.state.lane;
    const mounted = useRef(false);
    const [mypickEn, setMypickEn] = useState('aa');

    // componentDidMount
    useEffect(() => {
        console.log('componentDidMount');
        getChampionsList().then((result) => {
            setMypickEn(result.filter((s) => s.name === mypick)[0].id);
            console.log(mypickEn);
        });
    }, []);

    // componentDidUpdate
    useEffect(() => {
        console.log('update');
        if (!mounted.current) {
            mounted.current = true;
        } else {
            if (mypick !== undefined) {
                axios
                    .get(
                        `http://localhost:3001/statistic/winrate/${mypickEn}/${lane}`
                    )
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
                    .get(
                        `http://localhost:3001/statistic/pickrate/${mypickEn}/${lane}`
                    )
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
        <div align="center" style={{ width: '100%', height: '100vh' }}>
            상세페이지
            <br />
            라인:{lane}
            <br />
            내픽:{mypick}
            <br />
            상대픽:{enemyPick}
            <br />
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    height: '50vh',
                }}
            >
                <RuneContainerMain
                    style={8100}
                    activateList={[8112, 8126, 8120, 8105]}
                ></RuneContainerMain>
                <RuneContainerSub
                    style={8200}
                    activateList={[8234, 8237]}
                ></RuneContainerSub>
                <RuneContainerStat></RuneContainerStat>
            </div>
            {/* <div>
        {RuneList.map((e) => (
          <div>
            <RuneAvatar src={`/images/${e.icon}`} name={e.name}></RuneAvatar>
            {e.slots.map((s) =>
              s.runes.map((r) => (
                <RuneAvatar
                  src={`/images/${r.icon}`}
                  name={r.name}
                  description={r.shortDesc}
                ></RuneAvatar>
              ))
            )}
          </div>
        ))}
      </div> */}
        </div>
    );
}

export default Detail;
