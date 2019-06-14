import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css'

import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.interceptors.request.use(config=>{
    const token = localStorage.getItem("Token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
} ,error => Promise.reject(error))

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
