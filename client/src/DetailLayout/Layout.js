import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { TopComponent, MiddleComponent, BottomComponent, SideBar } from '.';

// const GridContainer = styled(Grid)({
//     backgroundColor: 'gray',
//     width: '100vw',
//     height: '100vh',
// });

// const GridItem = styled(Grid)({});

// const NestedGridItem = styled(Grid)({
//     backgroundColor: 'red',
// });

// const NestedGridContainer = styled(Grid)({
//     backgroundColor: 'green',
//     height: '100%',
// });

function Layout() {
    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: 2fr 6fr 2fr;
        grid-template-rows: 4fr 4fr 3fr;
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
        grid-row: span 3;
    `;

    return (
        <GridContainer>
            <SideBar>SideBar</SideBar>
            <GridItem>
                <TopComponent></TopComponent>
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
    // <GridContainer container spacing={1} alignItems="stretch">
    //     <GridItem xs={0} md={2} lg={2} item>
    //         <BottomComponent />
    //     </GridItem>
    //     <GridItem xs md lg item>
    //         <NestedGridContainer
    //             container
    //             spacing={1}
    //             direction="column"
    //             justifyContent="space-between"
    //         >
    //             <NestedGridItem item>
    //                 <TopComponent></TopComponent>
    //             </NestedGridItem>
    //             <NestedGridItem item>
    //                 <MiddleComponent></MiddleComponent>
    //             </NestedGridItem>
    //             <NestedGridItem item>
    //                 <TopComponent></TopComponent>
    //             </NestedGridItem>
    //         </NestedGridContainer>
    //     </GridItem>
    //     <GridItem xs={0} md={2} lg={2} item>
    //         <BottomComponent />
    //     </GridItem>
    // </GridContainer>
}

export default Layout;
