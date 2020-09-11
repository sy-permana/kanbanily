import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://localhost:3000'
});
  
instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    return Promise.resolve({ error });
  });

export default instance;