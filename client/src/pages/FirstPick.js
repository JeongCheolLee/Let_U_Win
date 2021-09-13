import {React, useState, useCallback} from 'react';
import TitlebarImageList from '../components/image_list'
import TitlebarImageListForAll from '../components/image_list_all'

function FirstPick({ location }) {
    const lane = location.state;
    const goongseo = {fontWeight:"bold", fontFamily:["궁서","궁서체"]}

    const [myPick, setMyPick] = useState('____');

    const getMyPickFromImageList = useCallback((champ) => {
        setMyPick(champ);
    }, [])

    return (
        <div align = "center">
            <h1 style={goongseo} >
                선픽이시군요! <br />
                요즘 {lane}포지션에서 승률 좋은 챔피언을 추천드릴게요!
            </h1>

            <div style = {{...goongseo, fontSize:'22px', marginTop: '50px'}}>
                플레이 하고 싶은 챔피언을 클릭해주세요!
            </div>

            <div style = {{marginTop: '20px'}}>
                <TitlebarImageList getMyPickFromImageList={getMyPickFromImageList}/>

                <div style = {{...goongseo, marginLeft: '20px', marginTop: '50px', fontSize: '25px'}} align = "center">
                    {myPick}, 훌륭한 선택의 표본입니다. 
                </div>
            </div>

            <div style = {{...goongseo, fontSize:'22px', marginTop: '50px'}}> 
                이곳에 플레이 하고 싶은 챔피언이 없으신가요?
                <button style = {{marginLeft: '20px'}}> 네 </button>
            </div>

            <div>
                <TitlebarImageListForAll/>
            </div>

        </div>
    )
}

export default FirstPick
