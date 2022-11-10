import { Button, Input, Space, Table, Switch, Modal } from "antd"
import { useState } from "react"
/**
 * todoList
 */
export default () => {
  const [data, setData]: any = useState([])
  const [value, setValue]: any = useState('')
  return <div>
    <h2>我的待办</h2>
    <Input
      placeholder="请输入"
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value)
      }}
      onPressEnter={(e: any) => {
        /** 回车事件 */
        //创建时间 new date
        data.push({
          work: e.target.value,
          time: new Date().toLocaleString(),
          isok: false
        })
        setData([...data])
        setValue('')
      }} />
    <hr />
    <h2>待办列表</h2>
    <Table
      dataSource={data}
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
                setData([...data])
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
                  data.splice(index, 1)
                  data.unshift(record)
                  setData([...data])
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
                      data.splice(index, 1)
                      setData([...data])
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