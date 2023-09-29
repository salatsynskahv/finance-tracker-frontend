import axios from 'axios';

const FTrClient = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:3001',
    timeout: 1000
});


export default FTrClient;