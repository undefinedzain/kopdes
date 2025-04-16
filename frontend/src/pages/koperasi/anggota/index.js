'use client';

import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Table, Pagination } from 'antd';
import 'tailwindcss/tailwind.css';
import LayoutWrapper from '@/components/Layout';

const columns = [
  { title: 'No', dataIndex: 'no', key: 'no' },
  { title: 'createdAt', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Koperasi', dataIndex: 'koperasi', key: 'koperasi' },
  { title: 'Location', dataIndex: 'location', key: 'location' },
  { title: 'Code', dataIndex: 'code', key: 'code' },
  {
    title: 'Action',
    key: 'action',
    render: () => <Button icon={<EditOutlined />} type="primary" />,
  },
];

const data = [
  {
    no: 1,
    createdAt: '2025-03-14 | 15:08:58',
    koperasi: 'Merah Putih',
    location: 'GUDUNG Annex',
    code: 'GL2',
  },
  // Tambahkan data lainnya...
];

export default function CooperativePage() {
  return (
    <LayoutWrapper>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-lg font-semibold">Koperasi</h2>
        <div className="flex gap-2 flex-wrap bg-[01566a]">
          <Button type="primary">Export Location To Excel</Button>
          <Button type="primary">New Location</Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="no"
        className="overflow-x-auto"
      />
      <div className="flex justify-end mt-4">
        <Pagination defaultCurrent={1} total={4} pageSize={4} />
      </div>
    </LayoutWrapper>
  );
}
