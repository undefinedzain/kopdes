'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, message, Table } from 'antd';
import 'tailwindcss/tailwind.css';
import LayoutWrapper from '@/components/Layout';
import axios from 'axios';
import { FundProjectionScreenOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useRouter } from 'next/router';


export default function ListingCooperative() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [npakData, setNpakData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1, // Halaman awal
    pageSize: 12, // Jumlah item per halaman
    total: 0, // Total item (akan diupdate setelah fetch)
  });
  const stats = [
    {
      title: 'Total NPAK',
      value: `${npakData?.pagination?.total_items ?? 0}`,
      bg: 'bg-blue-500',
      text: 'text-white',
    },
  ];

  const searchData = async (page, pageSize, search) => {
    setLoading(true);
    const token = localStorage.getItem('TOKEN_MERAHPUTIH');
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(
        `https://api.merahputih.kop.id/api/npak?page=${page}&page_size=${pageSize}&search=${search}`,
        options
      )
      .then((res) => {
        setPagination((prev) => ({
          ...prev,
          current: page,
          pageSize,
          total: res.data.pagination.total_items, // Misalnya total data 50 (harus didapat dari API)
        }));
        setNpakData(res.data);
        setLoading(false);
      })
      .catch(() => {
        message.error('Something when wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchCooperativeData = (page, pageSize) => {
    setLoading(true);
    const token = localStorage.getItem('TOKEN_MERAHPUTIH');
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(
        `https://api.merahputih.kop.id/api/npak?page=${page}&page_size=${pageSize}`,
        options
      )
      .then((res) => {
        setPagination((prev) => ({
          ...prev,
          current: page,
          pageSize,
          total: res.data.pagination.total_items, // Misalnya total data 50 (harus didapat dari API)
        }));
        setNpakData(res.data);
        setLoading(false);
      })
      .catch(() => {
        message.error('Something when wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCooperativeData(pagination.current, pagination.pageSize);
  }, []);

  const columns = [
    { title: 'No.', dataIndex: 'key', key: 'key' },
    { title: 'Tanggal', dataIndex: 'created_at', key: 'created_at' },
    { title: 'Nama', dataIndex: 'name', key: 'name' },
    {
      title: 'Provinsi',
      dataIndex: 'province',
      key: 'province',
      render: (_, record) => record?.province?.name || '-',
    },
    {
      title: 'Kabupaten',
      dataIndex: 'district',
      key: 'district',
      render: (_, record) => record?.district?.name || '-',
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Telepon', dataIndex: 'phone', key: 'phone' },
  ];

  return (
    <LayoutWrapper>
      <div className="p-4 space-y-4">
        <div className="text-xl font-semibold mb-2">
          Statistik Pendaftaran Koperasi Merah Putih
        </div>
        <div className="text-sm text-gray-500 mb-4">
          Status Data : {moment().format('DD MMMM YYYY HH:mm')}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-lg shadow ${item.bg} ${item.text} p-4 text-center`}
            >
              <div className="text-sm font-medium">{item.title}</div>
              <div className="text-2xl font-bold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">
          DATA KOPERASI MERAH PUTIH
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Data Pendaftaran Koperasi Merah Putih
        </p>
        <div className='py-4 w-1/2'>
          <Input.Search
            placeholder="Search"
            onChange={(e) => {
              searchData(1, 10, e.target.value);
            }}
            enterButton
          />
        </div>
        <Table
          columns={columns}
          dataSource={npakData?.data?.map((item, idx) => ({
            ...item,
            key: idx + 1,
          }))}
          bordered
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            onChange: (page, pageSize) => fetchCooperativeData(page, pageSize),
          }}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </LayoutWrapper>
  );
}
