'use client';

import { Button, Form, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ConfirmationRegistration({
  cooperativeId,
  authorizedToken,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loadingForm, setLoadingForm] = useState(false);
  const onFinish = (values) => {
    setLoadingForm(true);
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = new FormData();
    data.append('cooperativeId', cooperativeId);
    data.append('token', authorizedToken);

    axios
      .patch('https://api.merahputih.kop.id/api/npak/cooperative-process', data, options)
      .then((res) => {
        message.success('Pendaftaran berhasil diproses');
        setLoadingForm(false);
        router.push('/masuk');
      })
      .catch(() => {
        message.error('Pendaftaran gagal diproses');
        setLoadingForm(false);
      });
  };

  return (
    <div className="bg-[#f5f5f5] px-4 py-10 text-sm text-[#222] font-sans min-h-screen">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <img src="/images/logo.png" className="h-10 mb-4" alt="logo" />
        <p>
          Halo Bapak/Ibu <strong>Notaris Pembuat Akta Koperasi</strong>,
        </p>
        {/* <p className="mt-4">
          Terdapat pengajuan self-declare Koperasi Desa/Kelurahan Merah Putih,
          Mohon konfirmasi atas pernyataan berikut:
        </p> */}

        {/* Informasi */}
        {/* <div className="relative mt-6 mb-6 border rounded-md p-4 bg-gray-50 text-sm text-[#333]">
        <h2 className="font-semibold text-base mb-3">
          Informasi Koperasi & Kuasa Penghadap Notaris
        </h2>
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 text-sm bg-[#006766] text-white px-3 py-1 rounded hover:bg-[#024d4c]"
        >
          Salin
        </button>
        <div className="grid grid-cols-2 gap-y-2 gap-x-6">
          <div><p className="text-gray-600">Nama Koperasi</p><p className="font-medium">{data.namaKoperasi}</p></div>
          <div><p className="text-gray-600">Jenis</p><p className="font-medium">{data.jenisKoperasi}</p></div>
          <div><p className="text-gray-600">Wilayah</p><p className="font-medium">{data.wilayah}</p></div>
          <div><p className="text-gray-600">Pola</p><p className="font-medium">{data.pola}</p></div>
          <div><p className="text-gray-600">Bentuk</p><p className="font-medium">{data.bentuk}</p></div>
          <div><p className="text-gray-600">Jangka Waktu</p><p className="font-medium">{data.jangkaWaktu}</p></div>
          <div><p className="text-gray-600">Alamat</p><p className="font-medium">{data.alamat}</p></div>
          <div><p className="text-gray-600">RT/RW</p><p className="font-medium">{data.rt}/{data.rw}</p></div>
          <div><p className="text-gray-600">Kelurahan/Desa</p><p className="font-medium">{data.desa}</p></div>
          <div><p className="text-gray-600">Kecamatan</p><p className="font-medium">{data.kecamatan}</p></div>
          <div><p className="text-gray-600">Kabupaten</p><p className="font-medium">{data.kabupaten}</p></div>
          <div><p className="text-gray-600">Provinsi</p><p className="font-medium">{data.provinsi}</p></div>
          <div><p className="text-gray-600">Kode Pos</p><p className="font-medium">{data.kodePos}</p></div>
          <div><p className="text-gray-600">Telepon</p><p className="font-medium">{data.teleponKoperasi}</p></div>
          <div><p className="text-gray-600">Email</p><p className="font-medium">{data.emailKoperasi}</p></div>

          <div className="col-span-2 border-t pt-4 mt-2">
            <p className="text-gray-600">Kuasa Penghadap Notaris</p>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div><p className="text-gray-600">Nama</p><p className="font-medium">{data.namaPenanggungJawab}</p></div>
              <div><p className="text-gray-600">Email</p><p className="font-medium">{data.emailPenanggungJawab}</p></div>
              <div><p className="text-gray-600">Telepon</p><p className="font-medium">{data.teleponPenanggungJawab}</p></div>
            </div>
          </div>
        </div>
      </div> */}

        {/* <ol className="pl-5 list-decimal space-y-1 mt-2">
          <li>
            Informasi dan data yang disampaikan dalam pengajuan ini adalah benar
            dan sesuai dengan keadaan yang sebenarnya..
          </li>
          <li>
            Pengajuan ini telah memenuhi seluruh persyaratan dan tidak melanggar
            ketentuan hukum maupun peraturan perundang-undangan yang berlaku.
          </li>
          <li>
            Anggota koperasi berdomisili di wilayah desa/kelurahan yang sama.
          </li>
        </ol> */}

        <p className="mt-4 font-bold">
        Dengan menekan tombol di bawah ini, Anda menyatakan telah membaca, memahami, dan memproses permohonan aplikasi pada SABH Kemenkum.
        </p>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="flex flex-col md:flex-row justify-between gap-4 py-4">
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loadingForm}
              className="md:w-1/2 bg-teal-800 hover:bg-teal-900"
            >
              Proses Permohonan
            </Button>
          </div>
        </Form>

        <div className="mt-10 text-center border-t pt-6 text-xs text-gray-500">
          <img
            src="/images/logo-kemenkop.png"
            className="h-8 mx-auto mb-2"
            alt="Kemenkop Logo"
          />
          <div className="flex justify-center gap-3 mb-2">
            <img src="/images/facebook.png" className="h-5" alt="fb" />
            <img src="/images/ig.png" className="h-5" alt="Instagram" />
            <img src="/images/x.png" className="h-5" alt="Twitter" />
          </div>
          <p>Hakcipta © 2025. Kementerian Koperasi Republik Indonesia</p>
        </div>
      </div>
    </div>
  );
}

ConfirmationRegistration.getInitialProps = async (ctx) => {
  const { slug } = ctx.query;
  return { cooperativeId: slug[0], authorizedToken: slug[1] };
};
