const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/api/proxy', async (request, response) => {
    try {
         const { query: { url } } = request;
        const result = await axios.get(url);
        return response.status(200).jsonp({
            result
        });
    } catch (error) {
        return response.status(500).jsonp({
            error
        })
    }
});

router.post('/api/proxy', async (request, response) => {
    try {
         const { body,
            query: { url } } = request;
        const requestHeaders = {
            'Content-Type': 'application/json'
        }
        if (request.headers['x-auth-token']) requestHeaders['X-AUTH-TOKEN'] = `${request.headers['x-auth-token']}`
        if (request.headers['cookie']) requestHeaders['Cookie'] = `${request.headers['cookie']}`
        const { data: result, headers: responseHeaders} = await axios.post(url, body, {headers: requestHeaders});
        if (responseHeaders['set-cookie'])  response.setHeader('set-cookie', responseHeaders['set-cookie'])   
        return response.status(200).jsonp({ result });
    } catch (error) {
        return response.status(500).jsonp({
            error: error.response.data
        })
    }
});

router.put('/api/proxy/:url', async (request, response) => {
    try {
         const { body,
            query: { url } } = request;
        const result = await axios.post(url, body);
        return response.status(200).jsonp({
            result
        });
    } catch (error) {
        return response.status(500).jsonp({
            error
        })
    }
});

router.delete('/api/proxy/', async (request, response) => {
     try {
         const { query: { url } } = request;
        const result = await axios.post(url);
        return response.status(200).jsonp({
            result
        });
    } catch (error) {
        return response.status(500).jsonp({
            error
        })
    }
});

router.patch('/api/proxy/:url', async (request, response) => {
     try {
         const { body,
            query: { url } } = request;
        const result = await axios.post(url, body);
        return response.status(200).jsonp({
            result
        });
    } catch (error) {
        return response.status(500).jsonp({
            error
        })
    }
});

module.exports = router;