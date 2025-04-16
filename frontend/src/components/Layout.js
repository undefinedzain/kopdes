'use client';

import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  BarChartOutlined,
  FileAddOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Dropdown, Avatar, Space } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';

const { Header, Sider, Content } = Layout;

// const role = 'PENGURUS_KOPERASI';
const isRegistered = false;

const menuByRole = {
  ADMINISTRATOR: [
    {
      key: '1',
      icon: <TeamOutlined />,
      label: 'Dashboard',
      path: '/administrator/dashboard',
    },
    {
      key: '2',
      icon: <IdcardOutlined />,
      label: 'NPAK',
      path: '/administrator/npak/listing',
    },
    {
      key: '3',
      icon: <AppstoreOutlined />,
      label: 'Koperasi',
      path: '/administrator/koperasi/listing',
    },
  ],
  NPAK: [
    {
      key: '1',
      icon: <AppstoreOutlined />,
      label: 'Koperasi',
      path: '/npak/koperasi/listing',
    },
  ],
  KORWIL_DINAS: [
    {
      key: '1',
      icon: <AppstoreOutlined />,
      label: 'Koperasi',
      path: '/korwil/koperasi',
    },
  ],
  KEMENTRIAN: [
    {
      key: '1',
      icon: <BarChartOutlined />,
      label: 'Statistik Koperasi',
      path: '/kementrian/statistik',
    },
  ],
  PENGURUS_KOPERASI: [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/koperasi/dashboard',
      requiresRegistration: true,
    },
    {
      key: '2',
      icon: <FileAddOutlined />,
      label: 'Pendaftaran',
      path: '/koperasi/proses-pendaftaran',
    },
    {
      key: '3',
      icon: <AppstoreOutlined />,
      label: 'Anggota',
      path: '/koperasi/anggota',
      requiresRegistration: true,
    },
    {
      key: '4',
      icon: <IdcardOutlined />,
      label: 'Profil Koperasi',
      path: '/koperasi/profil',
    },
  ],
};


export default function LayoutWrapper({ children }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const [role, setRole] = useState('');
  useEffect(() => {
    const userDetail = JSON.parse(
      localStorage.getItem("USERDETAIL_MERAHPUTIH")
    );
    const checkCooperative = userDetail?.roles?.find(
      (item) => item?.cooperativeId !== null
    );
    const checkNPAK = userDetail?.roles?.find(
      (item) => item?.npak !== null
    );

    if (checkCooperative) {
      setRole("PENGURUS_KOPERASI");
    } else if(checkNPAK){
      setRole("NPAK");
    }else {
      setRole("ADMINISTRATOR");
    }
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === 'profile') {
      router.push('/profil'); // arahkan ke halaman profil
    } else if (key === 'logout') {
      // Contoh logika logout
      localStorage.removeItem('TOKEN_MERAHPUTIH'); // misalnya logout lokal
      localStorage.removeItem('USERDETAIL_MERAHPUTIH'); // misalnya logout lokal
      router.push('/'); // redirect ke login
    }
  };

  const profileMenu = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profil',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  const currentMenu = (menuByRole[role] || []).map((item) => ({
    ...item,
    disabled: item.requiresRegistration && !isRegistered,
  }));

  const selectedKey = currentMenu.find((item) =>
    pathname?.startsWith(item.path)
  )?.key;

  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <Header className="bg-white px-4 lg:px-6 py-0 shadow z-50 fixed w-full top-0 h-[64px] flex items-center justify-between">
        {/* Kiri: Logo + Hamburger */}
        <div className="flex items-center space-x-4">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#01566a] flex items-center justify-center"
          />
          <Link href="/" className="text-[#01566a] text-lg font-bold">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Kanan: Avatar/Profile */}
        <Dropdown menu={{ items: profileMenu, onClick: handleMenuClick }} overlayClassName="min-w-[150px]" trigger={['click']}>
          <Space className="cursor-pointer">
            <Avatar
              style={{ backgroundColor: '#025669' }}
              icon={<UserOutlined />}
            />
          </Space>
        </Dropdown>
      </Header>

      {/* Konten dengan Sidebar */}
      <Layout className="pt-[64px]">
        {/* Sidebar */}
        <Sider
          width={250}
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          className={`
            bg-[#01566a]
            transition-all duration-300
            z-40

            fixed top-[64px] h-[calc(100vh-64px)] left-0
            ${collapsed ? '-left-[250px]' : 'left-0'}

            md:sticky md:top-[64px] md:h-[calc(100vh-64px)]
          `}
        >
          <div className="h-4" /> {/* Spacer biar gak terlalu mepet */}
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            rootClassName="bg-[#01566a] border-none"
            className="custom-menu"
            items={currentMenu.map((item) => ({
              key: item.key,
              icon: <span className="text-white">{item.icon}</span>,
              label: (
                <Link
                  href={item.path}
                  className={
                    item.disabled ? 'pointer-events-none opacity-50' : ''
                  }
                >
                  <span className="text-white">{item.label}</span>
                </Link>
              ),
              disabled: item.disabled,
            }))}
          />
        </Sider>

        {/* Konten Utama */}
        <Layout>
          <Content className="m-4 p-4 bg-white rounded shadow overflow-auto">
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
