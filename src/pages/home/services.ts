/** 就是这个 home 模块所需要的请求 */

import request from '@/request';

// 获取列表
export const getList = (params = {}) => {
  // axios 约定了，get请求的参数需要放到 params 对象里面，但是 post 请求不需要，直接做为第二个参数传入即可
  // 服务器端进行数据的判断的
  return request.post('/online/home/list', params);
};

// 添加数据
export const save = (params = {}) => {
  return request.post('/online/home/save', params);
};

// 删除数据
export const remove = (id) => {
  return request.post('/online/home/remove', {
    id,
  });
};
