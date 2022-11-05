/**
 * 分页的逻辑
 */

import { Button, Select, Space, Table } from 'antd';
import { useState } from 'react';

// 制造100条数据
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
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const totalNum = Math.ceil(dataSource.length / pageSize);
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
