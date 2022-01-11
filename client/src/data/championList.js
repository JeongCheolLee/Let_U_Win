import axios from 'axios';
import BackendURL from '../shared/BackendURL';

const getChampionsList = () => {
    return axios.get(`${BackendURL}/champions/all`).then((res) => {
        return res.data.list;
    });
};

export default getChampionsList;
