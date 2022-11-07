// 箭头函数可以直接返回唯一对象()
// 本组件主要作用是给Table
// antd中的Table属性columns 嵌套是组件Column
// Column 里面有各自属性,本页面存就是各自属性值

import { Button, message, Modal, Space } from 'antd';
import { remove } from '../services';
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
export const table = ({ query, form2, setOpen }) => [
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
    //   // 每一行都有 这一行所有的数据 record
    //   }
    render(value, record) {
      return (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              // 打开弹窗
              setOpen(true);
              // 设置默认值
              form2.setFieldsValue(record);
            }}
          >
            编辑
          </Button>
          <Button
            onClick={() => {
              Modal.confirm({
                title: '提示',
                content: '是否确认删除?',
                okText: '确认',
                cancelText: '取消',
                async onOk() {
                  const {
                    data: { code, msg },
                  } = await remove(record.id);
                  if (code === 200) {
                    message.success('删除成功');
                    // 回到第一页 会覆盖pagition中相同属性名的值
                    query();
                  } else {
                    message.error(msg || '接口错误');
                  }
                },
                onCancel() {
                  console.log('已取消');
                },
              });
            }}
          >
            删除
          </Button>
        </Space>
      );
    },
  },
];
