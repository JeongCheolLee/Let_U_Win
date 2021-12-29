import React from 'react';
import StatAvatar from './StatAvatar';

function RuneContainerStat(props) {
    const activateList = props.activateList; // array
    // const statPerks1 = ['AdaptiveForce', 'AttackSpeed', 'CDRScaling'];
    // const statPerks2 = ['AdaptiveForce', 'Armor', 'MagicRes'];
    // const statPerks3 = ['HealthScaling', 'Armor', 'MagicRes'];

    const statPerks1 = [5008, 5005, 5007];
    const statPerks2 = [5008, 5002, 5003];
    const statPerks3 = [5001, 5002, 5003];
    return (
        <div className="grid-container">
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item">
                {statPerks1.map((e) => (
                    <StatAvatar
                        key={'OFFENSE' + e}
                        style="OFFENSE"
                        statId={e}
                        activate={e === activateList[0]}
                    />
                ))}
            </div>
            <div className="grid-item">
                {statPerks2.map((e) => (
                    <StatAvatar
                        key={'FLEX' + e}
                        style="FLEX"
                        statId={e}
                        activate={e === activateList[1]}
                    />
                ))}
            </div>
            <div className="grid-item">
                {statPerks3.map((e) => (
                    <StatAvatar
                        key={'DEFENSE' + e}
                        style="DEFENSE"
                        statId={e}
                        activate={e === activateList[2]}
                    />
                ))}
            </div>
        </div>
    );
}

export default RuneContainerStat;
