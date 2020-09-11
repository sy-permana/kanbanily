import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://kanbanily.herokuapp.com'
});
  
instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    return Promise.resolve({ error });
  });

export default instance;