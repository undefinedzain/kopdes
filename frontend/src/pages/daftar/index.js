import { useState } from 'react';
import { Radio, Button } from 'antd';
import { useRouter } from 'next/router';
import Stepper from '@/components/Stepper';

const schemaList = [
  {
    value: 'baru',
    title: 'Membangun Koperasi Baru',
    desc: 'Dibentuk melalui musyawarah desa dengan melibatkan calon anggota koperasi sebanyak-banyaknya dari masyarakat desa untuk membentuk Koperasi Desa/Kelurahan Merah Putih. Jumlah anggota dapat dikembangkan lebih banyak.',
  },
  {
    value: 'pengembangan',
    title: 'Mengembangkan Yang Sudah Ada',
    desc: 'Dibentuk melalui rapat Perubahan Anggaran Dasar melibatkan masyarakat desa untuk membentuk Koperasi Desa/Kelurahan Merah Putih.',
  },
  {
    value: 'revitalisasi',
    title: 'Revitalisasi Koperasi',
    desc: 'Dibentuk melalui pembentukan tim Revitalisasi internal Koperasi, terdiri dari perangkat organisasi (Pengurus, Pengawas, Anggota, dan Karyawan) dengan mempertimbangkan kualitas Sumber Daya Manusia/kompetensi.',
  },
];

export default function SchemaRegistration() {
  const router = useRouter();
  const [value, setValue] = useState(null);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Sidebar */}
      <Stepper activeIndex={0} />

      {/* Main Content */}
      <div className="md:w-[70%] w-full px-6 py-10">
        <h2 className="text-2xl font-semibold text-[#003B49] mb-6">
          Pilih Skema Koperasi
        </h2>

        <Radio.Group
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="w-full space-y-4 flex flex-col"
        >
          {schemaList.map((skema, index) => (
            <Radio
              key={skema.value}
              value={skema.value}
              className="p-4 rounded-lg border border-gray-300 flex flex-col md:flex-row md:items-start gap-4"
            >
              <div className="flex-grow">
                <p className="font-semibold text-lg">{skema.title}</p>
                <p
                  className={
                    index === 2 ? 'text-gray text-sm' : 'text-gray-600 text-sm'
                  }
                >
                  {skema.desc}
                </p>
              </div>
            </Radio>
          ))}
        </Radio.Group>

        <Button
          type="primary"
          className="mt-8 md:w-1/2 bg-teal-800 hover:bg-teal-900"
          disabled={!value}
          onClick={() => {
            if (value === 'pengembangan') {
              router.push('/daftar/pengembangan-koperasi');
            } else if (value === 'revitalisasi') {
              router.push('/daftar/revitalisasi-koperasi');
            } else if (value === 'baru') {
              router.push('/daftar/pendaftaran-baru');
            }
          }}
        >
          Berikutnya
        </Button>
      </div>
    </div>
  );
}

/* TODO: [Maintenance]
  Register Form (pendaftaran baru & mengembangkan yang sudah ada) could to be one form in different page
  Add conditional logic to create share form.
  Also, create share layout on the left side.
*/