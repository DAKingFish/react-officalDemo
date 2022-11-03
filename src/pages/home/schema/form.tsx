export const formItems =  [{
  name: 'id',
  hidden: true,
}, {
  name: 'name',
  label: '姓名',
  rules: [{
    required: true,
    message: '姓名不能为空'
  }]
}, {
  name: 'age',
  label: '年龄',
}, {
  name: 'address',
  label: '地址',
}, {
  name: 'tags',
  label: '标签',
}]