import React from 'react';
import RuneAvatar from './RuneAvatar';
import RuneList from '../data/runesReforged_10_10_5_sorted.json';

function RuneContainerMain(props) {
    const style = props.style;
    const runes = RuneList.filter((e) => e.style === style);
    const activateList = props.activateList; // array

    return (
        <div className="grid-container">
            <div key={'gridItem1'} className="grid-item">
                <RuneAvatar
                    id={runes.find((e) => e.order === -1).id}
                    activate={true}
                />
            </div>
            <div key={'gridItem2'} className="grid-item">
                {runes
                    .filter((e) => e.order === 0)
                    .map((e) => (
                        <RuneAvatar
                            key={e.style + e.id + e.order}
                            id={e.id}
                            activate={
                                activateList.includes(e.id) ? true : false
                            }
                        />
                    ))}
            </div>
            <div key={'gridItem3'} className="grid-item">
                {runes
                    .filter((e) => e.order === 1)
                    .map((e) => (
                        <RuneAvatar
                            key={e.style + e.id + e.order}
                            id={e.id}
                            activate={
                                activateList.includes(e.id) ? true : false
                            }
                        />
                    ))}
            </div>
            <div key={'gridItem4'} className="grid-item">
                {runes
                    .filter((e) => e.order === 2)
                    .map((e) => (
                        <RuneAvatar
                            key={e.style + e.id + e.order}
                            id={e.id}
                            activate={
                                activateList.includes(e.id) ? true : false
                            }
                        />
                    ))}
            </div>
            <div key={'gridItem5'} className="grid-item">
                {runes
                    .filter((e) => e.order === 3)
                    .map((e) => (
                        <RuneAvatar
                            key={e.style + e.id + e.order}
                            id={e.id}
                            activate={
                                activateList.includes(e.id) ? true : false
                            }
                        />
                    ))}
            </div>
        </div>
    );
}

export default RuneContainerMain;
