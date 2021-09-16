import {React, useState, useCallback, useEffect} from 'react';
import {Link as Scroll} from 'react-scroll'
import TitlebarImageList from '../components/image_list'
import ImageListAll from '../components/image_list_all'
import SearchBar from '../components/SearchBar';
import itemDataAll from '../data/itemDataAll';



function FirstPick({ location }) {
    const lane = location.state;
    const goongseo = {fontWeight:"bold", fontFamily:["궁서","궁서체"]}

    const [championsList, setChampionsList] = useState(itemDataAll)
    const [filteredChampionsList, setFilteredChampionsList] = useState([])
    const [searchText, setSearchText] = useState('')

    const [myPick, setMyPick] = useState('____');
    const [altPick, setAltPick] = useState('____');


    useEffect(() => {
        // console.log("search text has changed!");
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

    const getSearchTextFromSearchBar = useCallback((text) => {
        setSearchText(text);
    }, [])

    const getMyPickFromImageList = useCallback((champ) => {
        setMyPick(champ);
        
    }, [])

    const getAltPickFromImageList = useCallback((champ) => {
        setAltPick(champ);
        setSearchText('');
    }, [])



    return (
        <div align = "center">
            <h1 style={goongseo} >
                선픽이시군요! <br />
                요즘 {lane}포지션에서 승률 좋은 챔피언을 추천드릴게요!
            </h1>

            <div style = {{...goongseo, fontSize:'22px', marginTop: '50px'}}>
                플레이 하고 싶은 챔피언을 클릭해주세요!
            </div>

            <div style = {{marginTop: '20px'}}>
                <TitlebarImageList getMyPickFromImageList={getMyPickFromImageList}/>

                <div style = {{...goongseo, marginLeft: '20px', marginTop: '50px', fontSize: '25px'}} align = "center">
                    {myPick}, 훌륭한 선택의 표본입니다. <button style = {{fontSize: '15px',marginLeft: '70px'}}> 선택 완료 </button>
                </div>

            </div>

            <div style = {{...goongseo, fontSize:'22px', marginTop: '50px'}}> 
                이곳에 플레이 하고 싶은 챔피언이 없으신가요?

              <Scroll to="altPick" style = {{marginLeft: '50px', color: '#000000' }} smooth={true}>네</Scroll>
            </div>

            <div id = "altPick" style = {{marginTop: '200px'}}>
                <p style = {{...goongseo, fontSize:'22px', marginTop: '50px'}}> 
                    플레이 하고 싶은 챔피언을 클릭해주세요!
                </p>

                <SearchBar label="나의 픽" getSearchTextFromSearchBar={getSearchTextFromSearchBar}/>
                <ImageListAll filteredChampionsList={filteredChampionsList} getAltPickFromImageList={getAltPickFromImageList}/>

                <div style = {{...goongseo, marginLeft: '20px', marginTop: '50px', fontSize: '25px'}} align = "center">
                    {altPick}, 역시 괜찮은 픽이죠! 
                </div>
            </div>

        </div>
    )
}

export default FirstPick
