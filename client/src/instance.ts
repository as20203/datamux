import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://datamux.talkpool.io/apiV1'
  // baseURL: 'http://localhost:8081/apiV1',
});

export default instance;
