import React from 'react';
import { Avatar } from 'antd';


function Portrait(props) {
    const imageUrl = "/images/champions/" + props.championName + ".jpg";

    // const championImg = require(imageUrl);

    const preventClick = (e) => {
        e.preventDefault();
    }

    return (
        <a href="#" onClick={preventClick}>
            <Avatar shape="square" size={70} src={imageUrl}/>
        </a>
    )
}

export default Portrait
