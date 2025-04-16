'use client';

import React, { useEffect, useState } from 'react';
import { Button, message, Table } from 'antd';
import 'tailwindcss/tailwind.css';
import LayoutWrapper from '@/components/Layout';
import axios from 'axios';
import { FundProjectionScreenOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useRouter } from 'next/router';

export default function ListingCooperative() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cooperativeData, setCooperativeData] = useState([]);
  const stats = [
    {
      title: 'Total Koperasi Terdaftar',
      value: `${cooperativeData.length}`,
      bg: 'bg-blue-500',
      text: 'text-white',
    },
    {
      title: 'Total Koperasi Terbentuk',
      value: '0',
      bg: 'bg-green-500',
      text: 'text-white',
    },
  ];

  const fetchCooperativeData = () => {
    setLoading(true);
    const token = localStorage.getItem('TOKEN_MERAHPUTIH');
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get('https://api.merahputih.kop.id/api/cooperatives', options)
      .then((res) => {
        setCooperativeData(res.data.data);
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
    fetchCooperativeData();
  }, []);

  const columns = [
    { title: 'No.', dataIndex: 'key', key: 'key' },
    {
      title: 'Action',
      key: 'action',
      width: 50,
      render: (text, record) => (
        <Button
          type="primary"
          size="small"
          icon={<FundProjectionScreenOutlined />}
          onClick={() => router.push(`/administrator/koperasi/proses-pendaftaran/${record?.cooperative_id}`)}
        />
      ),
    },
    { title: 'Tanggal', dataIndex: 'created_at', key: 'created_at' },
    { title: 'Nama', dataIndex: 'name', key: 'name' },
    { title: 'Provinsi', dataIndex: 'province', key: 'province', render:(_, record) => record?.province?.name || '-' },
    { title: 'Kabupaten', dataIndex: 'district', key: 'district', render:(_, record) => record?.district?.name || '-' },
    { title: 'Kecamatan', dataIndex: 'subdistrict', key: 'subdistrict',  render:(_, record) => record?.subdistrict?.name || '-' },
    { title: 'Desa', dataIndex: 'village', key: 'village', render:(_, record) => record?.village?.name || '-' },
    { title: 'Notaris', dataIndex: 'npak', key: 'npak', render:(_, record) => record?.npak?.name || '-' },
    {
      title: 'Tipe Pendaftaran',
      dataIndex: 'registration_type',
      key: 'registration_type',
    },
    {
      title: 'Channel Pendaftaran',
      dataIndex: 'registration_channel',
      key: 'registration_channel',
    },
    { title: 'Subdomain', dataIndex: 'subdomain', key: 'subdomain' },
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
        <Table
          columns={columns}
          dataSource={cooperativeData.map((item, idx) => ({
            ...item,
            key: idx + 1,
          }))}
          bordered
          loading={loading}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </LayoutWrapper>
  );
}
