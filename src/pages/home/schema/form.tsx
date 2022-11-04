// 本页面同arr.map映射到Form.Item上
// id是自增的,不需要添加的时间修改
export const formItems = [
  {
    name: 'id',
    hidden: true,
  },
  {
    name: 'name',
    label: '姓名',
    rules: [
      {
        required: true,
        message: '姓名不能为空',
      },
    ],
  },
  {
    name: 'age',
    label: '年龄',
  },
  {
    name: 'address',
    label: '地址',
  },
  {
    name: 'tags',
    label: '标签',
  },
];
