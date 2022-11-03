import { Table, Form, Input, Button, Space, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { getList, save } from './services';
import { tableColumns } from './schema/table';
import { formItems } from './schema/form';
import './index.less';

export default () => {
  const [dataSource, setDateSource]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
  const [form] = Form.useForm(); // step1 声明
  const [form2] = Form.useForm();
  const [open, setOpen] = useState(false); // 展开修改页
  // query 接受查询的参数
  const query = async (params = {}) => {
    setLoading(true);
    const {
      data: { code, data },
    }: any = await getList(params);
    setLoading(false);
    if (code === 200) {
      setDateSource(data.data);
    }
  };
  // 添加表单
  const addForm = () => {
    // 弹出一个框让用户录入数据
    setOpen(true);
  };
  // 提交表单
  const onSubmit = async () => {
    // validateFields 这个 api 就是校验表单并获取表单的值、他是异步的
    const values = await form2.validateFields(); // 如果不通过就会阻塞后面代码的执行
    const res = await save(values); // 调用接口送数据
    if (res.data.code === 200) {
      message.success('保存成功');
      // 自动帮用户刷新列表
      query();
      setOpen(false);
    } else {
      message.error(res.data.msg);
    }
  };
  useEffect(() => {
    // 页面一加载我们开始设置数据、调用 api 发起请求获取数据
    query();
  }, []);

  return (
    <div className="pages-home">
      <div className="pages-home-search">
        {/* 挂载 */}
        <Form layout="inline" form={form}>
          <Form.Item label="姓名" name="name">
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="地址" name="address">
            <Input placeholder="请输入地址" />
          </Form.Item>
        </Form>
        <Space>
          <Button
            onClick={() => {
              form.setFieldsValue({
                name: undefined,
                address: undefined,
              });
            }}
          >
            重制
          </Button>
          <Button
            type="primary"
            onClick={() => {
              query(form.getFieldsValue());
            }}
          >
            查询
          </Button>
        </Space>
      </div>
      <div className="pages-home-table">
        <div className="pages-home-table-tools">
          <div>主页列表</div>
          <div>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  addForm();
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
        <Table
          dataSource={dataSource}
          loading={loading}
          columns={tableColumns({
            query,
            form2,
            setOpen,
          })}
        />
      </div>
      {/* 用户添加的表单 */}
      <Modal
        open={open}
        title="添加用户"
        onCancel={() => {
          setOpen(false);
        }}
        onOk={onSubmit}
      >
        <Form form={form2}>
          {formItems.map((item) => {
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
