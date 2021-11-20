import { React, useState, useCallback, useEffect } from 'react';
import { Link as Scroll } from 'react-scroll';
import TitlebarImageList from '../components/image_list';
import ImageListAll from '../components/image_list_all';
import SearchBar from '../components/SearchBar';
import itemDataAll from '../data/itemDataAll';

function FirstPick({ history, match, location }) {
  const lane = location.state;
  const goongseo = { fontWeight: 'bold', fontFamily: ['궁서', '궁서체'] };

  const [championsList] = useState(itemDataAll);
  const [filteredChampionsList, setFilteredChampionsList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [myPick, setMyPick] = useState('____');
  const [enemyPick, setEnemyPick] = useState('____');

  useEffect(() => {
    // console.log("search text has changed!");
    championsList.sort(function (a, b) {
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    });
    if (searchText !== '') {
      setFilteredChampionsList((prevState) => {
        let temp = [];
        championsList.forEach((item) => {
          if (item.title.startsWith(searchText)) {
            temp.push(item);
          }
        });
        return temp.slice();
      });
    } else {
      setFilteredChampionsList(championsList.slice());
    }
  }, [searchText, championsList]);

  const getSearchTextFromSearchBar = useCallback((text) => {
    setSearchText(text);
  }, []);

  const getMyPickFromImageList = useCallback((champ) => {
    setMyPick(champ);
    setSearchText('');
  }, []);

  const getEnemyPickFromImageList = useCallback((champ) => {
    setEnemyPick(champ);
    setSearchText('');
  }, []);

  const moveToDetail = () => {
    history.push({
      pathname: `${match.url}/detail`,
      state: {
        lane : lane,
        myPick: myPick,
        enemyPick: enemyPick,
      },
    });
  };

  return (
    <div align="center">
      <h1 style={goongseo}>
        선픽이시군요! <br />
        요즘 {lane}포지션에서 승률 좋은 챔피언을 추천드릴게요!
      </h1>

      <div style={{ ...goongseo, fontSize: '22px', marginTop: '50px' }}>
        플레이 하고 싶은 챔피언을 클릭해주세요!
      </div>

      <div style={{ marginTop: '20px' }}>
        <TitlebarImageList getMyPickFromImageList={getMyPickFromImageList} />

        <div
          style={{
            ...goongseo,
            marginLeft: '20px',
            marginTop: '50px',
            fontSize: '25px',
          }}
          align="center"
        >
          {myPick}, 훌륭한 선택의 표본입니다.
        </div>
      </div>

      <div style={{ ...goongseo, fontSize: '20px', marginTop: '70px' }}>
        선택을 완료 하셨다면 -{'>'}
        <Scroll
          to="enemyPick"
          style={{
            marginLeft: '30px',
            color: '#000000',
            fontSize: '17px',
            background: '#efefef',
          }}
          smooth={true}
          duration={600}
        >
          여기를 클릭해주세요
        </Scroll>
      </div>

      <div
        style={{
          ...goongseo,
          fontSize: '20px',
          marginTop: '50px',
          marginBottom: '800px',
        }}
      >
        다른 챔피언을 선택하시려면 -{'>'}
        <Scroll
          to="altPick"
          style={{
            marginLeft: '30px',
            color: '#000000',
            fontSize: '17px',
            background: '#efefef',
          }}
          smooth={true}
          duration={400}
        >
          여기를 클릭해주세요
        </Scroll>
      </div>

      <div id="altPick">
        <p style={{ ...goongseo, fontSize: '22px', marginTop: '100px' }}>
          플레이 하고 싶은 챔피언을 클릭해주세요!
        </p>

        <SearchBar
          label="이곳에서 검색하세요!"
          getSearchTextFromSearchBar={getSearchTextFromSearchBar}
        />
        <ImageListAll
          filteredChampionsList={filteredChampionsList}
          getPickFromImageList={getMyPickFromImageList}
        />

        <div
          style={{
            ...goongseo,
            marginLeft: '20px',
            marginTop: '100px',
            fontSize: '25px',
            marginBottom: '20px',
          }}
          align="center"
        >
          {myPick}, 역시 괜찮은 픽이죠! <br />
        </div>

        <div
          style={{
            ...goongseo,
            fontSize: '20px',
            marginTop: '20px',
            marginBottom: '500px',
          }}
        >
          플레이 하실 챔피언이 {myPick}, 맞으시다면 -{'>'}
          <Scroll
            to="enemyPick"
            style={{
              marginLeft: '30px',
              color: '#000000',
              fontSize: '17px',
              background: '#efefef',
            }}
            smooth={true}
            duration={400}
          >
            여기를 클릭해주세요
          </Scroll>
        </div>
      </div>

      <div id="enemyPick">
        <p style={{ ...goongseo, fontSize: '22px', marginTop: '50px' }}>
          상대방 픽을 알려주시면 상성을 분석해드릴게요!
        </p>

        <SearchBar
          label="이곳에서 검색하세요!"
          getSearchTextFromSearchBar={getSearchTextFromSearchBar}
        />
        <ImageListAll
          filteredChampionsList={filteredChampionsList}
          getPickFromImageList={getEnemyPickFromImageList}
        />

        <div
          style={{
            ...goongseo,
            marginLeft: '20px',
            marginTop: '50px',
            fontSize: '25px',
            marginBottom: '100px',
          }}
          align="center"
        >
          상대의 픽은 {enemyPick}! 아래의 선택 완료 버튼을 눌러주시면 분석을
          시작하겠습니다!
        </div>

        <p style={{ ...goongseo, fontSize: '20px' }}>
          당신의 픽 : {myPick} <br style={{ marginRight: '70px' }} />
          상대의 픽 : {enemyPick}{' '}
          <button
            onClick={moveToDetail}
            style={{ fontSize: '20px', position: 'absolute', left: '1000px' }}
          >
            선택 완료!
          </button>
        </p>
      </div>
    </div>
  );
}

export default FirstPick;
