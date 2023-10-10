import axios from 'axios';

const FTrClient = axios.create({
    baseURL: 'http://localhost:3005',
    timeout: 80000
});

export default FTrClient;