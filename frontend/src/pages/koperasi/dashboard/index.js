'use client';

import React from 'react';
import { Button, Result } from 'antd';
import 'tailwindcss/tailwind.css';
import LayoutWrapper from '@/components/Layout';

export default function CooperativeDashboard() {

  return (
    <LayoutWrapper>

      <Result
        status="success"
        title="Selamat Datang di Dashboard Koperasi Desa/Kelurahan Merah Putih"
        subTitle="Semoga harimu menyenangkan"
        extra={[
          <Button type="primary" key="console">
            Cek Proses Pendaftaran
          </Button>,
          <Button key="buy">Halaman Utama</Button>,
        ]}
      />
    </LayoutWrapper>
  );
}
