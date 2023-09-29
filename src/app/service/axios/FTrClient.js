import axios from 'axios';

const FTrClient = axios.create({
    baseURL: 'https://finance-tracker-back.vercel.app',
    timeout: 1000
});


export default FTrClient;