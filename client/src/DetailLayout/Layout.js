import React from 'react';
import { Grid, styled } from '@material-ui/core';
import { TopComponent, MiddleComponent, BottomComponent } from '.';

const GridContainer = styled(Grid)({
    backgroundColor: 'gray',
    width: '100vw',
    height: '100vh',
});

const GridItem = styled(Grid)({});

const NestedGridItem = styled(Grid)({
    // backgroundColor: 'red',
});

const NestedGridContainer = styled(Grid)({
    backgroundColor: 'green',
    height: '100%',
});

function Layout() {
    return (
        <GridContainer container spacing={1} alignItems="stretch">
            <GridItem lg={2} item>
                <BottomComponent />
            </GridItem>
            <GridItem lg item>
                <NestedGridContainer
                    container
                    spacing={1}
                    direction="column"
                    justifyContent="space-between"
                >
                    <NestedGridItem item lg>
                        <TopComponent></TopComponent>
                    </NestedGridItem>
                    <NestedGridItem item lg>
                        <TopComponent></TopComponent>
                    </NestedGridItem>
                    <NestedGridItem item lg>
                        <TopComponent></TopComponent>
                    </NestedGridItem>
                </NestedGridContainer>
            </GridItem>
            <GridItem lg={2} item>
                <BottomComponent />
            </GridItem>
        </GridContainer>
    );
}

export default Layout;
