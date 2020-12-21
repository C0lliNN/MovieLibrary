import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});


api.interceptors.request.use(config => {
  // eslint-disable-next-line no-param-reassign
  config.params.api_key = '466eefcef086aaa1375e8ecfebc6a345'
  return config;
});

export default api; 