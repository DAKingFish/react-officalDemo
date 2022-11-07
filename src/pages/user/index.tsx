import { Form, Table, Input, Space, Button, message, Modal } from 'antd';
import { table } from './data/table';
import { useEffect, useState } from 'react';
import './index.less';
import { getList, save } from './services';
import { add } from './data/add';
export default () => {
  // 存放渲染数据源 useState 将是后台查询setDataSource
  const [dataSource, setDataSource]: any = useState([]);
  // 个人分析,在useEffect中作为监听的对象,因为后面有页面翻页大小的需求
  // monkey将本来所有的监听单个值作为属性 抽取到一个对象中
  const [pagination, setPagination] = useState({});
  // table的loading状态loading
  const [loading, setLoading] = useState(false);
  // 添加用户的弹窗状态,默认是关的
  const [open, setOpen] = useState(false);
  // 解构出来第一个就是from
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  // 创建query查询,创建请求
  const query = async (parms = {}) => {
    setLoading(true);
    const {
      data: { code, data },
    }: any = await getList((parms = {}));
    console.log(data);
    setLoading(false);
    if (code === 200) {
      setDataSource(data.data);
    }
  };
  /*  const onSubmit = async (parms) => {
    const {
      data: { code, data },
    }: any = await save(parms);
    if (code === 200) {
      message.success('添加成功');
    } else {
      message.error(data.msg);
    }
  }; */
  const onSubmit = async () => {
    // 用useForm钩子将Modal数据
    const value = await form2.validateFields();
    const res = await save(value);
    if (res.data.code === 200) {
      message.success('添加用户成功');
      query();
      setOpen(false);
      form2.setFieldsValue({
        userName: undefined,
        userAge: undefined,
        userLiked: undefined,
        userPhone: undefined,
      });
    } else {
      message.error(res.data.msg || '服务器炸了');
      setOpen(false);
    }
  };
  useEffect(() => {
    query();
  }, []);
  return (
    <div className="user">
      <div className="nav">
        <div className="left">
          {/* 添加 */}
          <Form layout="inline" form={form} className="nav-form">
            <Form.Item label="姓名" name="username">
              <Input placeholder="请输入用户的姓名" />
            </Form.Item>
            <br />
            <Form.Item label="年龄" name="userage">
              <Input placeholder="请输入用户的年龄" />
            </Form.Item>
          </Form>
        </div>
        <div className="right">
          <Space>
            <Button
              type="primary"
              onClick={() => {
                form.setFieldsValue({
                  username: undefined,
                  userage: undefined,
                });
              }}
            >
              重置
            </Button>
            <Button
              onClick={() => {
                // console.log('测试查询button');
                query(form.getFieldsValue());
              }}
            >
              查询
            </Button>
          </Space>
        </div>
      </div>
      <div className="context">
        <div className="context-nav">
          <div>用户列表</div>
          <div>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  // 弹窗添加,这里可以用setOPen,具体操作在modal组件中
                  setOpen(true);
                }}
              >
                添加
              </Button>
              <Button
                onClick={() => {
                  query();
                }}
              >
                刷新
              </Button>
            </Space>
          </div>
        </div>
        <Table dataSource={dataSource} columns={table({ query, form2, setOpen })} loading={loading} />
      </div>
      <Modal
        open={open}
        title="添加用户"
        onCancel={() => {
          setOpen(false); // 会自动清空输入框,(ps有时可以,有时又不行)
        }}
        onOk={onSubmit}
      >
        <Form form={form2}>
          {add.map((item) => {
            return (
              <Form.Item {...item}>
                <Input />
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </div>
  );
};
