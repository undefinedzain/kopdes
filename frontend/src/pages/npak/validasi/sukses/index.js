import { Result, Button, Image } from 'antd';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        {/* Logo */}
        <div className="mb-6">
          <Image preview={false} src="/images/logo.png" alt="Logo" width={200} />
        </div>

        {/* Ant Design Success Component */}
        <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
          <Result
            status="success"
            title="🎉 Perubahan Data Notaris Pembuat Akta Koperasi Berhasil!"
            subTitle="Perubahan data Notaris Pembuat Akta Koperasi Anda telah berhasil disimpan. Kami menghargai waktu dan perhatian Anda dalam memastikan informasi tetap akurat dan terkini. Selanjutnya, Silahkan cek email untuk petunjuk selanjutnya dalam hal pembuatan akun atau Anda dapat melihat status perubahan data Notaris Pembuat Akta Koperasi Anda di halaman dasboard Anda."
            extra={
              <Link href="/masuk">
                <Button
                  type="primary"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Masuk
                </Button>
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
}
