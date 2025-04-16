<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class RegulationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('regulations')->insert([
            [
                'regulation_id' => '1',
                'name' => 'Undang Undang Nomor 25 Tahun 1992',
                'file' => 'https://storage.googleapis.com/kopdes-merah-putih/regulations/1.%20UU%20Nomor%2025%20Tahun%201992.pdf',
                'sequence' => '1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'regulation_id' => '2',
                'name' => 'Peraturan Pemerintah Nomor 7 Tahun 2021',
                'file' => 'https://storage.googleapis.com/kopdes-merah-putih/regulations/2.%20PP%20Nomor%207%20Tahun%202021.pdf',
                'sequence' => '2',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'regulation_id' => '3',
                'name' => 'Undang Undang Nomor 59 Tahun 2024',
                'file' => 'https://storage.googleapis.com/kopdes-merah-putih/regulations/3.%20UU%20Nomor%2059%20Tahun%202024.pdf',
                'sequence' => '3',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'regulation_id' => '4',
                'name' => 'Peraturan Pemerintah Nomor 11 Tahun 2021',
                'file' => 'https://storage.googleapis.com/kopdes-merah-putih/regulations/4.%20PP%20Nomor%2011%20Tahun%202021.pdf',
                'sequence' => '4',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'regulation_id' => '5',
                'name' => 'Peraturan Presiden Nomor 12 Tahun 2025',
                'file' => 'https://storage.googleapis.com/kopdes-merah-putih/regulations/5.%20Perpres%20Nomor%2012%20Tahun%202025.pdf',
                'sequence' => '5',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'regulation_id' => '6',
                'name' => 'Instruksi Presiden Nomor 9 Tahun 2025',
                'file' => 'https://storage.googleapis.com/kopdes-merah-putih/regulations/6.%20INPRES%20NOMOR%209%20TAHUN%202025-%20Koperasi%20Merah%20Putih.pdf',
                'sequence' => '6',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'regulation_id' => '7',
                'name' => 'PERATURAN MENTERI DESA, PEMBANGUNAN DAERAH TERTINGGAL, DAN TRANSMIGRASI REPUBLIK INDONESIA',
                'file' => 'https://storage.googleapis.com/kopdes-merah-putih/regulations/7.%20PERATURAN%20MENTERI%20%20DESA%2C%20PEMBANGUNAN%20DAERAH%20TERTINGGAL%2C%20DAN%20TRANSMIGRASI%20%20REPUBLIK%20INDONESIA%20NOMOR%207%20TAHUN%202023%20TENTANG%20RINCIAN%20PRIORITAS%20PENGGUNAAN%20DANA%20DESA.pdf',
                'sequence' => '7',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'regulation_id' => '8',
                'name' => 'SURAT EDARAN NOMOR 6 TAHUN 2025',
                'file' => 'https://storage.googleapis.com/kopdes-merah-putih/regulations/8.%20SE%20Menteri%20Desa%20dan%20PDT%20Nomor%206%20Tahun%202025%20tentang%20Juknis%20Percepatan%20Pelaksanaan%20Pembentukan%20Kopdes%20Merah%20Putih.pdf',
                'sequence' => '8',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'regulation_id' => '9',
                'name' => 'Surat Keputusan Satuan Tugas Kementerian Koperasi Kopdes Merah Putih',
                'file' => 'https://storage.googleapis.com/kopdes-merah-putih/regulations/9.%20SK%20Satgas%20Kemenkop%20Kopdes%20Merah%20Putih_Final.pdf',
                'sequence' => '9',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'regulation_id' => '10',
                'name' => 'SURAT EDARAN NOMOR 1 TAHUN 2025',
                'file' => 'https://storage.googleapis.com/kopdes-merah-putih/regulations/10.%20SE%20No%201%20Thn%202025%20%20Tata%20Cara%20Pembentukan%20Koperasi%20Desa%20Merah%20Putih_Ok%20.pdf',
                'sequence' => '10',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'regulation_id' => '11',
                'name' => 'PETUNJUK PELAKSANAAN MENTERI KOPERASI REPUBLIK INDONESIA NOMOR 1 TAHUN 2025',
                'file' => 'https://storage.googleapis.com/kopdes-merah-putih/regulations/11.%20Petunjuk%20Pelaksanaan%20Kopdes%20Merah%20Putih%20Paraf%20%26%20TTD%20Menteri%20Koperasi.pdf',
                'sequence' => '11',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
