import axios from 'axios';

const getChampionsList = () => {
    return axios.get('http://3.35.222.47:3001/champions/all').then((res) => {
        return res.data.list;
    });
};

export default getChampionsList;
