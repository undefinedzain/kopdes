'use client';

export default function NotifikasiNpakPage() {
  const data = {
    namaNpak: "Ibu NPAK",
    namaKoperasi: "Koperasi Merah Putih",
    jenisKoperasi: "Konsumen",
    wilayah: "Kabupaten",
    bentuk: "Primer",
    pola: "Konvensional",
    jangkaWaktu: "Tidak Terbatas",
    provinsi: "Jawa Tengah",
    kabupaten: "Sukoharjo",
    kecamatan: "Baki",
    desa: "Bentakan",
    alamat: "Jl. Mawar No. 10",
    rt: "04",
    rw: "01",
    kodePos: "57556",
    emailKoperasi: "koperasi.merahputih@gmail.com",
    teleponKoperasi: "082212345678",
    namaPenanggungJawab: "Bintang Danuarta",
    emailPenanggungJawab: "bintang@email.com",
    teleponPenanggungJawab: "08123456789",
  };

  return <EmailNpak data={data} />;
}

function EmailNpak({ data }) {
  const handleCopy = () => {
    const text = `
Informasi Koperasi:
- Nama: ${data.namaKoperasi}
- Jenis: ${data.jenisKoperasi}
- Wilayah: ${data.wilayah}
- Alamat: ${data.alamat}, RT ${data.rt}/RW ${data.rw}, ${data.desa}, ${data.kecamatan}, ${data.kabupaten}, ${data.provinsi}, ${data.kodePos}
- Telepon: ${data.teleponKoperasi}
- Email: ${data.emailKoperasi}

Penanggung Jawab:
- Nama: ${data.namaPenanggungJawab}
- Email: ${data.emailPenanggungJawab}
- Telepon: ${data.teleponPenanggungJawab}
    `;
    navigator.clipboard.writeText(text);
    alert("Informasi berhasil disalin!");
  };

  return (
    <div className="bg-[#f5f5f5] px-4 py-10 text-sm text-[#222] font-sans min-h-screen">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <img src="/images/logo.png" className="h-10 mb-4" alt="logo" />

        <p>
          Halo <strong>{data.namaNpak}</strong>,
        </p>

        <p className="mt-4">
          Terdapat pengajuan Koperasi Desa/Kelurahan Merah Putih dengan informasi sebagai berikut:
        </p>

        {/* Card Informasi */}
        <div className="relative mt-6 mb-6 border rounded-md p-4 bg-gray-50 text-sm text-[#333]">
          <h2 className="font-semibold text-base mb-3">Informasi Koperasi & Penanggung Jawab</h2>
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
            <div><p className="text-gray-600">Bentuk</p><p className="font-medium">{data.bentuk}</p></div>
            <div><p className="text-gray-600">Pola</p><p className="font-medium">{data.pola}</p></div>
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

            {/* Penanggung Jawab */}
            <div className="col-span-2 border-t pt-4 mt-2">
              <p className="text-gray-600">Penanggung Jawab</p>
              <div className="grid grid-cols-2 gap-4 mt-1">
                <div><p className="text-gray-600">Nama</p><p className="font-medium">{data.namaPenanggungJawab}</p></div>
                <div><p className="text-gray-600">Email</p><p className="font-medium">{data.emailPenanggungJawab}</p></div>
                <div><p className="text-gray-600">Telepon</p><p className="font-medium">{data.teleponPenanggungJawab}</p></div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 font-bold">
          Dengan menekan tombol di bawah ini, Anda menyatakan telah membaca, memahami, dan memproses permohonan aplikasi pada SABH Kemenkum.
        </p>

        <div className="text-center mt-6">
          <button className="bg-[#006766] text-white px-6 py-2 rounded-md font-bold w-full">
            Masuk dan Proses
          </button>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center border-t pt-6 text-xs text-gray-500">
          <img src="/images/logo-kemenkop.png" className="h-8 mx-auto mb-2" alt="Kemenkop Logo" />
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
