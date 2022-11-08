import { Table, Form, Input, Button, Space, Modal, message, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { getList, save } from './services';
import { tableColumns } from './schema/table';
import { formItems } from './schema/form';
import './index.less';

export default () => {
  const [dataSource, setDataSource]: any = useState([]); // 将从后端获取数据存储dataSource方便存储
  const [pagination, setPagination] = useState({
    total: 0, // 查询总数
    pageNum: 1, // 当前页码
    pageSize: 2, // 总页码
  }); // 抽取成翻页对象,
  const [loading, setLoading]: any = useState(false); // table页面的加载
  const [form] = Form.useForm(); // step1 声明
  const [form2] = Form.useForm(); // 每个Form表单都有自己的form
  const [open, setOpen] = useState(false); // 是否展开添加页面的状态
  // query 接受查询的参数 parms={} 空对象? 这种写法到底是固定搭配
  const query = async (params = {}) => {
    setLoading(true);
    // 请求的参数 payload 中一个用法 相同属性,后面属性值会替换前面的属性值
    const payload = {
      ...pagination,
      ...params,
    };
    const {
      data: { code, data }, // 解构,多层解构,的对象解构
    }: any = await getList(payload); // 看样子,根据传的参获取数据,获取数据的逻辑判断是
    setLoading(false);
    if (code === 200) {
      console.log('home页面', data);
      pagination.total = data.count;
      pagination.pageNum = payload.pageNum;
      setDataSource(data.data); // 设置当前展示的数据
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
    console.log(pagination);
    // 页面一加载我们开始设置数据、调用 api 发起请求获取数据
    query();
  }, [pagination]); // 配置依赖项,只有当这个 pagination 对象发生改变（引用地址变化）才会，而pagination的属性发生变化不会触发
  // pagination 通过useState setPagination 就会触发useEffect,重新渲染页面

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
                  // 重置
                  form2.resetFields();
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
          pagination={false} // 注销自带分页组件
          loading={loading}
          scroll={{
            y: 600,
          }}
          columns={tableColumns({
            query,
            form2,
            setOpen,
          })}
        />
        <Pagination
          current={pagination.pageNum}
          total={pagination.total}
          pageSize={pagination.pageSize}
          showSizeChanger
          pageSizeOptions={[2, 3, 6]}
          showQuickJumper // 页码的快速跳转
          onChange={(pageNum, pageSize) => {
            setPagination({
              total: pagination.total,
              pageNum,
              pageSize,
            });
          }}
          showTotal={() => {
            return `总计 ${pagination.total} 条数据`;
          }}
        />
      </div>
      {/* 用户添加的表单 */}
      <Modal
        open={open}
        title="添加用户"
        onCancel={() => {
          setOpen(false); // 会自动清空输入框
        }}
        onOk={onSubmit} // 自带的属性方法
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
