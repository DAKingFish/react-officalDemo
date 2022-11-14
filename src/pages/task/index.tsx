import { Button, Input, Space, Table, Switch, Modal } from "antd"
import { useState, useEffect } from "react"
import { getList, save } from './services'
import { message } from 'antd';

/**
 * todoList
 */
export default () => {
  const [dataSource, setDataSource]: any = useState([])
  const [value, setValue]: any = useState('')
  //创建查询方法 调用services中 getlist获取数据源
  const query = async (params = {}) => {
    const {
      data: { code, data },
    }: any = await getList();
    if (code === 200) {
      setDataSource(data.data);
    } else {
      console.log('code', code, 'data', data.data)
    }
  };
  const saveData = async (params = {}) => {
    const {
      data: { code, data },
    }: any = await save(params);
    if (code === 200) {
      console.log('code', code, 'data', data)
      message.success('保存成功')
    } else {
      console.log('code', code, 'data', data)
      message.error('保存失败')
    }
  }
  //用useEffect 
  useEffect(() => {
    query()
    console.log('当前', dataSource)
  }, [])
  return <div>
    <h2>我的待办</h2>
    <button onClick={() => {
      query()
    }} >点击</button>
    <Input
      placeholder="请输入"
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value)
      }}
      onPressEnter={(e: any) => {
        /** 回车事件 */
        //创建时间 new date
        dataSource.push({
          work: e.target.value,
          time: new Date().toLocaleString(),
          isok: false
        })
        setDataSource([...dataSource]),
          saveData(dataSource),
          query(),
          setValue('')
      }} />
    <hr />
    <h2>待办列表</h2>
    <Table
      dataSource={dataSource}
      columns={[{
        title: '任务',
        dataIndex: 'work',
      },
      {
        title: '创建时间',
        dataIndex: 'time',
      },
      {
        title: '状态',
        dataIndex: 'isok',
        render(record) {
          return (
            <Switch
              checkedChildren="已完成"
              unCheckedChildren='未完成'
              checked={record.isok}
              onChange={() => {
                record.isok = !record.isok
                setDataSource([...dataSource])
              }} />
          )

        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        render(value, record, index) {
          return (
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  dataSource.splice(index, 1)
                  dataSource.unshift(record)
                  setDataSource([...dataSource])
                }}
              >
                置顶
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  Modal.confirm({
                    title: '提示',
                    content: '是否确认删除',
                    onOk() {
                      dataSource.splice(index, 1)
                      setDataSource([...dataSource])
                    }
                  })
                }}>
                删除
              </Button>
            </Space>
          )
        }
      }]}
    />
  </div>
}