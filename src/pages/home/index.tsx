import { Table, Form, Input, Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getList } from './services';
import tableSchems from './table.schems';
import './index.less';

export default () => {
  const [dataSource, setDateSource]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
  const query = async () => {
    setLoading(true)
    const { data: { code, data } }: any = await getList();
    setLoading(false)
    if (code === 200) {
      setDateSource(data)
    }
  }
  useEffect(() => {
    // 页面一加载我们开始设置数据、调用 api 发起请求获取数据
    query()
  }, [])
  return <div className='pages-home'>
    <div className='pages-home-search'>
      <Form layout='inline'>
        <Form.Item label="姓名">
          <Input placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item label="地址">
          <Input placeholder='请输入地址' />
        </Form.Item>
      </Form>
      <Space>
        <Button>重制</Button>
        <Button type='primary'>查询</Button>
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