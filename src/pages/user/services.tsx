// 只能仿写,对数据库请求数据,导入axios创建对象
import request from '@/request';

// 创建三个请求路径
// 问题很大 有思路,但是不会请求的代码,好陌生
/* /user/list
/user/save
/user/remove */
export const getList = (params = {}) => {
  // post请求不需要{}
  return request.get('/user/list', { params });
};

export const save = (params = {}) => {
  return request.post('/user/save', params);
};

export const remove = (params = {}) => {
  return request.post('user/remove', params);
};
