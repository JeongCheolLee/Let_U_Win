import React from 'react';
import RuneAvatar from './RuneAvatar';
import '../css/RuneContainerMain.css';

function RuneContainerMain(props) {
    const style = props.style;
    const perk = props.main;

    return (
        <div className="grid-container">
            <div className="grid-item blank" />
            <div className="grid-item">item</div>
            <div className="grid-item blank" />
            <div className="grid-item">item</div>
            <div className="grid-item">item</div>
            <div className="grid-item">item</div>
            <div className="grid-item">item</div>
            <div className="grid-item">item</div>
            <div className="grid-item">item</div>
            <div className="grid-item">item</div>
            <div className="grid-item">item</div>
            <div className="grid-item">item</div>
            <div className="grid-item">item</div>
            <div className="grid-item">item</div>
            <div className="grid-item">item</div>
        </div>
    );
}

export default RuneContainerMain;
