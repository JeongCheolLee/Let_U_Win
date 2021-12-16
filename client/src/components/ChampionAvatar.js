import React from 'react';
import { Avatar, styled } from '@material-ui/core';

function ChampionAvatar() {
    const imgUrl = '';
    const CustomAvatar = styled(Avatar)({
        width: '100%',
        // height: '100%',
        paddingTop: '100%',
        border: '5px solid gray',
    });
    return (
        <CustomAvatar
            alt="Aatrox.jpg"
            src="/images/champions/aatrox.jpg"
        ></CustomAvatar>
    );
}

export default ChampionAvatar;
