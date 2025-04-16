'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { fetchDistrict, fetchProvince } from '@/services/region';
import { Button, Form, Input, Select, Modal, Card, Empty, message } from 'antd';
import { useEffect, useState } from 'react';
import { getNotary, validityCheck } from '@/services/notary';
import _ from 'lodash';
import { NotaryDrawer } from '@/components/Drawer';
import { useRouter } from 'next/router';

export default function NPAKInformation() {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const router = useRouter();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [provinceCode, setProvinceCode] = useState();
  const [notaryName, setNotaryName] = useState();
  const [notaries, setNotaries] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNotary, setSelectedNotary] = useState(null);
  const [districts, setDistricts] = useState([]);

  const showDetails = (notary) => {
    setSelectedNotary(notary);
    setIsDrawerOpen(true);
  };

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    validityCheck(selectedNotary.notary_id, selectedDistrict).then((val) => {
      if (val?.valid) {
        router.push({
          pathname: `/npak/validasi/update/${selectedNotary.notary_id}/${val.token}`,
        });
      } else {
        Modal.error({
          title: 'Akses Ditolak',
          content:
            'Anda tidak memiliki izin untuk melakukan perubahan ini. Silakan hubungi administrator jika Anda yakin ini adalah kesalahan.',
          centered: true,
          okButtonProps: {
            className: 'bg-primary',
          },
        });
      }
    });
    setIsModalVisible(false);
  };
  const handleCancel = () => setIsModalVisible(false);

  useEffect(() => {
    fetchProvince().then(setProvinces);
  }, []);

  useEffect(() => {
    fetchDistrict(provinceCode).then(setDistricts);
  }, [provinceCode]);

  const onFinish = (values) => {
    getNotary(values.npak_name, values.province_code).then((val) => {
      if (_.isEmpty(val)) {
        Modal.error({
          title: 'Data tidak ditemukan',
          content:
            'Mohon periksa kembali nama notaris dan provinsi yang dipilih.',
          centered: true,
          okButtonProps: {
            className: 'bg-primary',
          },
        });
      } else {
        setNotaries(val);
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 flex flex-col">
      <Navbar />

      <div className="w-full mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0D3B66]">
            Validasi Informasi Notaris Pembuat Akta Koperasi
          </h1>
          <p className="text-gray-600 mt-2">
            Silakan lakukan pencarian dan verifikasi informasi notaris terkait
            pembuatan akta koperasi.
          </p>
        </div>
        {/* Form Pencarian */}
        <div className="bg-white rounded-lg border p-6 shadow-sm mb-10">
          <h2 className="text-xl font-semibold text-[#0D3B66] mb-4">
            Cari Informasi Notaris
          </h2>

          <Form
            layout="vertical"
            className="w-full"
            form={form}
            onFinish={onFinish}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4">
              <Form.Item
                name="npak_name"
                label="Cari Notaris"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: 'Masukkan Nama Notaris Pembuat Akta Koperasi',
                  },
                ]}
              >
                <Input
                  placeholder="Cari notaris berdasarkan nama, wilayah..."
                  onChange={(e) => setNotaryName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="province_code"
                label="Provinsi"
                className="w-full"
                rules={[{ required: true, message: 'Provinsi wajib dipilih' }]}
              >
                <Select
                  placeholder="Pilih Provinsi"
                  options={provinces.map((province) => ({
                    label: province.name,
                    value: province.code,
                  }))}
                  showSearch
                  filterOption={(input, option) =>
                    option?.label?.toLowerCase().includes(input.toLowerCase())
                  }
                  onChange={setProvinceCode}
                />
              </Form.Item>

              <Form.Item label="&nbsp;" colon={false}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  disabled={_.isEmpty(provinceCode) || _.isEmpty(notaryName)}
                  className="md:w-1/2 bg-primary hover:bg-primary"
                >
                  Cari
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
        {notaries?.map((notary) => (
          <Card key={notary.notary_id} className="rounded-2xl h-max">
            <div className="flex flex-row justify-between">
              {notary.name}
              <a
                className="text-primary font-semibold"
                onClick={() => {
                  showDetails(true);
                  setSelectedNotary(notary);
                }}
              >
                Rincian
              </a>
            </div>
          </Card>
        ))}

        <NotaryDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          notary={selectedNotary}
          onUpdate={() => showModal(true)}
        />
      </div>

      {/* MODAL */}
      <Modal
        title={
          <span className="text-[#0D3B66] text-lg font-semibold">
            Konfirmasi Update
          </span>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        <p className="mb-2">
          Silakan pilih kedudukan notaris sebagai verifikasi tambahan:
        </p>
        <Form
          layout="vertical"
          className="w-full"
          form={form2}
          onFinish={handleOk}
        >
          <Form.Item
            name="district_code"
            label="Pilih Kedudukan Notaris Pembuat Akta Koperasi"
            className="w-full"
            rules={[
              {
                required: true,
                message: 'Masukkan Nama Notaris Pembuat Akta Koperasi',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Pilih Kedudukan Notaris"
              className="w-full"
              options={districts.map((district) => ({
                label: district.name,
                value: district.code,
              }))}
              filterOption={(input, option) =>
                option?.label?.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => setSelectedDistrict(value)}
            />
          </Form.Item>
          <div className="flex flex-col-reverse md:flex-row justify-end gap-2 md:gap-4">
            {/* Tombol Batal - Outline Custom */}
            <Button
              onClick={handleCancel}
              className="w-full md:w-auto border !border-[#a0b73e] !text-[#a0b73e] hover:!border-[#0E4B5A] hover:!text-[#0E4B5A] hover:bg-[#0E4B5A] bg-white"
            >
              Batal
            </Button>

            {/* Tombol Simpan - Full Custom Warna */}
            <Button
              type="primary"
              htmlType="submit"
              block
              className="w-full md:w-auto !bg-[#0E4B5A] !text-white hover:!bg-[#0b3d4a] border-none"
            >
              Verifikasi
            </Button>
          </div>
        </Form>
      </Modal>
      <Footer />
    </div>
  );
}
