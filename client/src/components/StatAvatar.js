import React from 'react';
import { Avatar, Tooltip } from '@mui/material';

function StatAvatar(props) {
    const type = props.type;

    const getStatPerks = React.useCallback((type) => {
        const result = [];
        switch (type) {
            case 'AdaptiveForce':
                result.push(
                    '/images/perk-images/StatMods/StatModsAdaptiveForceIcon.png'
                );
                result.push('적응형 능력치 +9');
                break;
            case 'Armor':
                result.push(
                    '/images/perk-images/StatMods/StatModsArmorIcon.png'
                );
                result.push('방어력 +6');
                break;
            case 'AttackSpeed':
                result.push(
                    '/images/perk-images/StatMods/StatModsAttackSpeedIcon.png'
                );
                result.push('공격 속도 +10%');
                break;
            case 'CDRScaling':
                result.push(
                    '/images/perk-images/StatMods/StatModsCDRScalingIcon.png'
                );
                result.push('스킬 가속 +8');
                break;
            case 'HealthScaling':
                result.push(
                    '/images/perk-images/StatMods/StatModsHealthScalingIcon.png'
                );
                result.push('체력 +15 ~ 140 (레벨에 비례)');
                break;
            case 'MagicRes':
                result.push(
                    '/images/perk-images/StatMods/StatModsMagicResIcon.png'
                );
                result.push('마법저향력 +8');
                break;
            default:
                console.log('wrong statperk type');
                result.push('');
                result.push('-1');
                break;
        }
        return result;
    }, []);

    const statPerk = getStatPerks(type);
    console.log(statPerk);
    console.log(type);
    return (
        <Tooltip title={statPerk[1]} placement="top">
            <Avatar
                sx={{ width: '2rem', height: '2rem' }}
                alt={type}
                src={statPerk[0]}
                className={props.activate ? 'activated' : 'inactivated'}
            />
        </Tooltip>
    );
}

export default StatAvatar;
