import axios from 'axios';

const BASE_URI = 'http://localhost:5000';

const client = axios.create({
    baseURL: BASE_URI,
    json: true
});

class APIClient {

    getTickers(symbol) {
        return this.perform('get', `/ticker_query/${symbol}`);
    }

    getTickersYahoo(symbol) {
        return this.perform('get', `/ticker_query_yahoo/${symbol}`);
    }

    getTickerHistoryYahoo(symbol) {
        return this.perform('get', `/ticker_history_yahoo/${symbol}`);
    }

    async perform (method, resource, data) {
        return client({
            method,
            url: resource,
            data,
            headers: {

            }
        }).then(resp => {
            return resp.data ? resp.data : [];
        }).catch(error => {
            console.log(error.response);
            return (error.response && error.response.data) ? error.response.data : [];
        });
    }
}

export default APIClient;