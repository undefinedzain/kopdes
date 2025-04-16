'use client';
import { Form, Input, Button, message, Image, Spin } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Captcha from '@/components/Captcha';
import axios from 'axios';

export default function NPAKRegister({ npakId }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState('');

  const [loading, setLoading] = useState(false);
  const [npak, setNPAK] = useState(null);
  const fetchData = () => {
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
        setNPAK(res.data.data);
        form.setFieldsValue({
          name: res.data.data.name,
          email: res.data.data.email,
          phone: res.data.data.primary_phone,
        });
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
    fetchData();
  }, []);

  const onFinish = (values) => {
    setFormLoading(true);
    if (values.captcha.toLowerCase() !== captchaText.toLowerCase()) {
      form.setFields([
        {
          name: 'captcha',
          errors: ['Kode yang anda masukkan salah. Silahkan masukkan kembali'],
        },
      ]);
      setFormLoading(false);
      return;
    }

    const data = new FormData();
    data.append('name', values.name);
    data.append('email', values.email);
    data.append('phone', values.phone);
    data.append('npak', npakId);
    data.append('password', values.password);
    data.append('password_confirmation', values.password_confirmation);

    axios
      .post('https://api.merahputih.kop.id/api/register/npak', data)
      .then((res) => {
        message.success('Pendaftaran berhasil diproses');
        router.push('/masuk');
        setFormLoading(false);
      })
      .catch(() => {
        message.error('Pendaftaran gagal diproses');
        setFormLoading(false);
      });
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-primary bg-center px-4 sm:px-6 md:px-8"
      //   style={{ backgroundImage: "url('/images/bg-login.jpeg')" }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-xl">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/images/logo.png"
            alt="Logo Koperasi"
            width={100}
            preview={false}
            className="object-contain sm:w-[130px] sm:h-[130px]"
          />
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#025669] text-center mb-6">
          Buat Akun NPAK Koperasi Desa/Kelurahan Merah Putih
        </h2>
        <div className="text-xl text-[#025669] text-center">{npak?.name}</div>

        {loading ? (
          <div className="flex justify-center">
            <div>
              <Spin />
            </div>
          </div>
        ) : null}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            label="Nama"
            name="name"
            rules={[{ required: true, message: 'Mohon masukkan nama Anda' }]}
          >
            <Input placeholder="Masukkan nama" />
          </Form.Item>
          <Form.Item
            label="Alamat email"
            name="email"
            rules={[{ required: true, message: 'Mohon masukkan email Anda' }]}
          >
            <Input placeholder="Masukkan email" />
          </Form.Item>
          <Form.Item
            label="Nomor HP"
            name="phone"
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
            <Input
              // addonBefore="+62"
              placeholder="812345678"
              maxLength={15}
              type="tel"
            />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Buat Kata Sandi"
              name="password"
              rules={[
                { required: true, message: 'Kata sandi wajib diisi.' },
                { min: 8, message: 'Kata sandi minimal 8 karakter.' },
              ]}
            >
              <Input.Password placeholder="Masukan kata sandi" />
            </Form.Item>

            <Form.Item
              label="Ulangi Kata Sandi"
              name="password_confirmation"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Konfirmasi kata sandi wajib diisi.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Kata sandi tidak cocok');
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Masukan ulang kata sandi" />
            </Form.Item>
          </div>

          {/* Captcha */}
          <Captcha onGenerate={setCaptchaText} />
          <Form.Item
            name="captcha"
            rules={[
              { required: true, message: 'Masukkan kode anda terlebih dahulu' },
            ]}
          >
            <Input placeholder="Kode keamanan" maxLength={6} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#025669] w-full hover:opacity-90"
              loading={formLoading}
            >
              Daftar Sekarang
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 text-sm hover:underline">
            Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
NPAKRegister.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  return { npakId: id };
};
