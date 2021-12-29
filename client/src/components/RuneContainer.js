import React from 'react';
import { Grid } from '@mui/material';
import RuneContainerMain from './RuneContainerMain';
import RuneContainerSub from './RuneContainerSub';
import RuneContainerStat from './RuneContainerStat';

function RuneContainer(props) {
    return (
        <Grid sx={{ height: '100%' }} container spacing={10} columns={3}>
            <Grid item xs={1}>
                <RuneContainerMain
                    style={props.style[0]}
                    activateList={props.activation[0]}
                />
            </Grid>
            <Grid item xs={1}>
                <RuneContainerSub
                    style={props.style[1]}
                    activateList={props.activation[1]}
                />
            </Grid>
            <Grid item xs={1}>
                <RuneContainerStat activateList={props.stat} />
            </Grid>
        </Grid>
    );
}

export default RuneContainer;
