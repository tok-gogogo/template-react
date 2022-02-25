import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'antd';

// 自定义请求
export const axiosInstance = axios.create({
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    message.error('请求错误');
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response);
  },
);

const request = <R = unknown>(url: string | AxiosRequestConfig, config: AxiosRequestConfig) => {
  if (typeof url === 'string') {
    return axiosInstance(url, config) as unknown as Promise<API.IGlobalResponse<R>>;
  }
  return axiosInstance(url) as unknown as Promise<API.IGlobalResponse<R>>;
};

request.post = function <R = unknown, T = API.IGlobalResponse<R>>(
  url: string,
  data?: Record<string, any>,
  config?: AxiosRequestConfig,
) {
  return axiosInstance.post<unknown, T>(url, data, config);
};

request.get = function <R = unknown, T = API.IGlobalResponse<R>>(
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig,
) {
  return axiosInstance.get<unknown, T>(url, { params, ...config });
};

export default request;
