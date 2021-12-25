import React from 'react';
import styled from 'styled-components';
import ChampionAvatar from '../components/ChampionAvatar';

function VersusContainer() {
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
        border: 1px solid pink;
        text-align: center;
        // margin: 1px;
    `;

    const TitleBar = styled(GridItem)`
        display: flex;
        justify-content: center;
        font-size: 2em;
        padding-left: 0.5em;
    `;

    return (
        <GridContainer>
            {/* <TitleBar>
                <div>미-드</div>
            </TitleBar> */}
            <GridItem>
                <ChampionAvatar name="aatrox"></ChampionAvatar>
            </GridItem>
            <GridItem>
                <TitleBar>미-드</TitleBar>
                <img
                    style={{ width: '75%' }}
                    src="/images/icons/vs_icon.png"
                ></img>
            </GridItem>
            <GridItem>
                <ChampionAvatar name="akali"></ChampionAvatar>
            </GridItem>
        </GridContainer>
    );
}

export default VersusContainer;
