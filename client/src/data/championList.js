import axios from 'axios';

const getChampionsList = () => {
  return axios.get('http://localhost:3001/champions/all').then((res) => {
    return res.data.list;
  });
};

export default getChampionsList;
