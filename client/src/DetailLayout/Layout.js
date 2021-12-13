import React from 'react';
import { Grid, styled } from '@material-ui/core';
import { TopComponent, MiddleComponent, BottomComponent } from '.';

const GridContainer = styled(Grid)({
    backgroundColor: 'gray',
    width: '100vw',
    height: '100vh',
});

const GridItem = styled(Grid)({});

function Layout() {
    return (
        <GridContainer container spacing={1} alignItems="stretch">
            <GridItem lg={2} item>
                <BottomComponent />
            </GridItem>
            <GridItem lg item>
                <BottomComponent />
            </GridItem>
            <GridItem lg={2} item>
                <BottomComponent />
            </GridItem>
        </GridContainer>
    );
}

export default Layout;
