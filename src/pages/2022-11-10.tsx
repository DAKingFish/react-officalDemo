/**
* 基于 antd Table 手动写一个 简单版本模拟一下
*/

import { Table, Button, Space } from "antd";

interface TableProps {
  dataSource: any[],
  columns: any[],
  pagination?: boolean;
}

const MyTable = (props: TableProps) => {
  return <div className="my-table">
    <div className="my-table-header">
      {
        props.columns.map(column => {
          return <div className="my-table-header-column">
            {
              column.title
            }
          </div>
        })
      }
    </div>
    <div className="my-table-body">
      {
        // 先渲染每一行的数据
        props.dataSource.map((item, index) => {
          // 1. 先找到每一次项的具体属性,就是 columns 里面每一项对应的 dataIndex
          // 2. 开始渲染每一项 
          // 3. 如何处理自定义渲染、如果这个 column 定义的自己的 render 函数，我们就去执行它，并且把相应的参数传递进去
          return <div className="my-table-body-rows">
            {
              // 开始渲染每一行的具体列信息
              props.columns.map(column => {
                return <div className="my-table-body-rows-col">
                  {
                    // TODO
                    typeof column.render == 'function' ? column.render(item[column.dataIndex], item, index) : item[column.dataIndex]
                  }
                </div>
              })
            }
          </div>
        })
      }
    </div>
  </div>
}
/**
 * 按照这个需求规定来完成这个任务
 */
export default () => {
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    render(age) {
      return <Button>{age}</Button>
    }
  }, {
    title: '操作',
    dataIndex: 'action',
    render(value, record, index) {
      return <Space>
        <Button type='primary'>编辑-{record.name}</Button>
        <Button>删除</Button>
      </Space>
    }
  }]

  const dataSource = [{
    name: 'hello',
    age: 20,
  }, {
    name: 'you',
    age: 30,
  }, {
    name: 'my',
    age: 30,
  }]

  return <MyTable
    dataSource={dataSource}
    columns={columns}
  />
}