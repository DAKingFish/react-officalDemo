import { Button, message, Modal, Space } from "antd"
import { remove } from "../services";

// 存放数据模型
export const tableColumns = ({
  query,
  form2,
  setOpen
}) => [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
  {
    title: '标签',
    dataIndex: 'tags',
  },
  {
    title: '操作',
    dataIndex: 'action',
    render(value, record) {
      return <Space>
        <Button type='primary' onClick={() => {
          // 打开弹窗
          setOpen(true);
          // 设置默认值
          form2.setFieldsValue(record)
        }}>编辑</Button>
        <Button onClick={() => {
          Modal.confirm({
            title: '提示',
            content: '是否确认删除?',
            okText: '确认',
            cancelText: '取消',
            async onOk() {
              const { data: { code, msg } } = await remove(record.id);
              if (code === 200) {
                message.success('删除成功');
                // 刷新列表
                query();
              } else {
                message.error(msg);
              }
            },
            onCancel() {
              console.log('已取消')
            }
          });
        }}>删除</Button>
      </Space>
    }
  },
]