import axios from 'axios';
//https://viacep.com.br/ws/69060101/json/
const api = axios.create({
    //baseURL: "https://viacep.com.br/ws/"
    baseURL: "https://opencep.com/v1/"
});

export default api