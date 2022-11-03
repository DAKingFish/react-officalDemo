/** 统一封装所有的接口请求 */
import axios from 'axios';

// 创建 axios 实例

const axiosInstance = axios.create({
  baseURL: 'http://121.4.49.147:8361',
  headers: {
    appkey: 'TttxBH3CxRumOqHyJV34WbUt00B3CZKwP',
  },
});

// 拦截器 TODO

export default axiosInstance;
