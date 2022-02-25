import React from 'react';

import { ProTable } from 'cloud-xinyi';
import { Button } from 'antd';

type IProps = {};

const SearchList: React.FC<IProps> = (props) => {
  return (
    <ProTable
      condition={{
        config: [
          {
            type: 'input',
            name: 'name',
            placeholder: '请输入名称',
            width: 200,
          },
        ],
      }}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '描述',
          dataIndex: 'desc',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
        },
      ]}
    >
      {({ condition, table }) => (
        <>
          <div
            style={{
              marginBottom: 20,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button type="primary">新建</Button>
            {condition}
          </div>
          {table}
        </>
      )}
    </ProTable>
  );
};

export default SearchList;
