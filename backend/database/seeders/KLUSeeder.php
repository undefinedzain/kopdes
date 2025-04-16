<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use App\Models\KLU;

class KLUSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        KLU::insert([
            // Gerai Sembako (Embrio KopHub) 1
            [
                'klu_id' => 1,
                'name' => 'Perdagangan Eceran Berbagai Barang Yang Utamanya Makanan, Minuman Atau Tembakau di Toko',
                'code_kbli' => '47111',
                'cooperativeTypeId' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 2,
                'name' => 'Perdagangan Eceran Berbagai Barang Yang Utamanya Makanan, Minuman Atau Tembakau Bukan Minimarket/Supermarket, Hypermarket, Tradisional',
                'code_kbli' => '47112',
                'cooperativeTypeId' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            // Apotek Desa 2
            [
                'klu_id' => 3,
                'name' => 'Perdagangan Eceran Barang Dan Obat Farmasi Untuk Manusia Di Apotik',
                'code_kbli' => '47721',
                'cooperativeTypeId' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 4,
                'name' => 'Perdagangan Eceran Barang Dan Obat Farmasi Untuk Manusia Bukan Di Apotik',
                'code_kbli' => '47723',
                'cooperativeTypeId' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 5,
                'name' => 'Perdagangan Eceran Obat Tradisional Untuk Manusia',
                'code_kbli' => '47724',
                'cooperativeTypeId' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 6,
                'name' => 'Perdagangan Eceran Alat Laboratorium, Alat Farmasi dan Alat Kesehatan Untuk Manusia',
                'code_kbli' => '47725',
                'cooperativeTypeId' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 7,
                'name' => 'Perdagangan Eceran Barang Dan Obat Farmasi Untuk Hewan Di Apotik Dan Bukan Di Apotik',
                'code_kbli' => '47726',
                'cooperativeTypeId' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 8,
                'name' => 'Perdagangan Eceran Obat Tradisional Untuk Hewan',
                'code_kbli' => '47727',
                'cooperativeTypeId' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 9,
                'name' => 'Perdagangan Eceran Kosmetik Untuk Hewan',
                'code_kbli' => '47728',
                'cooperativeTypeId' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 10,
                'name' => 'Perdagangan Eceran Khusus Barang Dan Obat Farmasi, Alat Kedokteran, Parfum Dan Kosmetik Lainnya',
                'code_kbli' => '47729',
                'cooperativeTypeId' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            // Gerai Kantor 3
            [
                'klu_id' => 11,
                'name' => 'Perdagangan Eceran Mesin',
                'code_kbli' => '47415',
                'cooperativeTypeId' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 12,
                'name' => 'Aktivitas Penyewaan Dan Sewa Guna Usaha Tanpa Hak Opsi Mesin Kantor Dan Peralatannya',
                'code_kbli' => '77394',
                'cooperativeTypeId' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            // Unit Simpan Pinjam 4
            [
                'klu_id' => 13,
                'name' => 'Unit Simpan Pinjam Koperasi Primer',
                'code_kbli' => '64142',
                'cooperativeTypeId' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 14,
                'name' => 'Unit Simpan Pinjam Koperasi Sekunder',
                'code_kbli' => '64144',
                'cooperativeTypeId' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 15,
                'name' => 'Unit Simpan Pinjam Dan Pembiayaan Syariah Primer',
                'code_kbli' => '64146',
                'cooperativeTypeId' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 16,
                'name' => 'Unit Simpan Pinjam Dan Pembiayaan Syariah Sekunder',
                'code_kbli' => '64148',
                'cooperativeTypeId' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            // Klinik Desa 5
            [
                'klu_id' => 17,
                'name' => 'Aktivitas puskesmas',
                'code_kbli' => '86102',
                'cooperativeTypeId' => 5,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 18,
                'name' => 'Aktivitas rumah sakit swasta',
                'code_kbli' => '86103',
                'cooperativeTypeId' => 5,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 19,
                'name' => 'Aktivitas klinik swasta',
                'code_kbli' => '86105',
                'cooperativeTypeId' => 5,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 20,
                'name' => 'Aktivitas rumah sakit lainnya',
                'code_kbli' => '86109',
                'cooperativeTypeId' => 5,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            // Cold Storage 6
            [
                'klu_id' => 21,
                'name' => 'Aktivitas Cold Storage',
                'code_kbli' => '52102',
                'cooperativeTypeId' => 6,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            // Logistic 7
            [
                'klu_id' => 22,
                'name' => 'Jasa Pengurusan Transportasi',
                'code_kbli' => '52291',
                'cooperativeTypeId' => 7,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 23,
                'name' => 'Aktivitas Ekspedisi Muatan Kereta Api dan Ekspedisi Angkutan Darat (EMKA & EAD)',
                'code_kbli' => '52292',
                'cooperativeTypeId' => 7,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 24,
                'name' => 'Aktivitas Ekspedisi Muatan Pesawat Udara (EMPU)',
                'code_kbli' => '52294',
                'cooperativeTypeId' => 7,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 25,
                'name' => 'Angkutan Multimoda',
                'code_kbli' => '52295',
                'cooperativeTypeId' => 7,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 26,
                'name' => 'Jasa Penunjang Angkutan Udara',
                'code_kbli' => '52296',
                'cooperativeTypeId' => 7,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'klu_id' => 27,
                'name' => 'Jasa Penunjang Angkutan Kapal/Pelayaran Perusahaan Nasional',
                'code_kbli' => '52297',
                'cooperativeTypeId' => 7,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ]);
    }
}
