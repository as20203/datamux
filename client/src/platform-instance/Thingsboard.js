import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://data.talkpool.io/api',
});

instance.interceptors.request.use(config=>{
    const token = sessionStorage.getItem('ThingsBoardAccessToken');
    if(token){
        config.headers['X-Authorization'] = `Bearer ${token}`;
    }
    return config;
} ,error => Promise.reject(error))

export default instance