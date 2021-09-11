import {React} from 'react';
import ButtonClickable from '../components/ButtonClickable.js';

function Home() {
    const lanes = [
        {
            ko:'탑',
            en:'top',
        },
        {
            ko:'정글',
            en:'jungle',
        },
        {
            ko:'미드',
            en:'middle',
        },
        {
            ko:'원딜',
            en:'bottom',
        },
        {
            ko:'서폿',
            en:'support',
        },
    ]

    return (
        <div align='center'>
            <div style={{
                fontSize:'35px',
                fontWeight:'bold',
                fontFamily:['궁서', '궁서체'],
            }}>
                ㅇㄷ?
            </div>
            {lanes.map((item) => {
                return (
                    <ButtonClickable key={item.en+item.ko} lane={item}/>
                )
            })}
        </div>
    )
}

export default Home
