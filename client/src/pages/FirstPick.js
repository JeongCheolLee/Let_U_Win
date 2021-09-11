import React from 'react';
import TitlebarImageList from '../components/image_list'


function FirstPick({ location }) {
    const lane = location.state;

    const goongseo = {fontWeight:"bold", fontFamily:["궁서","궁서체"]}

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
                {TitlebarImageList()}
            </div>

        </div>
    )
}

export default FirstPick
