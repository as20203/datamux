import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://datamux.talkpool.io/apiV1',
});

export default instance