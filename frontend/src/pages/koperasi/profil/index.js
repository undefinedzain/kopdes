'use client';

import React, { useEffect, useState } from 'react';
import LayoutWrapper from '@/components/Layout';
import Link from 'next/link';
import { Button, message, Spin } from 'antd';
import { checkCooperative, getCooperativeByID } from '@/services/cooperative';
import { EditOutlined, FileTextOutlined } from '@ant-design/icons';
import _, { isEmpty } from 'lodash';
import { getProvinceById, getDistrictById, getSubdistrictById, getVillageById} from '@/services/region';
import { getNPAKById, getNPAKByProvinceId } from '@/services/notary';

export default function ProfilKoperasiPage() {
  const [loading, setLoading] = useState(false);
  const [cooperative, setCooperative] = useState(null);
  const [region, setRegion] = useState(null);
  const [notaryName, setNotaryName] = useState('-');

  const fetchCooperativeData = async () => {
    setLoading(true);

    // get Cooperative
    const { cooperativeId } = checkCooperative();
    const cooperativeData = await getCooperativeByID(cooperativeId);
    setCooperative(cooperativeData);
    setLoading(false);

    // get Region
      const { provinceId, districtId, subdistrictId, villageId, npakId } =
        cooperativeData;
      const province = await getProvinceById(provinceId);
      const district = await getDistrictById(districtId);
      const subdistrict = await getSubdistrictById(subdistrictId);
      const village = await getVillageById(villageId);

      setRegion({
        province: province?.name,
        district: district?.name,
        subdistrict: subdistrict?.name,
        village: village?.name,
      });

      // get NPAK by id
      getNPAKById(npakId).then(val => setNotaryName(val?.name))
  };

  useEffect(() => {
    fetchCooperativeData();
  }, []);

  return (
    <LayoutWrapper>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-xl font-bold text-[#004c5a]">Profil Koperasi</h1>
          <Link href="/koperasi/profil/update">
            <Button
              type="primary"
              icon={<EditOutlined />}
              className="bg-[#025669] hover:bg-[#024655]"
            >
              Edit Profil
            </Button>
          </Link>
        </div>
        {loading ? (
          <Spin spinning={loading} size="large" />
        ) : (
          <div>
            {/* Informasi Profil */}
            <section className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ReadOnly label="Nama Koperasi" value={cooperative?.name} />
                <ReadOnly label="Nama di SK" value={cooperative?.name} />
                {/* <ReadOnly label="Jenis Koperasi" value={data.jenisKoperasi} />
                <ReadOnly
                  label="Wilayah Keanggotaan"
                  value={data.wilayahKeanggotaan}
                />
                <ReadOnly label="Bentuk Koperasi" value={data.bentukKoperasi} />
                <ReadOnly
                  label="Pola Pengelolaan"
                  value={data.polaPengelolaan}
                />
                <ReadOnly label="Jangka Waktu" value={data.jangkaWaktu} /> */}
              </div>
            </section>

            {/* Kedudukan */}
            <section className="mb-10">
              <h3 className="text-lg font-semibold text-[#004c5a] mb-4">
                Kedudukan Koperasi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ReadOnly label="Provinsi" value={region?.province} />
                <ReadOnly label="Kabupaten/Kota" value={region?.district} />
                <ReadOnly label="Kecamatan" value={region?.subdistrict} />
                <ReadOnly label="Kelurahan/Desa" value={region?.village} />
                <ReadOnly
                  label="Alamat"
                  value={_.isEmpty(cooperative?.address) ? '-' : cooperative?.address}
                  className="md:col-span-2"
                />
                {/* <ReadOnly label="RW" value={data.rw} />
                <ReadOnly label="RT" value={data.rt} />
                <ReadOnly label="Kode Pos" value={data.kodePos} /> */}
                <ReadOnly label="Nomor Telepon" value={cooperative?.phone} />
                <ReadOnly label="Email" value={cooperative?.email} />
              </div>
            </section>

            {/* Dokumen */}
            <section>
              <h3 className="text-lg font-semibold text-[#004c5a] mb-4">
                Dokumen Legalitas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ReadOnly label="Nama Notaris" value={notaryName} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-2 gap-4">
                  <DocumentCard
                    title="Dokumen Berita Acara Musyawarah Desa Khusus"
                    fileName={cooperative?.bamd}
                  />
                  <DocumentCard title="Dokumen Berita Acara Rapat Anggota" fileName={cooperative?.bara} />
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
}

function ReadOnly({ label, value, className = '' }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm text-gray-700 font-medium mb-1">{label}</label>
      <div className="text-gray-800">{value}</div>
    </div>
  );
}

function DocumentCard({ title, fileName }) {
  return (
    <div className="border border-gray-200 rounded p-4 shadow-sm flex flex-col items-center gap-2 cursor-pointer" onClick={() => window.open(fileName)}>
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <FileTextOutlined className='text-4xl text-primary' />
    </div>
  );
}
