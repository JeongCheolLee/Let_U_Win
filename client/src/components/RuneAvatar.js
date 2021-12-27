import { React } from 'react';
import { Avatar, Tooltip } from '@mui/material';
import RuneList from '../data/runesReforged_10_10_5_sorted.json';

// import Tooltip from './Tooltip';

function RuneAvatar(props) {
    const Rune = RuneList.find((e) => e.id === props.id);
    const imgUrl = Rune.icon;
    const name = Rune.name;
    const description = Rune.shortDesc;

    return (
        <Tooltip
            title={
                <>
                    <div style={{ color: 'gold', fontWeight: 'bold' }}>
                        {name}
                    </div>
                    {description !== undefined && <br />}
                    {description !== undefined && <div>{`${description}`}</div>}
                </>
            }
            placement="top"
            sx={{}}
            arrow
            disableInteractive={true}
        >
            <Avatar
                // onMouseEnter={onMouseEnter}
                // onMouseLeave={onMouseLeave}
                sx={{ width: '3rem', height: '3rem' }}
                alt={name}
                src={`/images/${imgUrl}`}
                className={props.activate ? 'activated' : 'inactivated'}
            />
        </Tooltip>
    );
}

export default RuneAvatar;
