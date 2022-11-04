// 添加用户数据的模板
// 现在写的本质是Form.item中数据模板
export const add = [
  { name: 'id', hidden: true },
  { name: 'userName', label: '姓名', rules: [{ required: true, message: '姓名不能为空' }] },
  { name: 'userAge', label: '年龄' },
  { name: 'userLiked', label: '爱好' },
  { name: 'userPhone', label: '手机号' },
];
