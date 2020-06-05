import axios from 'axios';

const thingsboardInstance = axios.create({
    baseURL: 'https://data.talkpool.io/api',
});

thingsboardInstance.interceptors.request.use(config=>{
    const token = sessionStorage.getItem('ThingsBoardAccessToken');
    if(token){
        config.headers['X-Authorization'] = `Bearer ${token}`;
    }
    return config;
} ,error => Promise.reject(error))

export {thingsboardInstance}