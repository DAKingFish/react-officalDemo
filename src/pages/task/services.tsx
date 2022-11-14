//1.获取请求对象,
import request from '@/request'

//2.创建具体操作路径

export const getList = (parms = {}) => {
  //2.1获取任务列表
  request.post('online /jytask/list', parms)
}

export const save = (parms = {}) => {
  //2.2 保存任务列表
  request.post('online/jytask/add', parms)
}

export const update = (parms = {}) => {
  //2.3 更新任务列表的状态
  request.post('online/jytask/update', parms)
}

export const remove = (id) => {
  //2.4 删除任务列表中某一项
  request.post('online/jytask/delete', id)
}