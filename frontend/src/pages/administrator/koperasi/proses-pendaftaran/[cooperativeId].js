'use client';

import React, { useEffect, useState } from 'react';
import LayoutWrapper from '@/components/Layout';
import { CheckOutlined } from '@ant-design/icons';
import axios from 'axios';
import { message, Spin } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';

export default function CooperativelegalStages({cooperativeId}) {
  const [currentStage, setCurrentStage] = useState(0);
  const [stages, setStages] = useState([]);
  const timelineItems = [
    { title: 'Pendaftaran', date: null, link: false },
    { title: 'Diproses Notaris', date: null, link: false },
    { title: 'Selesai', date: null, link: true },
  ];

   const [loading, setLoading] = useState(false);

  const fetchCooperativeData = () => {
    setLoading(true);
    const token = localStorage.getItem('TOKEN_MERAHPUTIH');
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`https://api.merahputih.kop.id/api/cooperative/legal-stages/by-cooperative-id/${cooperativeId}`, options)
      .then((res) => {
        setStages(res.data.data);
        setCurrentStage(res.data.data.length - 1);
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

  return (
    <LayoutWrapper>
      <div className="p-6">
      <h2 className="text-2xl font-semibold text-[#004c5a] mb-6">
          Status Pendaftaran
        </h2>
        <div className="overflow-x-auto">
          <div className="relative flex w-max min-w-full justify-between items-start px-4">

            {/* Garis background (abu-abu) */}
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 z-0 rounded" />

            {/* Garis progress (hijau) */}
            <div
              className="absolute top-5 left-0 h-1 bg-[#004c5a] z-10 rounded transition-all duration-300"
              style={{
                width: `${(currentStage / (timelineItems.length - 1)) * 100}%`,
              }}
            />
            {
              loading && (
                <Spin size="large" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )
            }

            {/* Step items */}
            {timelineItems.map((item, index) => {
              const isActive = index === currentStage;
              const isCompleted = index <= currentStage;

              return (
                <div
                  key={index}
                  className="relative z-20 flex flex-col items-center w-40 min-w-[150px] mx-2"
                >
                  {/* Lingkaran Icon */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 mb-2 transition-colors duration-300 ${
                      isCompleted
                        ? 'bg-[#004c5a] border-[#004c5a] text-white'
                        : 'border-gray-300 text-gray-300 bg-white'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckOutlined className="text-base" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-current" />
                    )}
                  </div>

                  {/* Badge "On Going" */}
                  {isActive && (
                    <div className="bg-[#004c5a] text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">
                      On Going
                    </div>
                  )}

                  {/* Judul Step */}
                  <p
                    className={`text-center text-sm font-semibold leading-snug ${
                      isCompleted
                        ? 'text-[#004c5a]'
                        : 'text-gray-400'
                    }`}
                  >
                    {item.title}
                  </p>

                  {/* Tanggal atau Link */}
                  {item.link && isCompleted ? (
                    <a
                      href='/'
                      className="text-xs text-[#004c5a] underline font-medium mt-1"
                    >
                      {stages[index] ? dayjs(stages[index]?.created_at).format('DD MMMM YYYY HH:mm:ss') : ''}
                    </a>
                  ) : (
                    <p
                      className={`text-xs mt-1 ${
                        isCompleted ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      {stages[index] ? dayjs(stages[index]?.created_at).format('DD MMMM YYYY HH:mm:ss') : ''}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
CooperativelegalStages.getInitialProps = async (ctx) => {
  const { cooperativeId } = ctx.query;
  return { cooperativeId: cooperativeId };
};
