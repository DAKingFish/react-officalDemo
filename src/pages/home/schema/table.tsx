import { Button, message, Modal, Space } from 'antd';
import { remove } from '../services';

// 存放数据模型
// dataIndex是列数据的索引 感觉就是id列到id数据,如果title是姓名,但是dataIndex是id估计数据是id,和title没有关系
export const tableColumns = ({ query, form2, setOpen }) => [
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
    // 有点想不明白,渲染后每个数据都会有,column属性时每一列,从上到下,title在一列只会出现一次,还是在第一行
    // render生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引 但是每个{}代表是一列,
    // dataIndex代表数据只能出现在dataIndex这一列
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
                    // 回到第一页
                    query({
                      pageNum: 1,
                    });
                  } else {
                    message.error(msg);
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
