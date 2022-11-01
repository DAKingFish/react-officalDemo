import { Table, Form, Input, Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getList } from './services';
import tableSchems from './table.schems';
import './index.less';

export default () => {
  const [dataSource, setDateSource]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
  // query 接受查询的参数
  const query = async (params = {}) => {
    setLoading(true)
    const { data: { code, data } }: any = await getList(params);
    setLoading(false)
    if (code === 200) {
      setDateSource(data)
    }
  }
  useEffect(() => {
    // 页面一加载我们开始设置数据、调用 api 发起请求获取数据
    query()
  }, [])
  const [form] = Form.useForm(); // step1 声明
  return <div className='pages-home'>
    <div className='pages-home-search'>
      {/* 挂载 */}
      <Form layout='inline' form={form}>
        <Form.Item label="姓名"
          name='name'>
          <Input placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item label="地址"
          name='address'>
          <Input placeholder='请输入地址' />
        </Form.Item>
      </Form>
      <Space>
        <Button onClick={() => {
          form.setFieldsValue(
            {
              name: undefined,
              address: undefined
            }
          )
        }}>重制</Button>
        <Button type='primary' onClick={()=>{
          query(form.getFieldsValue())
        }}>查询</Button>
      </Space>
    </div>
    <div className='pages-home-table'>
      <div className='pages-home-table-tools'>
        <div>
          主页列表
        </div>
        <div>
          <Space>
            <Button type='primary'>添加</Button>
            <Button onClick={() => {
              query()
            }}>刷新</Button>
          </Space>
        </div>
      </div>
      <Table columns={tableSchems} dataSource={dataSource} loading={loading} />
    </div>
  </div>
}