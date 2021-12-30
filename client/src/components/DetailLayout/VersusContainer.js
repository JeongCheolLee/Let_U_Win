import React from 'react';
import styled from 'styled-components';
import ChampionAvatar from '../ChampionAvatar';

function VersusContainer(props) {
    let laneTitle;

    switch (props.lane) {
        case 'top':
            laneTitle = '타-압';
            break;
        case 'jungle':
            laneTitle = '정-글';
            break;
        case 'middle':
            laneTitle = '미-드';
            break;
        case 'bottom':
            laneTitle = '원-딜';
            break;
        case 'utility':
            laneTitle = '서포-타';
            break;
    }

    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        // background-color: blue;
        // color: white;
        width: 100%;
        height: 100%;
    `;

    const GridItem = styled.div`
        // background-color: gray;
        // border: 1px solid pink;
        text-align: center;
        // margin: 1px;
    `;

    const TitleBar = styled(GridItem)`
        display: flex;
        justify-content: center;
        font-size: 2.5em;
        padding-left: 0.5em;
        font-weight: bold;
    `;

    return (
        <GridContainer>
            <GridItem>
                <ChampionAvatar
                    name={props.myPick}
                    myPick>
                </ChampionAvatar>
            </GridItem>
            <GridItem>
                <TitleBar>{laneTitle}</TitleBar>
                <img
                    style={{ width: '75%' }}
                    src="/images/icons/vs_icon.png"
                ></img>
            </GridItem>
            <GridItem>
                <ChampionAvatar
                    name={props.enemyPick}
                    enemyPick>
                </ChampionAvatar>
            </GridItem>
        </GridContainer>
    );
}

export default VersusContainer;
