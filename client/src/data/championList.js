import axios from 'axios';

const getChampionsList = () => {
    return axios.get('http://172.18.0.2:3001/champions/all').then((res) => {
        return res.data.list;
    });
};

export default getChampionsList;
