import React from 'react';
import styled from 'styled-components';
import ChampionAvatar from '../components/ChampionAvatar';

function VersusContainer() {
    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 8fr;
        // background-color: blue;
        // color: white;
        width: 100%;
        height: 100%;
    `;

    const GridItem = styled.div`
        // background-color: gray;
        border: 1px solid pink;
        margin: 1px;
    `;

    const TitleBar = styled(GridItem)`
        display: flex;
        align-items: center;
        grid-column: span 3;
        font-size: 2em;
        padding-left: 0.5em;
    `;

    return (
        <GridContainer>
            <TitleBar>
                <div>미-드</div>
            </TitleBar>
            <GridItem>
                <ChampionAvatar></ChampionAvatar>
            </GridItem>
            <GridItem>c</GridItem>
            <GridItem>d</GridItem>
        </GridContainer>
    );
}

export default VersusContainer;
