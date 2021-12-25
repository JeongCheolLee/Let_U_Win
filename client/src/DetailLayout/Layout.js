import React from 'react';
import styled from 'styled-components';
import { VersusContainer, MiddleComponent, BottomComponent, SideBar } from '.';

function Layout() {
    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-template-rows: 3fr 4fr 4fr;
        width: 100vw;
        height: 150vh;
        // background-color: black;
        padding: 10px;
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
            <SideBar>SideBar</SideBar>
            <GridItem>
                <VersusContainer></VersusContainer>
            </GridItem>
            <SideBar>SideBar</SideBar>
            <GridItem>
                <MiddleComponent></MiddleComponent>
            </GridItem>
            <GridItem>
                <BottomComponent></BottomComponent>
            </GridItem>
        </GridContainer>
    );
}

export default Layout;
