import React from 'react';
import TitlebarImageList from '../components/image_list'

function FirstPick({location}) {
    console.log(location.state);
    const lane = location.state;
    console.log(location);
    console.log(lane);

    return (
        <div>
            <h1>선픽이시군요! <br />요즘 {lane}포지션에서 핫한 챔피언을 추천드릴게요</h1>
            {console.log(process.env.PUBLIC_URL)}
            {TitlebarImageList()}

        </div>
    )
}

export default FirstPick
