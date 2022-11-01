/** 就是这个 home 模块所需要的请求 */

import request from '@/request';

// 获取列表
export const getList = (params = {}) => {
  return  request.get('/home/list', {
    params
  })
}