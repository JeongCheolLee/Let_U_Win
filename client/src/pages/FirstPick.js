import React from 'react';
import TitlebarImageList from '../components/image_list'
import background from '../images/background/hanji2.jpg'

function FirstPick({location}) {
    const lane = location.state;

    const goongseo = {fontWeight:"bold", fontFamily:"궁서"}

    const backgroundset = {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    }

    return (
        <div align = "center" style = {{backgroundset}}>
            <h1 style={goongseo}>
                선픽이시군요! <br />
                요즘 {lane}포지션에서 승률 좋은 챔피언을 추천드릴게요!<br /><br /><br />
            </h1>

            <p style = {{...goongseo, fontSize:'25px'}}>
                플레이 하고 싶은 챔피언을 선택해주세요
            </p>

            <p>
            {TitlebarImageList()}
            </p>
        </div>
    )
}

export default FirstPick
