import { React, useState, useRef, useEffect } from 'react';
import { Avatar, Tooltip } from '@mui/material';
import '../css/RuneAvatar.css';
// import Tooltip from './Tooltip';

function RuneAvatar(props) {
  const imgUrl = props.src;
  const name = props.name;
  const description = props.description;
  const mounted = useRef(false);
  const hoverFlag = useRef(false);

  useEffect(() => {
    // componentDidMount
    console.log('componentDidMount');
  }, []);

  useEffect(() => {
    //componentDidUpdate
    if (!mounted.current) {
      mounted.current = true;
      console.log('mounted flag has been true');
    } else {
      console.log('componentDidUpdate');
    }
  }, []);

  const onMouseEnter = () => {
    hoverFlag.current = true;
  };

  const onMouseLeave = () => {
    hoverFlag.current = false;
  };

  return (
    <Tooltip
      title={
        <>
          <div>{name}</div>
          {description != undefined && <br />}
          {description != undefined && <div>{`${description}`}</div>}
        </>
      }
      placement="top"
      sx={{}}
      arrow
    >
      <Avatar
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
        alt={name}
        src={imgUrl}
        classes={{
          img: {
            width: '200px',
            height: '100px',
          },
        }}
      />
    </Tooltip>
  );
}

export default RuneAvatar;
