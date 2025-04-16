import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Stepper(activeIndexParams) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    setActiveIndex(activeIndexParams.activeIndex);
  });

  const schema = [
    {
      label: 'Pilih Skema',
      desc: 'Pilih salah satu dari tiga skema yang disediakan',
    },
    {
      label: 'Informasi Data Koperasi & Kuasa Penghadap Notaris',
      desc: 'Isi detail data koperasi & kuasa penghadap notaris',
    },
  ];

  return (
    <div className="w-full md:w-[30%] bg-primary text-white flex flex-col justify-between rounded-tr-[30px] md:rounded-tr-[40px]">
      <div>
        {/* Logo section */}
        <div className="bg-white w-1/2 rounded-br-xl md:rounded-br-[40px] p-4">
        <Link href="/">
          <img src="/images/logo.png" alt="Logo" className="w-32 md:w-40" />
        </Link>
        </div>

        {/* Step List */}
        <div className="space-y-6 p-4 md:p-6">
          {schema.map((item, index) => {
            const active = activeIndex >= index;

            return (
              <div
                key={index}
                className={twMerge(
                  'flex items-start space-x-3',
                  active ? '' : 'opacity-70'
                )}
              >
                <div
                  className={twMerge(
                    'w-5 h-5 rounded-full border-2 border-white',
                    active ? 'flex items-center justify-center' : ''
                  )}
                >
                  {active && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
                <div className="text-sm md:text-base">
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Back Button */}
      <Button
        icon={<LeftOutlined />}
        className="text-white border-white mx-4 my-6 md:mx-6 md:my-10 w-fit"
        type="text"
        onClick={() => {
          router.push('/');
        }}
      >
        Halaman utama
      </Button>
    </div>
  );
}
