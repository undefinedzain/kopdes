import Link from 'next/link';
import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300">
      {/* Kontainer Footer */}
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between px-8 py-6 space-y-6 md:space-y-0">
        {/* Bagian Logo (Kiri) */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center md:items-start w-full md:w-1/2">
          <img
            src="/images/logo-kemenkop.png"
            alt="Kemenkop"
            className="h-12"
          />
          <img
            src="/images/internasional.png"
            alt="Coop 2025"
            className="h-12"
          />
          <img src="/images/BerAKHLAK.png" alt="BerAKHLAK" className="h-12" />
        </div>

        {/* Bagian Address dan Social Icons (Kanan) */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right space-y-4">
          {/* Address Section */}
          <div className="max-w-md">
            <h2 className="text-lg font-semibold text-[#0E4B5A]">
              Kementerian Koperasi Republik Indonesia
            </h2>
            <p className="text-sm">
              Jl. H. R. Rasuna Said No.Kav. 3-4, RT.6/RW.7, Kuningan, Karet
              Kuningan, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus
              Ibukota Jakarta 12940
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-end space-x-4">
            <img src="/images/facebook.png" alt="Facebook" className="h-6" />
            <img src="/images/ig.png" alt="Instagram" className="h-6" />
            <img src="/images/x.png" alt="Twitter" className="h-6" />
            <img src="/images/yt.png" alt="YouTube" className="h-6" />
          </div>
        </div>
      </div>

      {/* Bagian Bawah Footer */}
      <div className="bg-[#0E4B5A] text-white text-center py-3 text-sm flex flex-col md:flex-row justify-center items-center gap-2 px-4">
        <span>Hakcipta © 2025. Kementerian Koperasi Republik Indonesia</span>
        <span className="hidden md:inline">|</span>
        <Link href="/syarat-dan-ketentuan" className="hover:text-gray-300">
          Syarat dan Ketentuan
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
