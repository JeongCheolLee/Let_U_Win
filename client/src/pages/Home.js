import { React } from 'react';
import ButtonClickable from '../components/ButtonClickable.js';
import '../css/Home.css';
function Home({ history }) {
    const lanes = [
        {
            ko: '타-압',
            en: 'top',
        },
        {
            ko: '정-글',
            en: 'jungle',
        },
        {
            ko: '미-드',
            en: 'middle',
        },
        {
            ko: '원-딜',
            en: 'bottom',
        },
        {
            ko: '서포-터',
            en: 'utility',
        },
    ];

    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    fontSize: '40px',
                    fontWeight: 'bold',
                    fontFamily: ['궁서', '궁서체'],

                    marginBottom: '5%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        fontSize: '2rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img src="/images/leesin/Leesin.png"></img>
                    <span>
                        그대의 승리를 위해 <br></br>챔피언 상성을 분석하고 룬을
                        추천해주겠소,
                        <br></br>
                        <br></br>
                        그럼 가장 먼저, 어디로 가야 하오?
                    </span>
                </div>
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
        </div>
    );
}

export default Home;
