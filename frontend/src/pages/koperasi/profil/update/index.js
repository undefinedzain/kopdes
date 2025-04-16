'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import LayoutWrapper from '@/components/Layout';
import { useRouter } from 'next/navigation';
import { checkCooperative, getCooperativeByID } from '@/services/cooperative';
import { cooperativeClass, cooperativeForm, managementPattern, workingArea, timeframe } from '../../../../data/data';

const { Option } = Select;

export default function UpdateCooperativeProfile() {
  const router = useRouter();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);

  const handleFinish = (values) => {
    console.log('Form submitted:', values);
    router.push('/koperasi/profil');
  };

  const handleCancel = () => {
    router.push('/koperasi/profil');
  };

  useEffect(() => {
    const { cooperativeId } = checkCooperative();
    getCooperativeByID(cooperativeId).then((val) => {
      form.setFieldsValue(val);
      setLoading(false);
    });
  }, []);

  return (
    <LayoutWrapper>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold text-[#025669] mb-2 sm:mb-0">
            Ubah Informasi Koperasi Anda
          </h2>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="text-[#121212]"
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Nama Koperasi" name="name">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Nama pada SK" name="old_name">
                <Input placeholder="Masukkan nama koperasi berdasarkan SK" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Jenis Koperasi" name="jenisKoperasi">
                <Select
                  placeholder="Pilih jenis koperasi"
                  options={cooperativeClass}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Wilayah Keanggotaan" name="working_area">
                <Select placeholder="Pilih wilayah keanggotan" options={workingArea} disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Bentuk Koperasi" name="form">
                <Select placeholder="Pilih bentuk koperasi" options={cooperativeForm} disabled/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Pilih pola Pengelolaan" name="management_pattern">
                <Select placeholder="Pola pengelolaan" options={managementPattern} disabled/>
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={12}>
              <Form.Item label="Jangka Waktu" name="timeframe">
                <Select placeholder="Pilih jangka waktu" options={timeframe} disabled/>
              </Form.Item>
            </Col> */}
          </Row>

          <h3 className="text-xl font-semibold text-[#025669] mt-6 mb-4">
            Kedudukan Koperasi
          </h3>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Provinsi" name="provinsi">
                <Select placeholder="Pilih provinsi" disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Kabupaten/Kota" name="kabupaten">
                <Select placeholder="Pilih Kabupaten/Kota" disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Kecamatan" name="kecamatan">
              <Select placeholder="Pilih kecamatan" disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Kelurahan/Desa" name="kelurahan">
              <Select placeholder="Pilih Kelurahan/Desa" disabled />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Alamat" name="address">
                <Input placeholder='Masukkan alamat' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="RT" name="rt">
                <Input placeholder='Masukkan RW' type="number" maxLength={2} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="RW" name="rw">
                <Input placeholder='Masukkan RT' type="number" maxLength={2} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Kode Pos" name="postal_code">
                <Input placeholder='Masukkan kode pos' type="number" maxLength={5} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Telepon" name="phone">
                <Input placeholder='Masukkan nomor telepon' type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Silakan isi Email' }]}
              >
                <Input type="email" placeholder="Masukkan alamat email" />
              </Form.Item>
            </Col>
          </Row>

          <h3 className="text-xl font-semibold text-[#025669] mt-6 mb-4">
            Dokumen Legalitas
          </h3>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Nama Notaris" name="npakId">
                <Input placeholder='Masukkan nama notaris' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Upload Dokumen RAT" name="dokRAT">
                <Upload beforeUpload={() => false} maxCount={1} accept=".pdf">
                  <Button icon={<UploadOutlined />}>Pilih File</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Upload Musyawarah Desa" name="dokMusDes">
                <Upload beforeUpload={() => false} maxCount={1} accept=".pdf">
                  <Button icon={<UploadOutlined />}>Pilih File</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <Button
              onClick={handleCancel}
              style={{
                borderColor: '#ef4444', // Tailwind 'red-500'
                color: '#ef4444',
              }}
              className="hover:!bg-red-50 hover:!text-red-600"
            >
              Batal
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled
              loading={loading}
              style={{
                backgroundColor: '#025669',
                borderColor: '#025669',
              }}
              className="hover:!bg-[#024655] text-white"
            >
              Simpan Perubahan
            </Button>
          </div>
        </Form>
      </div>
    </LayoutWrapper>
  );
}
