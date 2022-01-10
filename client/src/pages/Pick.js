import { React, useState, useCallback, useEffect } from 'react';
import ImageListHjlee from '../components/ImageListHjlee';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@material-ui/core';
import CheckIcon from '@mui/icons-material/Check';
// import itemDataAll from '../data/itemDataAll';

function Pick({ history, match, location }) {
    const goongseo = { fontWeight: 'bold', fontFamily: ['궁서', '궁서체'] };

    const [championsList, setChampionsList] = useState([]);
    const [filteredChampionsList, setFilteredChampionsList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [myPick, setMyPick] = useState('none');
    const [enemyPick, setEnemyPick] = useState('none');
    const [myImgUrl, setMyImgUrl] = useState('');
    const [enemyImgUrl, setEnemyImgUrl] = useState('');

    // const [myPickEn, setMyPickEn] = useState('');
    // const [enemyPickEn, setEnemyPickEn] = useState('');

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
            return '서포-터';
        }
    }

    useEffect(() => {
        axios
            .get('http://127.0.0.1:3001/champions/all')
            .then((res) => {
                let list = res.data.list;
                list.sort(function (a, b) {
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                });
                setChampionsList([...list.slice()]);
                console.log(championsList);
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
                    if (item.name.startsWith(searchText)) {
                        temp.push(item);
                    }
                });
                return temp.slice();
            });
        } else {
            setFilteredChampionsList(championsList.slice());
        }
    }, [searchText, championsList]);

    const getMyPickFromImageList = useCallback((champ) => {
        setMyPick(champ);
        setSearchText('');
    });

    const getEnemyPickFromImageList = useCallback((champ) => {
        setEnemyPick(champ);
        setSearchText('');
    }, []);

    useEffect(() => {
        if (myPick !== 'none') {
            const temp =
                championsList[championsList.findIndex((i) => i.name === myPick)]
                    .id;
            console.log(temp);
            setMyImgUrl(
                `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${temp}_0.jpg`
            );
        }
    }, [myPick]);

    useEffect(() => {
        if (enemyPick !== 'none') {
            console.log('저 실행 시작합니다~!');
            const temp =
                championsList[
                    championsList.findIndex((i) => i.name === enemyPick)
                ].id;
            console.log(temp);
            setEnemyImgUrl(
                `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${temp}_0.jpg`
            );
        }
    }, [enemyPick]);

    const getSearchTextFromSearchBar = useCallback((text) => {
        setSearchText(text);
    }, []);

    const onClickMyPickCancelBtn = () => {
        setMyPick('none');
    };

    const onClickEnemyPickCancelBtn = () => {
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
        <div id="wrapper">
            <div align="center">
                <h1 style={{ ...goongseo, marginBottom: '2rem' }}>
                    {laneSelector(location.state)} 포지션을 선택하셨소. <br />
                </h1>
            </div>
            <div
                id="championSelection"
                align="center"
                style={{ display: 'flex' }}
            >
                <div style={{ flex: 1 }}>
                    {myPick === 'none' && (
                        <div style={{ fontSize: '1rem' }}>
                            <h2>플레이 할 챔피언을 선택해주시오</h2>
                            <SearchBar
                                label="챔피언명을 입력해주세요"
                                getSearchTextFromSearchBar={
                                    getSearchTextFromSearchBar
                                }
                            />
                            <ImageListHjlee
                                filteredChampionsList={filteredChampionsList}
                                getPickFromImageList={getMyPickFromImageList}
                            />
                        </div>
                    )}

                    {myPick !== 'none' && (
                        <div>
                            <h1>내가 플레이할 챔피언</h1>
                            <div style={{ marginTop: '15%' }}>
                                <img
                                    style={{ width: '588px' }}
                                    src={myImgUrl}
                                    alt="waiting"
                                ></img>
                                <div>
                                    <h1>{myPick}</h1>
                                    <IconButton
                                        onClick={onClickMyPickCancelBtn}
                                    >
                                        <div style={{ display: 'flex' }}>
                                            <CancelIcon
                                                sx={{ color: 'black' }}
                                            ></CancelIcon>
                                            <span
                                                style={{
                                                    fontSize: '1rem',
                                                    color: 'black',
                                                }}
                                            >
                                                다시 선택하기
                                            </span>
                                        </div>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div
                    style={{
                        flex: 0.2,
                        marginTop: '15%',
                    }}
                >
                    <img
                        style={{
                            width: '100%',
                        }}
                        src="/images/icons/vs_icon.png"
                        alt="waiting"
                    ></img>
                    {enemyPick !== 'none' && myPick !== 'none' && (
                        <IconButton onClick={moveToDetail}>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                }}
                            >
                                <CheckIcon
                                    fontSize="large"
                                    sx={{ color: 'red' }}
                                ></CheckIcon>
                                <span
                                    style={{ fontSize: '2rem', color: 'red' }}
                                >
                                    {' '}
                                    확정!
                                </span>
                            </div>
                        </IconButton>
                    )}
                </div>

                <div align="center" style={{ flex: 1 }}>
                    {enemyPick === 'none' && (
                        <div style={{ fontSize: '1rem' }}>
                            <h2>상대방 챔피언을 선택해주시오</h2>
                            <SearchBar
                                label="챔피언명을 입력해주세요"
                                getSearchTextFromSearchBar={
                                    getSearchTextFromSearchBar
                                }
                            />
                            <ImageListHjlee
                                filteredChampionsList={filteredChampionsList}
                                getPickFromImageList={getEnemyPickFromImageList}
                            />
                        </div>
                    )}

                    {enemyPick !== 'none' && (
                        <div>
                            <h1>상대가 플레이할 챔피언</h1>
                            <div align="center" style={{ marginTop: '15%' }}>
                                <img
                                    style={{ width: '588px' }}
                                    src={enemyImgUrl}
                                    alt="waiting"
                                ></img>
                                <div>
                                    <h1>{enemyPick}</h1>
                                    <IconButton
                                        onClick={onClickEnemyPickCancelBtn}
                                    >
                                        <div style={{ display: 'flex' }}>
                                            <CancelIcon
                                                sx={{ color: 'black' }}
                                            ></CancelIcon>
                                            <span
                                                style={{
                                                    fontSize: '1rem',
                                                    color: 'black',
                                                }}
                                            >
                                                다시 선택하기
                                            </span>
                                        </div>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <br />
            </div>
        </div>
    );
}

export default Pick;
