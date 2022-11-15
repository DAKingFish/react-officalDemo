import { Button, Input, Space, Table, Switch, Modal, Tag } from "antd"
import { useState, useEffect } from "react"
import { getList, remove, save, update } from './services'
import { message } from 'antd';
import moment from "moment";

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
      console.log('返回参数', data)
      setDataSource(data.data);
    } else {
      console.log('code', code, 'data', data)
    }
  };
  const saveData = async (params = {}) => {
    const {
      data: { code },
    }: any = await save(params);
    if (code === 200) {
      message.success('保存成功');
      query();
    } else {
      message.error('保存失败')
    }
    // 晴空
    setValue('');
  }
  // 用 useEffect 
  useEffect(() => {
    query()
  }, [])
  return <div>
    <h2>我的待办</h2>
    <Input
      placeholder="请输入"
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value)
      }}
      /** 回车事件 */
      onPressEnter={(e: any) => {
        saveData({
          name: e.target.value,
          status: 0,
          istop: 0
        });
      }} />
    <hr />
    <h2>待办列表</h2>
    <Table
      dataSource={dataSource}
      pagination={false}
      columns={[{
        title: '任务',
        dataIndex: 'name',
        render(name, { istop }) {
          return <Space>
            <span>{name}</span>
            {
              istop === 1 && <sup><Tag color="green">已置顶</Tag></sup>
            }
          </Space>
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        render(value) {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        render(value, record) {
          return (
            <Switch
              checkedChildren="已完成"
              unCheckedChildren='未完成'
              checked={record.status}
              onChange={async () => {
                const { data: { code, msg = '操作失败' } } = await update({
                  ...record,
                  createTime: undefined, // 取消这个参数
                  status: record.status === 1 ? 0 : 1,
                });
                if (code === 200) {
                  message.success('操作成功');
                  query();
                } else {
                  message.error(msg);
                }
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
                onClick={async () => {
                  const { data: { code, msg = '置顶失败' } } = await update({
                    ...record,
                    createTime: undefined, // 取消这个参数
                    istop: 1,
                  });
                  if (code === 200) {
                    message.success('置顶成功');
                    query();
                  } else {
                    message.error(msg);
                  }
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
                    async onOk() {
                      const { data: { code, msg = '删除失败' } } = await remove(record.id);
                      if (code === 200) {
                        message.success('删除成功');
                        query();
                      } else {
                        message.error(msg);
                      }
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