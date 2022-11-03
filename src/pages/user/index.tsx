import { Form, Table, Input, Space, Button } from 'antd';
import './index.less';
export default () => {
  const [from] = Form.useForm(); // 第一个就是from
  return (
    <div className="user">
      <div className="nav">
        <div className="left">
          {/* 添加 */}
          <Form form={from}>
            <Form.Item label="姓名" name="username">
              <Input placeholder="请输入用户的姓名" />
            </Form.Item>
            <Form.Item label="年龄" name="userage">
              <Input placeholder="请输入用户的年龄" />
            </Form.Item>
          </Form>
        </div>
        <div className="right">
          <Space>
            <Button
              onClick={() => {
                from.setFieldsValue({
                  username: undefined,
                  userage: undefined,
                });
              }}
            >
              重置
            </Button>
            <Button>查询</Button>
          </Space>
        </div>
      </div>
      <div className="context">
        <Table>111</Table>
      </div>
    </div>
  );
};
