/** 统一封装所有的接口请求 */
import axios from 'axios';

// 创建 axios 实例

const axiosInstance = axios.create({
  withCredentials: true, // 自动携带 cookie
  headers: {
    appkey: 'TttxBH3CxRumOqHyJV34WbUt00B3CZKwP',
    appId: 7,
  },
});

// 拦截器 TODO

export default axiosInstance;
