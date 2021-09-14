import {React, useState, useCallback, useEffect} from 'react';
import ImageListHjlee from '../components/ImageListHjlee';
import SearchBar from '../components/SearchBar';
import itemDataAll from '../data/itemDataAll';

function LastPick() {
    const goongseo = {fontWeight:"bold", fontFamily:["궁서","궁서체"]}
    const [championsList, setChampionsList] = useState(itemDataAll);
    const [filteredChampionsList, setFilteredChampionsList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [myPick, setMyPick] = useState('none');
    const [enemyPick, setEnemyPick] = useState('none');

    useEffect(() => {
        console.log("search text has changed!");
        championsList.sort(function(a, b) {
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        });
        if(searchText !== '') {
            setFilteredChampionsList((prevState) => {
                let temp = [];
                championsList.map((item) => {
                    if(item.title.includes(searchText)) {
                        temp.push(item);
                    }
                })
                return temp.slice();
            })
        } else {
            setFilteredChampionsList(championsList.slice());
        }
    }, [searchText])

    const getMyPickFromImageList = useCallback((champ) => {
        setMyPick(champ);
        setSearchText('');
    }, [])

    const getEnemyPickFromImageList = useCallback((champ) => {
        setEnemyPick(champ);
        setSearchText('');
    }, [])

    const getSearchTextFromSearchBar = useCallback((text) => {
        setSearchText(text);
    }, [])

    return (
        <div align="center">
            <h1 style={{...goongseo}} >
                후픽이시군요! <br />
                챔피언을 골라주세요!
            </h1>
            {(myPick === 'none') && 
            (
                <div>
                    <SearchBar getSearchTextFromSearchBar={getSearchTextFromSearchBar}/>
                    <ImageListHjlee filteredChampionsList={filteredChampionsList} getPickFromImageList={getMyPickFromImageList}/>
                </div>
            )}
            <br/>
            <div>나으 픽 : {myPick}</div>
            <br/>
            {(myPick !== 'none') && (enemyPick === 'none') &&
            (
                <div>
                    <SearchBar getSearchTextFromSearchBar={getSearchTextFromSearchBar}/>
                    <ImageListHjlee filteredChampionsList={filteredChampionsList} getPickFromImageList={getEnemyPickFromImageList}/>
                </div>
            )}
            <br/>
            <div>상대 픽 : {enemyPick}</div>
        </div>
    )
}

export default LastPick
