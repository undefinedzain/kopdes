import { useState, useEffect } from 'react';
import {
  Wrench,
  FastForward,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Image } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { list } from 'postcss';
import axios from 'axios';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [regulations, setRegulations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const targetDate = new Date('July 12, 2025 00:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const modelData = [
    {
      icon: <Wrench size={40} className="text-[#A0B73E]" />,
      title: 'Membangun Koperasi Baru',
      link: '/daftar/pendaftaran-baru',
    },
    {
      icon: <FastForward size={40} className="text-[#A0B73E]" />,
      title: 'Mengembangkan yang Sudah Ada',
      link: '/daftar/pengembangan-koperasi',
    },
    {
      icon: <Users size={40} className="text-[#A0B73E]" />,
      title: 'Revitalisasi Koperasi',
      link: '/daftar/revitalisasi-koperasi',
    },
  ];

  const benefitsData = [
    {
      image: '/images/rupiah.jpg',
      title: 'Menekan Inflasi',
    },
    {
      image: '/images/pexels-photo-4445848.jpeg',
      title: 'Memberikan Service Request Intake',
    },
    {
      image: '/images/pexels-photo-3226898.jpeg',
      title: 'Menekan harga di tingkat konsumen',
    },
    {
      image: '/images/bg-login.jpeg',
      title: 'Meningkatkan Kesejahteraan Petani',
    },
    {
      image: '/images/kerja.png',
      title: 'Menciptakan Lapangan Kerja',
    },
    {
      image: '/images/berdaya.jpeg',
      title: 'Meningkatkan Pemberdayaan Masyarakat',
    },
    {
      image: '/images/tengkulak.jpg',
      title: 'Menekan Pergerakan Tengkulak',
    },
    {
      image: '/images/nelayan.png',
      title: 'Katup Penyelamat Guncangan Ekonomi',
    },
    {
      image: '/images/inklusi.jpg',
      title: 'Meningkatkan Inklusi Keuangan',
    },
    {
      image: '/images/umkm.png',
      title: 'Menjadi Konsolidator UMKM',
    },
    {
      image: '/images/pexels-photo-11505049.jpeg',
      title: 'Perwujudan Pemerataan Ekonomi',
    },
  ];

  const bussinessTypeData = [
    'Gerai Sembako (Embrio KopHub)',
    'Apotek Desa',
    'Gerai Kantor Koperasi',
    'Gerai Unit Usaha Simpan Pinjam (Embrio Kop Bank)',
    'Gerai Klinik Desa',
    'Gerai Cold Storage/Cold Chain',
    'Logistik (Distribusi)',
  ];

  const faqs = [
    {
      question: 'Apa itu Koperasi Desa/Kelurahan Merah Putih?',
      answer:
        'Koperasi Desa/Kelurahan Merah Putih adalah lembaga ekonomi beranggotakan masyarakat desa yang dibentuk untuk meningkatkan kesejahteraan melalui prinsip gotong royong, kekeluargaan, dan partisipasi bersama.',
    },
    {
      question: 'Apa tujuan utama pembentukan Kopdes/kel Merah Putih?',
      answer:
        'Tujuannya antara lain memperkuat perekonomian desa, meningkatkan nilai tukar petani, menekan inflasi, menciptakan lapangan kerja, dan meningkatkan inklusi keuangan.',
    },
    {
      question: 'Apa dasar hukum pembentukan koperasi ini?',
      answer:
        'Pembentukan koperasi didasarkan pada berbagai peraturan, seperti Undang-Undang Nomor 25 Tahun 1992 tentang Perkoperasian (yang telah diubah beberapa kali), Peraturan Pemerintah, Peraturan Presiden, dan peraturan menteri terkait.',
    },
    {
      question: 'Apa saja mekanisme pembentukan Kopdes/kel Merah Putih?',
      answer:
        'Mekanismenya meliputi tiga pendekatan: pendirian koperasi baru, pengembangan koperasi yang telah ada, dan revitalisasi koperasi tidak aktif.',
    },
    {
      question: 'Bagaimana cara penamaan Koperasi Desa/Kelurahan Merah Putih?',
      answer:
        'Nama harus diawali dengan kata “Koperasi”, diikuti dengan frasa “Desa/Kelurahan Merah Putih”, dan diakhiri dengan nama desa/kelurahan setempat (misalnya, “Koperasi Desa/Kelurahan Merah Putih Karangrejo”)',
    },
    {
      question: 'Apa yang dimaksud dengan pra pendirian koperasi?',
      answer:
        'Pra pendirian mencakup tahap awal di mana calon pendiri bersama Badan Permusyawaratan Desa/Kelurahan mengadakan musyawarah untuk menyusun rancangan usaha, menentukan kebutuhan modal, dan menyepakati partisipasi modal.',
    },
    {
      question:
        'Bagaimana proses musyawarah desa/kelurahan dalam pembentukan koperasi?',
      answer:
        'Musyawarah desa/kelurahan dilakukan untuk membahas rencana pendirian, menyampaikan rancangan usaha, model bisnis, mitigasi risiko, dan menentukan kebutuhan modal yang akan ditetapkan melalui simpanan pokok dan simpanan wajib.',
    },
    {
      question: 'Apa itu rapat pendirian koperasi?',
      answer:
        'Rapat pendirian adalah pertemuan yang dihadiri oleh sebanyak-banyaknya masyarakat desa/kelurahan untuk membahas dan menetapkan pokok-pokok pendirian, seperti nama, alamat, maksud dan tujuan, permodalan, dan susunan pengurus/pengawas.',
    },
    {
      question: 'Bagaimana tata cara pendirian koperasi baru?',
      answer:
        'Pendirian koperasi baru dimulai dari musyawarah khusus desa/kelurahan, dilanjutkan dengan rapat pendirian, penyusunan notulen rapat, dan pengajuan pembuatan serta pengesahan Akta Pendirian melalui Notaris Pembuat Akta Koperasi (NPAK).',
    },
    {
      question: 'Apa peran Notaris Pembuat Akta Koperasi (NPAK)?',
      answer:
        'NPAK berperan membuat dan mengesahkan akta pendirian, perubahan anggaran dasar, serta dokumen hukum lain yang diperlukan dalam pendirian dan pengelolaan koperasi.',
    },
    {
      question: 'Apa itu Simpanan Pokok dan Simpanan Wajib?',
      answer:
        'Simpanan Pokok adalah sejumlah uang yang wajib disetor saat menjadi anggota dan tidak dapat diambil kembali, sedangkan Simpanan Wajib adalah simpanan berkala yang juga tidak dapat dicairkan selama keanggotaan.',
    },
    {
      question: 'Bagaimana proses pengesahan Akta Pendirian Koperasi?',
      answer:
        'Pengesahan dilakukan oleh NPAK melalui sistem SABH dengan menyerahkan dokumen seperti notulen rapat, berita acara pendirian, bukti penyetoran modal, dan rencana kerja koperasi.',
    },
    {
      question: 'Apa itu SABH?',
      answer:
        'SABH (Sistem Administrasi Badan Hukum) adalah platform layanan elektronik untuk pengesahan akta pendirian, perubahan anggaran dasar, dan pembubaran koperasi.',
    },
    {
      question: 'Bagaimana mekanisme pengembangan koperasi yang telah ada?',
      answer:
        'Pengembangan dilakukan dengan rapat anggota untuk perubahan anggaran dasar, penyesuaian nama dan jenis usaha sesuai dengan program Kopdes/kel Merah Putih, serta pengajuan perubahan melalui NPAK.',
    },
    {
      question: 'Apa yang dimaksud dengan revitalisasi koperasi?',
      answer:
        'Revitalisasi adalah proses mengaktifkan kembali koperasi yang tidak aktif dengan pendampingan, identifikasi potensi, dan penyelenggaraan rapat anggota untuk mengembalikan status aktifnya.',
    },
    {
      question:
        'Apa saja dokumen pendukung yang diperlukan dalam rapat pendirian?',
      answer:
        'Dokumen pendukung setidaknya meliputi daftar hadir, fotokopi KTP pendiri, notulen rapat, dan berita acara pendirian.',
    },
    {
      question: 'Bagaimana koperasi mengurus NPWP dan NIB?',
      answer:
        'Setelah akta pendirian disahkan, koperasi mengurus Nomor Pokok Wajib Pajak (NPWP) di Kantor Pelayanan Pajak dan mendaftarkan hak akses pada Online Single Submission (OSS) untuk memperoleh Nomor Induk Berusaha (NIB).',
    },
    {
      question:
        'Apa saja jenis usaha yang dapat dijalankan oleh Kopdes/kel Merah Putih?',
      answer:
        'Jenis usaha meliputi outlet gerai sembako, apotek desa/kelurahan, kantor koperasi, unit simpan pinjam, klinik desa/kelurahan, cold storage, logistik, serta usaha lain sesuai dengan potensi dan kebutuhan masyarakat desa.',
    },
    {
      question: 'Bagaimana koperasi memanfaatkan teknologi digital?',
      answer:
        'Koperasi dianjurkan mengoptimalkan teknologi digital, misalnya dengan memiliki situs web ber-domain “kop.id”, untuk memperkuat identitas dan integrasi dalam ekosistem koperasi.',
    },
    {
      question:
        'Bagaimana tata cara penyelenggaraan rapat anggota dalam koperasi?',
      answer:
        'Rapat anggota diselenggarakan untuk mengambil keputusan penting, seperti perubahan anggaran dasar, pengesahan laporan keuangan, pembagian sisa hasil usaha, dengan ketentuan kuorum dan tata tertib yang telah ditetapkan.',
    },
    {
      question:
        'Apa peran musyawarah desa/kelurahan khusus dalam pembentukan dan pengembangan koperasi?',
      answer:
        'Musyawarah desa/kelurahan berfungsi sebagai forum konsultasi awal untuk mendapatkan dukungan dan kesepakatan dari masyarakat serta menyusun rancangan usaha yang mendasari pendirian dan pengembangan koperasi.',
    },
    {
      question: 'Apakah semua koperasi wajib menggunakan domain .kop.id?',
      answer:
        'Baik Koperasi yang sudah memiliki website sendiri maupun yang belum, semua dianjurkan beralih ke domain .kop.id sebagai identitas koperasi di digital agar aktivitas digitalnya terhubung dalam Digitalisasi Koperasi.',
    },
    {
      question: 'Bagaimana cara mendaftar domain .kop.id?',
      answer:
        'Untuk mendaftar domain .kop.id, koperasi perlu mengajukan permohonan melalui platform resmi ini yang telah ditentukan oleh pemerintah.',
    },
  ];

  const fetchCooperativeData = () => {
    setLoading(true);
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .get(`https://api.merahputih.kop.id/api/regulations`, options)
      .then((res) => {
        console.log(res.data.data);
        setRegulations(res.data.data);
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
    <div className="poppins-regular bg-gray-50 min-h-screen">
      <Navbar />
      {/* Hero */}
      <div className="relative w-full bg-white shadow-md pt-[90px] md:pt-[90px] lg:pt-[80px] flex flex-col items-center">
        {/* Wrapper untuk Grid di Desktop */}
        <div className="w-full  grid grid-cols-1 md:grid-cols-2  items-center">
          {/* Countdown Section */}
          <div className="relative w-full md:order-2">
            <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] flex justify-center">
              {/* Background Image */}
              <div
                className="w-full h-full bg-cover bg-center "
                style={{
                  backgroundImage: 'url(/images/v621.webp)',
                }}
              ></div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>

              {/* Countdown Title & Timer */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                <h5 className="text-xl md:text-2xl lg:text-3xl text-white font-semibold">
                  Hitung Mundur Peluncuran Koperasi
                  <br />
                  Desa/Kelurahan Merah Putih 12 Juli 2025
                </h5>

                {/* Countdown Timer */}
                <div className="flex justify-center space-x-4 md:space-x-8 lg:space-x-12 text-white font-semibold ">
                  {[
                    { label: 'Hari', value: timeLeft.days },
                    { label: 'Jam', value: timeLeft.hours },
                    { label: 'Menit', value: timeLeft.minutes },
                    { label: 'Detik', value: timeLeft.seconds },
                  ].map((item, index) => (
                    <div key={index} className="text-center p-3 rounded-lg">
                      <span className="block font-bold text-3xl md:text-4xl lg:text-5xl">
                        {item.value}
                      </span>
                      <span className="text-md md:text-lg">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button Register */}
                <Link
                  href="/daftar"
                  className="my-4 w-full max-w-md bg-[#A0B73E] hover:bg-[#8CA531] text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 text-center"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
          {/* Quote Section */}
          <div className="relative md:order-1">
            <div className="bg-[#FBFEF5] p-6 md:py-24 lg:py-24 rounded-lg shadow-lg relative h-[150px] md:h-[350px] lg:h-[400px]">
              <p className="text-primary font-bold text-lg md:text-xl lg:text-5xl text-center md:text-left">
                "Koperasi Desa Sebagai Upaya Meningkatkan Ketahanan Pangan"
              </p>
              <p className="text-primary font-bold text-md mt-2 text-center md:text-left">
                - Presiden Prabowo
              </p>
              <div className="absolute top-0 right-0 w-2 h-full bg-[#A52525]"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="about"
        className="w-full px-6 md:px-10  py-10 mx-auto max-w-screen-xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Left Column (Text) */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-primary mb-4 md:mb-6">
              Tentang Koperasi Desa/Kelurahan Merah Putih
            </h2>
            <p className="text-gray-600 text-justify">
              Undang-Undang 1945 Pasal 33 menegaskan bahwa perekonomian
              Indonesia disusun atas usaha bersama yang didasarkan pada asas
              kekeluargaan. Presiden Republik Indonesia sangat mendukung segala
              upaya untuk menggerakkan koperasi di seluruh Indonesia,
              mencerminkan komitmen pemerintah dalam memperkuat ekonomi
              kerakyatan.
            </p>
            <p className="text-gray-600 text-justify mt-4">
              Pembentukan Koperasi Desa/Kelurahan Merah Putih didorong oleh
              kebutuhan untuk meningkatkan kesejahteraan ekonomi masyarakat desa
              melalui pendekatan ekonomi kerakyatan yang berbasis pada prinsip
              gotong royong, kekeluargaan, dan saling membantu.
            </p>
            <p className="text-gray-600 text-justify mt-4">
              Dalam retreat kepala daerah di Akmil Magelang pada 21-28 Februari
              2025, Presiden Prabowo menekankan pentingnya pembentukan Koperasi
              Desa sebagai upaya untuk meningkatkan ketahanan pangan.
            </p>
            <p className="text-gray-600 text-justify mt-4">
              Pada Rapat Terbatas di Istana Negara pada 3 Maret 2025, Presiden
              RI mengumumkan peluncuran 80.000 koperasi desa dengan nama
              Koperasi Desa/Kelurahan Merah Putih, yang akan dilakukan pada Hari
              Koperasi Nasional pada 12 Juli 2025. Inisiatif ini bertujuan untuk
              memperkuat ekonomi desa dan meningkatkan kesejahteraan masyarakat
              melalui koperasi.
            </p>
          </div>

          {/* Right Column (Image) */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/images/presiden.png"
              alt="Presiden Prabowo"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Additional text below both columns */}
        <div className="w-full pt-6 text-center">
          <p className="text-gray-600 text-justify">
            Koperasi ini diharapkan menjadi motor penggerak perekonomian desa,
            memberikan akses modal, serta membangun ekosistem bisnis berbasis
            gotong royong.
          </p>
        </div>
      </div>
      <div id="model" className="py-10 bg-white w-full">
        <h2 className="text-center text-xl font-bold text-[#0D3B66] mb-8">
          Model Pembentukan
        </h2>

        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 md:px-8">
            {modelData.map((item, index) => (
              <Link key={index} href={item.link || '#'} passHref>
                <div className="cursor-pointer w-full h-[180px] bg-[#FCFCFC] hover:bg-[#f0f0f0] shadow rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-200">
                  {item.icon}
                  <p className="mt-4 text-sm font-semibold text-[#0D3B66]">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div id="benefit" className="bg-[#F9FBF3] py-10 px-6">
        <div className="bg-[#F9FBF3] py-10 px-6">
          <div className="mx-auto flex flex-col lg:flex-row items-start gap-8">
            {/* Bagian Kiri: Judul */}
            <div className="lg:w-1/3 flex items-center">
              <h2 className="text-xl lg:text-2xl font-bold text-[#0D3B66] text-left leading-snug">
                11 Manfaat Koperasi Desa/Kelurahan Merah Putih <br /> Sebagai
                Pusat Produksi & Distribusi
              </h2>
            </div>

            {/* Bagian Kanan: Carousel */}
            <div className="lg:w-2/3 w-full">
              <Swiper
                spaceBetween={16}
                slidesPerView={1.2}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="!pb-16"
              >
                {benefitsData.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="rounded-xl overflow-hidden shadow-md bg-white max-w-sm mx-auto h-full flex flex-col">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[200px] object-cover"
                      />
                      <div className="p-4 flex-1 flex items-center">
                        <p className="text-sm font-semibold text-[#0D3B66]">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Pagination Style */}
              <style jsx global>{`
                .swiper-pagination {
                  bottom: 0px !important;
                  text-align: center;
                }

                .swiper-pagination-bullet {
                  background-color: #ccc;
                  opacity: 1;
                  margin: 0 4px !important;
                }

                .swiper-pagination-bullet-active {
                  background-color: #025669 !important;
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>

      <div
        id="type"
        className="relative w-full h-[600px] flex flex-col items-center justify-center overflow-hidden group"
      >
        {/* Zoomable background image layer */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100 group-hover:scale-110"
          style={{
            backgroundImage: "url('/images/pexels-photo-6447910.jpeg')",
          }}
        ></div>

        {/* Overlay untuk memperjelas teks */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Konten */}
        <div className="relative z-10 text-center text-white">
          <h2 className="text-lg font-semibold mb-4">Jenis Usaha</h2>
          <div className="flex flex-wrap justify-center gap-3 px-4 max-w-3xl">
            {bussinessTypeData.map((item, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm shadow-md"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        id="faq"
        className="relative flex justify-center items-center py-48 px-4 overflow-hidden group"
      >
        {/* Background layer yang bisa di-zoom */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100 group-hover:scale-110"
          style={{ backgroundImage: "url('/images/faq.png')" }}
        ></div>

        {/* Container Utama */}
        <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6 relative z-10">
          <h2
            className="text-center text-lg font-semibold mb-4"
            style={{ color: '#025669' }}
          >
            Pertanyaan Umum
          </h2>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
          >
            {faqs.map((faq, index) => (
              <SwiperSlide key={index}>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 mt-2">{faq.answer}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 swiper-button-prev cursor-pointer z-10">
            <div className="bg-white hover:bg-[#E6E6E6] shadow-md rounded-full w-10 h-10 flex items-center justify-center">
              <ChevronLeft className="w-6 h-6 text-[#025669]" />
            </div>
          </div>
          <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 swiper-button-next cursor-pointer z-10">
            <div className="bg-white hover:bg-[#E6E6E6] shadow-md rounded-full w-10 h-10 flex items-center justify-center">
              <ChevronRight className="w-6 h-6 text-[#025669]" />
            </div>
          </div>
        </div>
      </div>

      <div
        id="regulation"
        className="flex justify-center items-center px-6 py-12"
      >
        <div className="flex flex-col md:flex-row w-full max-w-5xl">
          {/* Label Kiri */}
          <div className="bg-[#A0B73E] text-white font-semibold text-lg p-6 md:rounded-l-lg flex items-center justify-center md:justify-start w-full md:w-[40%] text-center md:text-left">
            Regulasi atau Dasar Hukum <br /> Koperasi Desa/Kelurahan Merah Putih
          </div>

          {/* Daftar Regulasi */}
          <div className="bg-white shadow-lg md:rounded-r-lg p-6 w-full">
            {regulations.map((item, index) => (
              <div
                key={index}
                className="py-3 border-b last:border-none text-gray-800"
              >
                <a
                  href={item?.file}
                  className="hover:text-[#8CA531]"
                  target="_blank"
                >
                  {item?.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative w-full h-[400px] bg-[#0E4B5A] flex items-center justify-center px-8">
        {/* Container */}
        <div className="max-w-5xl w-full flex items-center justify-between">
          {/* Text & Buttons */}
          <div className="text-white">
            <h1 className="text-3xl font-bold leading-snug">
              Mari Bangun Negeri Dengan Jadi Bagian <br />
              Dari Koperasi Desa/Kelurahan Merah Putih
            </h1>
            <div className="mt-6 flex space-x-4">
              <Link
                href={'/masuk'}
                className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold shadow"
              >
                Masuk
              </Link>
              <Link
                href={'/daftar'}
                className="bg-[#A0B73E] text-white px-6 py-2 rounded-lg font-semibold shadow"
              >
                Daftar
              </Link>
            </div>
          </div>

          {/* Background Image */}
          <div className="absolute right-0 bottom-0 lg:w-[500px] md:w-[300px] w-[180px]">
            <img
              src="/images/anak-anak.png"
              alt="Anak membawa bendera Indonesia"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div className="border-t-4 border-b-4  border-[#8B2F2F]"></div>
      <Footer />
    </div>
  );
}
