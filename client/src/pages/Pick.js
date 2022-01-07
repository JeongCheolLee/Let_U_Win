import { React, useState, useCallback, useEffect } from 'react';
import ImageListHjlee from '../components/ImageListHjlee';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
// import itemDataAll from '../data/itemDataAll';

function Pick({ history, match, location }) {
    const goongseo = { fontWeight: 'bold', fontFamily: ['궁서', '궁서체'] };

    const [championsList, setChampionsList] = useState([]);
    const [filteredChampionsList, setFilteredChampionsList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [myPick, setMyPick] = useState('none');
    const [enemyPick, setEnemyPick] = useState('none');

    function laneSelector(lane) {
        if (lane === 'top') {
            return '타-압';
        } else if (lane === 'jungle') {
            return '정-글';
        } else if (lane === 'middle') {
            return '미-드';
        } else if (lane === 'bottom') {
            return '원-딜';
        } else {
            return '서포-타';
        }
    }

    useEffect(() => {
        axios
            .get('http://localhost:3001/champions/all')
            .then((res) => {
                let list = res.data.list;
                list.sort(function (a, b) {
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                });
                setChampionsList([...list.slice()]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (searchText !== '') {
            setFilteredChampionsList((prevState) => {
                let temp = [];
                championsList.map((item) => {
                    // 포함하면
                    // if(item.name.includes(searchText)) {
                    //     temp.push(item)
                    // }
                    if (item.name.startsWith(searchText)) {
                        temp.push(item);
                    }
                });
                return temp.slice();
            });
        } else {
            setFilteredChampionsList(championsList.slice());
        }
        console.log('2');
    }, [searchText, championsList]);

    const getMyPickFromImageList = useCallback((champ) => {
        setMyPick(champ);
        setSearchText('');
    }, []);

    const getEnemyPickFromImageList = useCallback((champ) => {
        setEnemyPick(champ);
        setSearchText('');
    }, []);

    const getSearchTextFromSearchBar = useCallback((text) => {
        setSearchText(text);
    }, []);

    const onClickCancelBtn = () => {
        setMyPick('none');
        setEnemyPick('none');
    };

    const moveToDetail = () => {
        history.push({
            pathname: `${match.url}/detail`,
            state: {
                lane: location.state,
                myPick: myPick,
                enemyPick: enemyPick,
            },
        });
    };

    return (
        <div align="center">
            <h1 style={{ ...goongseo }}>
                {laneSelector(location.state)} 포지션을 선택하셨소. <br />
            </h1>
            {myPick === 'none' && (
                <div>
                    <h1>이제, 플레이 할 챔피언을 선택해주시오</h1>
                    <SearchBar
                        label="나의 픽"
                        getSearchTextFromSearchBar={getSearchTextFromSearchBar}
                    />
                    <ImageListHjlee
                        filteredChampionsList={filteredChampionsList}
                        getPickFromImageList={getMyPickFromImageList}
                    />
                </div>
            )}
            <br />
            <div>
                나으 픽 : {myPick}
                <button
                    onClick={onClickCancelBtn}
                    style={{ marginLeft: '25px' }}
                >
                    cancel
                </button>
            </div>
            <br />
            {myPick !== 'none' && enemyPick === 'none' && (
                <div>
                    <h1>그럼 이제, 상대방 챔피언을 선택해주시오</h1>
                    <SearchBar
                        label="상대 픽"
                        getSearchTextFromSearchBar={getSearchTextFromSearchBar}
                    />
                    <ImageListHjlee
                        filteredChampionsList={filteredChampionsList}
                        getPickFromImageList={getEnemyPickFromImageList}
                    />
                </div>
            )}
            <br />

            <div>
                상대 픽 : {enemyPick}
                <button
                    onClick={onClickCancelBtn}
                    style={{ marginLeft: '25px' }}
                >
                    cancel
                </button>
            </div>
            <br />
            <button onClick={moveToDetail}>확정!</button>
        </div>
    );
}

export default Pick;
