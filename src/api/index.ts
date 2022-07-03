import { QueryClient } from 'react-query'
import axios, { AxiosRequestConfig } from 'axios'
import tokenStore from './tokenStore';

export const BASE_URL = 'https://api.thecatapi.com/v1/images/search'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      useErrorBoundary: true
    },
    mutations: {
      useErrorBoundary: true
    }
  }
})


const axiosClient = axios.create();


axiosClient.interceptors.request.use(
  (config) => {
      const token = tokenStore.getAccessToken();
      config.baseURL = BASE_URL
      if(!config.headers) config.headers =  {};
      if (token) {
          config.headers['Authorization'] =  `Bearer ${token}`
      }
      config.headers['Content-Type'] = 'application/json';
      config.headers['Accept'] = 'application/json';
      config.withCredentials = true;
      return config;
  },
  error => {
      Promise.reject(error)
  });



  axiosClient.interceptors.response.use(
  function (response) {
    return response;
  }, 
  async function (error) {
    const originalRequest = error.config;
    let res = error.response;
    if (res.status === 401 && originalRequest.url === 'auth api url') {
      window.location.href = "https://localhost:3000/login";
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry){
      originalRequest._retry = true;
      const refreshToken = await tokenStore.getRefreshToken();
      const { status, data } = await axios.post(
        `http://localhost:3000/refresh`, // token refresh api
        {
          refreshToken,
        }
      );
      if(status === 201){
        tokenStore.setToken(res.data);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenStore.getAccessToken();
        return axios(originalRequest);
      }
    }
    console.error("문제가 발생하였습니다.  Status Code: " + res.status);
    return Promise.reject(error);
  }
);

const makeRequest = <T>(config: AxiosRequestConfig) => axiosClient.request<any, T>(config);
export default makeRequest;

// api call example 
// const creds = { username: "user", password: "pass" };

// axios<User>({ method: "POST", url: "/api/v1/auth/login", data: creds })
//   .then((user) => { /* do whatever with user here */ })
//   .catch((err) => { /* handle errors */);

