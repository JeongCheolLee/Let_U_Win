import axios from 'axios';

const getChampionsList = () => {
    return axios.get('http://127.0.0.1:3001/champions/all').then((res) => {
        return res.data.list;
    });
};

export default getChampionsList;
