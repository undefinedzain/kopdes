'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { updateNPAK } from '@/services/notary';
import { Button, Form, Input, message, Modal, Spin } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function UpdateNPAK({ npakId, authorizedToken }) {
  const router = useRouter();
  const token = authorizedToken;

  const [loading, setLoading] = useState(false);
  const [cooperative, setCooperative] = useState(null);
  const fetchCooperativeData = () => {
    setLoading(true);
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .get(
        `https://api.merahputih.kop.id/api/npak/by-npak-id/${npakId}`,
        options
      )
      .then((res) => {
        setCooperative(res.data.data);
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

  const handleUpdateNPAK = (values) => {
    setLoading(true);
    updateNPAK({ ...values, token }).then((val) => {
      if (_.isEmpty(val)) {
        Modal.error({
          title: 'Pembaruan gagal dilakukan.',
          content: 'Silakan periksa koneksi atau ulangi nanti.',
          centered: true,
          okButtonProps: {
            className: 'bg-primary',
          },
        });
        setLoading(false);
      } else {
        Modal.success({
          title: 'Data NPAK berhasil diperbarui',
          centered: true,
          okButtonProps: {
            className: 'bg-primary',
          },
        });
        setLoading(false);

        setTimeout(() => {
          router.push('/npak/validasi/sukses');
        }, 1000);
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
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

        {/* Form Detail Notaris */}
        {loading ? (
          <div className="flex justify-center">
            <div>
              <Spin />
            </div>
          </div>
        ) : (
          <Form
            layout="vertical"
            initialValues={{
              ahu_number: cooperative?.ahu_number,
              sk_number: cooperative?.sk_number,
              certificate_training: cooperative?.certificate_training,
              email: cooperative?.email,
              primary_phone: cooperative?.primary_phone,
              secondary_phone: cooperative?.secondary_phone,
              office_telephone: cooperative?.office_telephone,
              name: cooperative?.name,
              province: cooperative?.province?.name,
            }}
            onFinish={handleUpdateNPAK}
          >
            <Form.Item label="Nama" name="name">
              <Input placeholder="Nama Notaris" disabled />
            </Form.Item>

            <Form.Item label="Provinsi" name="province">
              <Input disabled placeholder="Provinsi" />
            </Form.Item>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
              <Form.Item
                label="No. AHU"
                name="ahu_number"
                rules={[{ required: true, message: 'Silakan isi No. AHU' }]}
              >
                <Input placeholder="Masukkan No. AHU" />
              </Form.Item>

              <Form.Item
                label="No. SK NPAK"
                name="sk_number"
                rules={[{ required: true, message: 'Silakan isi No. SK' }]}
              >
                <Input placeholder="Masukkan No. SK" />
              </Form.Item>

              <Form.Item
                label="No. Sertifikat Pelatihan"
                name="certificate_training"
                rules={[
                  {
                    required: true,
                    message: 'Silakan isi No. Sertifikat Pelatihan',
                  },
                ]}
              >
                <Input placeholder="Masukkan No. Sertifikat" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Silakan isi Email' }]}
              >
                <Input type="email" placeholder="Masukkan Email" />
              </Form.Item>

              <Form.Item
                label="No. Telepon Kantor"
                name="office_telephone"
                rules={[
                  { required: true, message: 'Silakan isi No. Telepon Kantor' },
                ]}
              >
                <Input placeholder="Masukkan Nomor Telepon" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="No. HP"
                name="primary_phone"
                rules={[
                  { required: true, message: 'Nomor HP wajib diisi.' },
                  {
                    validator: (_, value) => {
                      if (!value || value.length < 8) {
                        return Promise.reject(
                          'Nomor HP harus terdiri dari minimal 8 digit.'
                        );
                      }
                      if (!/^62\d*$/.test(value)) {
                        return Promise.reject(
                          'Nomor HP harus diawali dengan angka 62.'
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="62812345678" type="number" />
              </Form.Item>

              <Form.Item
                label="No. HP Lainnya"
                name="secondary_phone"
                rules={[
                  { required: true, message: 'Nomor HP wajib diisi.' },
                  {
                    validator: (_, value) => {
                      if (!value || value.length < 8) {
                        return Promise.reject(
                          'Nomor HP harus terdiri dari minimal 8 digit.'
                        );
                      }
                      if (!/^62\d*$/.test(value)) {
                        return Promise.reject(
                          'Nomor HP harus diawali dengan angka 62.'
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="62812345678" type="number" />
              </Form.Item>
            </div>

            {/* <Form.Item label="Alamat" name="address">
            <Input.TextArea rows={3} placeholder="Masukkan Alamat Lengkap" />
          </Form.Item> */}

            {/* Tombol Aksi */}
            <div className="flex flex-col gap-3 mt-6 md:flex-row md:justify-between md:gap-4">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#0E4B5A] hover:bg-[#0b3d4a] text-white border-none w-full md:w-1/2"
              >
                Simpan
              </Button>
              <Button
                htmlType="button"
                onClick={() => router.push('/npak/validasi/informasi')}
                className="w-full md:w-1/2 border-[#a0b73e] text-[#a0b73e] hover:border-[#8ea233] hover:text-[#8ea233]"
              >
                Batal
              </Button>
            </div>
          </Form>
        )}
      </div>

      <Footer />
    </div>
  );
}

UpdateNPAK.getInitialProps = async (ctx) => {
  const { slug } = ctx.query;
  return { npakId: slug[0], authorizedToken: slug[1] };
};
