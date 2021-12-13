import React from 'react';
import { Grid } from '@mui/material';
import RuneContainerMain from './RuneContainerMain';
import RuneContainerSub from './RuneContainerSub';
import RuneContainerStat from './RuneContainerStat';

function RuneContainer() {
    return (
        <Grid sx={{ height: '50vh' }} container spacing={0} columns={3}>
            <Grid item xs={1}>
                <RuneContainerMain
                    style={8100}
                    activateList={[8112, 8126, 8120, 8105]}
                />
            </Grid>
            <Grid item xs={1}>
                <RuneContainerSub style={8200} activateList={[8234, 8237]} />
            </Grid>
            <Grid item xs={1}>
                <RuneContainerStat />
            </Grid>
        </Grid>
    );
}

export default RuneContainer;
