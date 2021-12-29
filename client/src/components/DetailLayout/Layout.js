import { React, memo } from 'react';
import styled from 'styled-components';
import RuneContainer from '../RuneContainer';
import { VersusContainer, MiddleComponent } from '.';

function Layout(props) {
    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-template-rows: 3fr 4fr 4fr;
        width: 99vw;
        height: 150vh;
        // background-color: black;
        padding: 10px;
        row-gap: 30px;
    `;

    const GridItem = styled.div`
        // background-color: white;
        // border: 2px solid pink;
        margin: 1px;
    `;

    const SideBar = styled(GridItem)`
        text-align: center;
        grid-row: span 3;
    `;

    return (
        <GridContainer>
            <SideBar></SideBar>
            <GridItem>
                <VersusContainer
                    myPick={props.myPick}
                    enemyPick={props.enemyPick}
                    lane={props.lane}
                ></VersusContainer>
            </GridItem>
            <SideBar></SideBar>
            <GridItem>
                <MiddleComponent></MiddleComponent>
            </GridItem>
            <GridItem>
                <h1 style={{ fontWeight: 'bold' }}>루-운</h1>
                <RuneContainer
                    style={props.perkStyles}
                    activation={props.perkActivation}
                    stat={props.perkStat}
                ></RuneContainer>
            </GridItem>
        </GridContainer>
    );
}

export default Layout;
