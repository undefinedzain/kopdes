import React, { useState } from 'react';
import { Form, Input, Button, Image, Modal } from 'antd';
import Link from 'next/link';
import { resetPassword, sendResetPasswordLink } from '@/services/auth';
import { useRouter } from 'next/router';
import _ from 'lodash';

export default function ResetPassword() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { email, token } = router?.query;
  const isResetLinkPassword = _.isEmpty(email) || _.isEmpty(token);

  const onFinish = (values) => {
    setLoading(true);

    if (isResetLinkPassword) {
      sendResetPasswordLink(values)
        .then(() => {
          Modal.success({
            title: 'Permintaan reset kata sandi berhasil dikirim',
            content:
              'Silakan cek email Anda pada kotak masuk atau folder spam Anda dan ikuti petunjuk yang diberikan untuk mengatur ulang kata sandi.',
            centered: true,
            okButtonProps: {
              className: 'bg-primary',
            },
          });
        })
        .catch((err) => {
          Modal.error({
            title: 'Email yang Anda masukkan tidak terdaftar.',
            content:
              'Pastikan Anda menggunakan email yang benar atau hubungi admin untuk bantuan.',
            centered: true,
            okButtonProps: {
              className: 'bg-primary',
            },
          });
        });
    } else {
      const body = {
        ...values,
        email,
        token,
      };

      resetPassword(body)
        .then((val) => {
          Modal.success({
            title: 'Kata sandi Anda berhasil diperbarui',
            content: 'Silakan masuk kembali dengan kata sandi baru Anda.',
            centered: true,
            okButtonProps: {
              className: 'bg-primary',
            },
          });

          setTimeout(() => {
            router.push('/masuk');
          }, 5000);
        })
        .catch((err) => {
          Modal.error({
            title: 'Gagal mengubah kata sandi',
            content:
              'Token atau tautan reset tidak valid atau sudah kedaluwarsa.',
            centered: true,
            okButtonProps: {
              className: 'bg-primary',
            },
          });
        });
    }

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
          Permintaan Reset Kata Sandi
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          {isResetLinkPassword ? (
            <Form.Item
              label="Alamat email"
              name="email"
              rules={[{ required: true, message: 'Mohon masukkan email Anda' }]}
            >
              <Input placeholder="Masukkan email" />
            </Form.Item>
          ) : (
            <div className="flex flex-col gap-2">
              <Form.Item
                label="Buat Kata Sandi Baru"
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
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primary w-full hover:opacity-90 mt-4"
              loading={loading}
            >
              {isResetLinkPassword
                ? 'Kirim Tautan Ubah Kata Sandi'
                : 'Ubah Kata Sandi'}
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-center">
          <Link href="/masuk" className="text-primary text-sm hover:underline">
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
