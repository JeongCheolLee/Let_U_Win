import { React } from 'react';
import ButtonClickable from '../components/ButtonClickable.js';
// import '../css/Home.css';
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
            ko: '서포-타',
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
                    marginTop: '5%',
                    marginBottom: '10%',
                }}
            >
                어디로 가야 하오?
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
