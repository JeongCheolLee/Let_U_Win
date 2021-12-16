import React from 'react';
import styled from 'styled-components';
import { VersusContainer, MiddleComponent, BottomComponent, SideBar } from '.';

function Layout() {
    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: 2fr 6fr 2fr;
        grid-template-rows: 3fr 4fr 3fr;
        width: 100vw;
        height: 100vh;
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
