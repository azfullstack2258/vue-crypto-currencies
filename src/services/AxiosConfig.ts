import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  return {
    ...config,
    // override headers for any custom header options
  };
});

export default axiosInstance;
