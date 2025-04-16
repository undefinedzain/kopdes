'use client';
import { Form, Input, Button, message, Image } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Captcha from '@/components/Captcha';
import { login } from '@/services/auth';

export default function LoginFormAntd() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState('');

  const onFinish = (values) => {
    if (values.captcha.toLowerCase() !== captchaText.toLowerCase()) {
      form.setFields([
        {
          name: 'captcha',
          errors: ['Kode yang anda masukkan salah. Silahkan masukkan kembali'],
        },
      ]);
      return;
    }
    
    setLoading(true);
    const body = {
      'email': values?.email,
      'password': values?.password
    }

    login(body).then(data => {
      const token = data.token;
      localStorage.setItem('TOKEN_MERAHPUTIH', token);
        // authorization
        message.success('Selamat, Anda berhasil login!');
        localStorage.setItem(
          'USERDETAIL_MERAHPUTIH',
          JSON.stringify(data.user)
        );

        const checkCooperative = data?.user?.roles?.find(
          (item) => item?.cooperativeId !== null
        );

        const checkNPAK = data?.user?.roles?.find(
          (item) => item?.npak !== null
        );
        
        if (checkCooperative) {
          router.push('koperasi/proses-pendaftaran');
        } else if (checkNPAK) {
          router.push('/npak/koperasi/listing');
        } else {
          router.push('/administrator/koperasi/listing');
        }
    }).catch((err) => {
      if (err) {
        message.error(
          'Authentication failed. Please check your email or password'
        );
      }
    })

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: "url('/images/bg-login.jpeg')" }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
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
          Masuk Ke Akun Koperasi Desa/Kelurahan Merah Putih
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            label="Alamat email"
            name="email"
            rules={[{ required: true, message: 'Mohon masukkan email Anda' }]}
          >
            <Input placeholder="Masukkan email" />
          </Form.Item>

          <Form.Item
            label="Kata Sandi"
            name="password"
            rules={[
              { required: true, message: 'Mohon masukkan kata sandi Anda' },
            ]}
          >
            <Input.Password placeholder="Masukkan kata sandi" />
          </Form.Item>

          <div className="flex justify-between items-center mb-4">
            <Link href="/reset-password" className="text-[#025669] text-sm hover:underline">
              Lupa Kata Sandi
            </Link>
          </div>

          {/* Captcha */}
          <Captcha onGenerate={setCaptchaText} />
          <div className="text-sm text-center">Untuk menjamin keamanan, isikan kode diatas!</div>
          <Form.Item
            name="captcha"
            rules={[{ required: true, message: 'Masukkan kode anda terlebih dahulu' }]}
          >
            <Input placeholder="Kode keamanan" maxLength={6} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={() => router.push('/koperasi/pendaftaran')}
              className="bg-[#025669] w-full hover:opacity-90"
              loading={loading}
            >
              Masuk
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
