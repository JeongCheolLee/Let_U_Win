import React from 'react';
import { Avatar, Tooltip } from '@mui/material';
import statList from '../data/statPerks.json';

function StatAvatar(props) {
    const stat = statList.find((e) => e.id === props.statId);

    return (
        <Tooltip
            title={
                <>
                    <div style={{ color: 'gold', fontWeight: 'bold' }}>
                        {props.style}
                    </div>
                    <br />
                    <div>{stat.desc}</div>
                </>
            }
            placement="top"
        >
            <Avatar
                sx={{ width: '2rem', height: '2rem' }}
                alt={stat.key}
                src={stat.img}
                className={props.activate ? 'activated' : 'inactivated'}
            />
        </Tooltip>
    );
}

export default StatAvatar;
