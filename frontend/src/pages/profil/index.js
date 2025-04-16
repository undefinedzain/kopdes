import LayoutWrapper from '@/components/Layout';
import { getUserProfile, updateUserProfile } from '@/services/auth';
import { Button, Form, Input, Spin, Modal, message } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [isRead, setIsRead] = useState(true);

  useEffect(() => {
    setLoading(true);
    const userDetail = JSON.parse(
      localStorage.getItem('USERDETAIL_MERAHPUTIH')
    );

    getUserProfile(userDetail)
      .then((val) => {
        if (val?.user) {
          const data = val?.user;
          form.setFieldValue(data);
          setUser(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err) {
          message.error(
            'Terjadi kesalahan. Mohon ulangi beberapa saat kembali'
          );
        }
      });
  }, []);

  const onFinish = (values) => {
    if (isRead) {
      setIsRead(!isRead);
      return;
    }

    setLoading(true);
    updateUserProfile(values)
      .then(() => {
        Modal.success({
          title: 'Data profil berhasil diperbarui',
          centered: true,
          okButtonProps: {
            className: 'bg-primary',
          },
        });
      })
      .catch(() => {
        Modal.error({
          title: 'Gagal memperbarui data profil',
          centered: true,
          okButtonProps: {
            className: 'bg-primary',
          },
        });
      });

    setLoading(false);
    setIsRead(true);
  };

  return (
    loading ?
    <Spin />
    : 
    <LayoutWrapper>
      <h1 className="text-2xl font-bold text-[#004c5a] pt-6 px-6">Profil</h1>
      <section className="my-10 px-6">
        <Form
          form={form}
          className="space-y-4 w-full lg:w-1/2"
          layout="vertical"
          initialValues={{
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Nama"
            name="name"
            rules={[{ required: !isRead, message: 'Nama wajib diisi' }]}
          >
            <Input
              placeholder="Masukan nama"
              readOnly={isRead}
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: !isRead,
                type: 'email',
                message: 'Email tidak valid atau kosong.',
              },
            ]}
          >
            <Input placeholder="Masukan alamat email" readOnly={isRead} />
          </Form.Item>

          <Form.Item
            label="No. HP"
            name="phone"
            rules={[
              { required: !isRead, message: 'Nomor HP wajib diisi.' },
              {
                min: 8,
                message: 'Nomor HP harus terdiri dari minimal 8 digit.',
              },
            ]}
          >
            <Input
              placeholder="62812345678"
              type="number"
              minLength={8}
              readOnly={isRead}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-primary w-full hover:opacity-90 mt-6"
            >
              {isRead ? 'Ubah' : 'Simpan'}
            </Button>
          </Form.Item>
        </Form>
      </section>
    </LayoutWrapper>
  )
}
