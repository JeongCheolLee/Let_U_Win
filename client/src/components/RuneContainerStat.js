import React from 'react';
import StatAvatar from './StatAvatar';

function RuneContainerStat(props) {
    const activateList = props.activateList; // array
    const statPerks1 = ['AdaptiveForce', 'AttackSpeed', 'CDRScaling'];
    const statPerks2 = ['AdaptiveForce', 'Armor', 'MagicRes'];
    const statPerks3 = ['HealthScaling', 'Armor', 'MagicRes'];
    return (
        <div className="grid-container">
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item">
                {statPerks1.map((e) => (
                    <StatAvatar type={e} />
                ))}
            </div>
            <div className="grid-item">
                {statPerks2.map((e) => (
                    <StatAvatar type={e} />
                ))}
            </div>
            <div className="grid-item">
                {statPerks3.map((e) => (
                    <StatAvatar type={e} />
                ))}
            </div>
        </div>
    );
}

export default RuneContainerStat;
