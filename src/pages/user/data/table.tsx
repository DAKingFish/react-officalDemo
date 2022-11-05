// 箭头函数可以直接返回唯一对象()
// 本组件主要作用是给Table
// antd中的Table属性columns 嵌套是组件Column
// Column 里面有各自属性,本页面存就是各自属性值

import { render } from 'react-dom';

/*
/user/list
/user/save
/user/remove
 id: 1,
  userName: 'jinyuan',
  userAge: 20,
  userLiked: '1,2', // 1: 游泳、2:游戏、3: 学习
  userPhone: 13717898203
 */
export const table = () => [
  { title: 'ID', dataIndex: 'id' },
  { title: '用户名', dataIndex: 'userName' },
  { title: '年龄', dataIndex: 'userAge' },
  { title: '爱好', dataIndex: 'userLiked' },
  { title: '用户手机号', dataIndex: 'userPhone' },
  {
    title: '操作',
    dataIndex: 'action',
    // render(value, record) {
    //   render()
    //   // 每一行都有 这一行所以数据record
    //   }
  },
];
