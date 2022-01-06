import { React, useState, useEffect } from 'react';
import getChampionsList from '../data/championList';
import { Avatar, styled } from '@material-ui/core';

function ChampionAvatar(props) {

    const championName = props.name;
    const [championNameEn, setChampionNameEn] = useState('');

    useEffect(() => {
        if (championNameEn === '') {
            getChampionsList().then((result) => {
                setChampionNameEn((prev) => {
<<<<<<< HEAD
=======
                    cnt = 1;
>>>>>>> 81fce32922912103258db70adccc403f8d74d60f
                    return result.filter((s) => s.name === championName)[0].id;
                });
            });
        }
    }, []);

    const imgUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championNameEn}_0.jpg`;
    const AvatarDiv = styled('div')({
        width: '80%',
        height: 0,
        paddingTop: '80%',
        position: 'relative',
        margin: '8% auto auto',
    });

    const length = 85;
    const beginCoord = 50 - length / 2;

    const CustomAvatar = styled(Avatar)({
        width: `${length}%`,
        height: `${length}%`,
        position: 'absolute',
        top: `${beginCoord}%`,
        left: `${beginCoord}%`,
        border: `5px solid ${props.myPick === true ? '#a145dc' : '#20b581'}`,
    });

    const NameBar = styled('div')({
        textAlign: 'center',
        fontFamily: ['궁서', '궁서체'],
        fontWeight: 'bold',
        fontSize: '2.5em',
        // border: '1px solid blue',
    });

    return (
        <>
            <AvatarDiv>
                <CustomAvatar
                    className="myPick"
                    alt={championNameEn}
                    src={imgUrl}
                ></CustomAvatar>
            </AvatarDiv>
            <NameBar>{championName}</NameBar>
        </>
    );
}

export default ChampionAvatar;
