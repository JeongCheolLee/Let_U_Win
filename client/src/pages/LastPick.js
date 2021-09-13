import {React, useState, useCallback} from 'react';
import ImageListHjlee from '../components/ImageListHjlee';

function LastPick() {

    const goongseo = {fontWeight:"bold", fontFamily:["궁서","궁서체"]}

    const [myPick, setMyPick] = useState('none');
    const [enemyPick, setEnemyPick] = useState('none');

    const getMyPickFromImageList = useCallback((champ) => {
        setMyPick(champ);
    }, [myPick])

    return (
        <div align="center">
            <h1 style={{...goongseo}} >
                후픽이시군요! <br />
                챔피언을 골라주세요!
            </h1>
            {/* {(myPick === 'none') && <ImageListHjlee getMyPickFromImageList={getMyPickFromImageList}/>} */}
            <ImageListHjlee getMyPickFromImageList={getMyPickFromImageList}/>
            <div>{myPick}</div>
        </div>
    )
}

export default LastPick
