/**
 * 分页的逻辑
 */

import { Button, Select, Space, Table } from 'antd';
import { useState } from 'react';

// 制造100条数据
// Array.fill('x') 将原数组全部替换成x,
const dataSource = new Array(96)
  .fill({
    name: '姓名',
    age: '年龄',
    address: '地址',
    liked: '爱好',
  })
  .map((item, index) => {
    return {
      id: Math.random(),
      name: item.name + (index + 1),
      age: item.age + (index + 1),
      address: item.address + (index + 1),
      liked: item.liked + (index + 1),
    };
  });

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
  {
    title: '爱好',
    dataIndex: 'liked',
  },
];

export default () => {
  // 对于后端只查询一部分，解决网路请求慢的问题
  // 对于前端至渲染部分的dom，解决渲染多造成页面卡顿的问题

  // Math.ceil() 向上取整

  // array.slice() 返回原数组的浅拷贝新数组(是不是地址值没有变)
  //slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 
  //决定的原数组的浅拷贝（包括 begin，不包括end）

  //useState 会刷新页面

  //disableed 在第一页和最后一页
  const [pageSize, setPageSize] = useState(10); // 每页展示多少数据
  const [pageNum, setPageNum] = useState(1);// 当前页
  const totalNum = Math.ceil(dataSource.length / pageSize);// 总页数
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource.slice((pageNum - 1) * pageSize, pageNum * pageSize)}
        pagination={false}
        scroll={{
          y: 600,
        }}
      />
      <br />
      <Space>
        <Button
          disabled={pageNum === 1}
          onClick={() => {
            setPageNum(pageNum - 1);
          }}
        >
          上一页
        </Button>
        {pageNum}
        <Button
          disabled={totalNum === pageNum}
          onClick={() => {
            setPageNum(pageNum + 1);
          }}
        >
          下一页
        </Button>
        共计 {totalNum} 页 页码设置
        <Select
          value={pageSize}
          onChange={(value) => {
            setPageSize(value);
          }}
          options={[
            {
              label: '每页 10',
              value: 10,
            },
            {
              label: '每页 20',
              value: 20,
            },
            {
              label: '每页 50',
              value: 50,
            },
            {
              label: '每页 100',
              value: 100,
            },
          ]}
        />
      </Space>
    </div>
  );
};
