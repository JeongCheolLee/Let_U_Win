import { React, useState } from 'react';
import ButtonClickable from '../components/ButtonClickable.js';
import axios from 'axios';

function Home({ history }) {
    const [test, setTest] = useState('보내기');
    const lanes = [
        {
            ko: '탑',
            en: 'top',
        },
        {
            ko: '정글',
            en: 'jungle',
        },
        {
            ko: '미드',
            en: 'middle',
        },
        {
            ko: '원딜',
            en: 'bottom',
        },
        {
            ko: '서폿',
            en: 'utility',
        },
    ];

    const onClickDBtest = () => {
        axios
            .get('http://localhost:3001/')
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div align="center">
            <div
                style={{
                    fontSize: '35px',
                    fontWeight: 'bold',
                    fontFamily: ['궁서', '궁서체'],
                }}
            >
                ㅇㄷ?
            </div>
            {lanes.map((item) => {
                return (
                    <ButtonClickable
                        history={history}
                        key={item.en + item.ko}
                        lane={item}
                    />
                );
            })}
            <br />
            <button onClick={onClickDBtest}>{test}</button>
        </div>
    );
}

export default Home;
