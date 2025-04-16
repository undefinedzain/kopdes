'use client';

import React, { useState } from 'react';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ApartmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Tabs, Select } from 'antd';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { korwilData } from '@/data/korwilData';
import { dinasJatim } from '@/data/dinas/dinasJatim';
import { dinasBali } from '@/data/dinas/dinasBali';

const { TabPane } = Tabs;
const { Option } = Select;

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(null);

  const filteredKorwil = korwilData.filter(
    (item) =>
      item.provinsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const provinsiOptions = [
    { label: 'Jawa Timur', value: 'Jawa Timur', data: dinasJatim },
    { label: 'Bali', value: 'Bali', data: dinasBali },
  ];

  const selectedData = provinsiOptions.find((p) => p.value === selectedProvince)?.data || [];

  const filteredDinas = selectedData.filter((dinas) =>
    dinas.nama.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#0D3B66]">
            Kontak Koperasi Desa Merah Putih
          </h1>
          <p className="text-sm text-gray-600">Email: dev@satu.kop.id</p>
          <p className="text-sm text-gray-600">Telepon: 0812-3456-7890</p>
          <p className="text-sm text-gray-600">
            Jl. H. R. Rasuna Said No.Kav. 3-4, Kuningan, Jakarta Selatan 12940
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultActiveKey="korwil" className="mb-6">
          {/* Tab Korwil */}
          <TabPane tab="Kontak Koordinator Wilayah" key="korwil">
            <input
              type="text"
              placeholder="Cari provinsi atau wilayah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredKorwil.length > 0 ? (
                filteredKorwil.map((item, index) => (
                  <Card key={index} className="shadow-sm">
                    <h3 className="font-bold text-[#0D3B66] mb-2">
                      {item.nama}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>
                        <UserOutlined className="mr-2" />
                        Koordinator: {item.koordinator}
                      </p>
                      <p>
                        <EnvironmentOutlined className="mr-2" />
                        {item.provinsi}
                      </p>
                      <p>
                        <PhoneOutlined className="mr-2" />
                        <a
                          href={`tel:${item.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.phone}
                        </a>
                      </p>
                      <p>
                        <MailOutlined className="mr-2" />
                        <a
                          href={`mailto:${item.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.email}
                        </a>
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="font-medium text-gray-700 mb-1">
                        <ApartmentOutlined className="mr-2" />
                        Unit Kerja Pelaksana:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {item.ukp.map((ukpItem, i) => (
                          <li key={i}>{ukpItem}</li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-gray-600 col-span-full">Mohon maaf data tidak ditemukan, silakan cek ulang pencarian Anda</p>
              )}
            </div>
          </TabPane>

          {/* Tab Dinas */}
          <TabPane tab="Kontak Dinas Koperasi" key="dinas">
            <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
              <Select
                value={selectedProvince}
                onChange={(value) => setSelectedProvince(value)}
                className="w-full md:w-1/3 mb-2 md:mb-0"
                placeholder="Pilih Provinsi"
              >
                {provinsiOptions.map((prov) => (
                  <Option key={prov.value} value={prov.value}>
                    {prov.label}
                  </Option>
                ))}
              </Select>

              <input
                type="text"
                placeholder="Cari dinas koperasi..."
                value={searchTerm2}
                onChange={(e) => setSearchTerm2(e.target.value)}
                className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {selectedProvince === null || selectedProvince === "" ? (
                <p className="text-gray-500 italic col-span-full">
                  Silakan pilih provinsi terlebih dahulu.
                </p>
              ) : filteredDinas.length === 0 ? (
                <p className="text-gray-600 col-span-full">
                  Data tidak ditemukan.
                </p>
              ) : (
                filteredDinas.map((dinas, index) => (
                  <Card key={index} className="shadow-sm overflow-x-auto">
                    <h3 className="font-bold text-[#0D3B66] mb-3">{dinas.nama}</h3>

                    <table className="table-auto text-sm text-gray-700 w-full mb-4">
                      <tbody>
                        <tr>
                          <td className="font-medium pr-3 py-1">
                            <EnvironmentOutlined className="mr-1" />
                            Alamat
                          </td>
                          <td>: {dinas.alamat || "-"}</td>
                        </tr>
                        <tr>
                          <td className="font-medium pr-3 py-1">
                            <MailOutlined className="mr-1" />
                            Email
                          </td>
                          <td>
                            :{" "}
                            <a
                              href={`mailto:${dinas.email}`}
                              className="text-blue-600 hover:underline"
                            >
                              {dinas.email || "-"}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium pr-3 py-1">
                            <PhoneOutlined className="mr-1" />
                            Telp
                          </td>
                          <td>
                            :{" "}
                            <a
                              href={`tel:${dinas.telepon}`}
                              className="text-blue-600 hover:underline"
                            >
                              {dinas.telepon || "-"}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                      {/* PIC */}
                      <div>
                        <p className="font-bold !text-[#0E4B5A] mb-1 flex items-center">
                          <UserOutlined className="mr-2" />
                          PIC
                        </p>
                        <table className="table-auto w-full">
                          <tbody>
                            <tr>
                              <td className="font-medium pr-3 py-1">Nama</td>
                              <td>: {dinas.namaPIC || "-"}</td>
                            </tr>
                            <tr>
                              <td className="font-medium pr-3 py-1">No. Telp</td>
                              <td>
                                :{" "}
                                <a
                                  href={`tel:${dinas.teleponPIC}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {dinas.teleponPIC || "-"}
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Kepala Dinas */}
                      <div>
                        <p className="font-bold !text-[#0E4B5A] mb-1 flex items-center">
                          <UserOutlined className="mr-2" />
                          Kepala Dinas
                        </p>
                        <table className="table-auto w-full">
                          <tbody>
                            <tr>
                              <td className="font-medium pr-3 py-1">Nama</td>
                              <td>: {dinas.KepalaDinas || "-"}</td>
                            </tr>
                            <tr>
                              <td className="font-medium pr-3 py-1">No. Telp</td>
                              <td>
                                :{" "}
                                <a
                                  href={`tel:${dinas.teleponKepalaDinas}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {dinas.teleponKepalaDinas || "-"}
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
