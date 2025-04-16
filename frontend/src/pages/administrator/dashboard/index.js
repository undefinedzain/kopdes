'use client';

import React from 'react';
import { Button, Result } from 'antd';
import 'tailwindcss/tailwind.css';
import LayoutWrapper from '@/components/Layout';
import { Chart } from 'react-google-charts';
import moment from 'moment';

export const data = [
  ['Province', 'Popularity'],
  ['Aceh', 200],
  ['Sumatera Utara', 250],
  ['Sumatera Barat', 220],
  ['Riau', 180],
  ['Kepulauan Riau', 160],
  ['Jambi', 170],
  ['Sumatera Selatan', 210],
  ['Bangka Belitung', 150],
  ['Bengkulu', 140],
  ['Lampung', 190],
  ['DKI Jakarta', 800],
  ['Jawa Barat', 780],
  ['Banten', 760],
  ['Jawa Tengah', 740],
  ['DI Yogyakarta', 720],
  ['Jawa Timur', 800],
  ['Bali', 700],
  ['Nusa Tenggara Barat', 500],
  ['Nusa Tenggara Timur', 480],
  ['Kalimantan Barat', 400],
  ['Kalimantan Tengah', 420],
  ['Kalimantan Selatan', 440],
  ['Kalimantan Timur', 460],
  ['Kalimantan Utara', 380],
  ['Sulawesi Utara', 350],
  ['Gorontalo', 300],
  ['Sulawesi Tengah', 320],
  ['Sulawesi Selatan', 600],
  ['Sulawesi Tenggara', 310],
  ['Sulawesi Barat', 290],
  ['Maluku', 270],
  ['Maluku Utara', 260],
  ['Papua', 250],
  ['Papua Barat', 240],
  ['Papua Tengah', 230],
  ['Papua Pegunungan', 220],
  ['Papua Selatan', 210],
  ['Papua Barat Daya', 200],
];

export default function CooperativeDashboard() {
  return (
    <LayoutWrapper>
      <div className="p-4 space-y-4">
        <div className="text-xl font-semibold mb-2">
          Dashboard Pendaftaran Koperasi Merah Putih
        </div>
        <div className="text-sm text-gray-500 mb-4">
          Status Data : {moment().format('DD MMMM YYYY HH:mm')}
        </div>
      </div>
      <Chart
        chartType="GeoChart"
        width="100%"
        height="500px"
        data={data}
        options={{
          region: 'ID', // Kode ISO untuk Indonesia
          displayMode: 'regions',
          resolution: 'provinces',
          colorAxis: { colors: ['#a0b73e', '#025669'] },
        }}
      />
    </LayoutWrapper>
  );
}
