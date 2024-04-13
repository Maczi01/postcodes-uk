import axios from 'axios';

const URL = 'https://api.postcodes.io/';

export const api = axios.create({
    baseURL: URL,
});