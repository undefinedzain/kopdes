<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use App\Models\NPAK;
use App\Models\Province;
use App\Models\District;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class NPAKSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        NPAK::insert([
            [
                'notary_id' => 1,
                'name' => 'Lainnya',
                'address' => '-',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'provinceId' => 0,
                'districtId' => 0,
                'ahu_number' => '-',
                'sk_number' => '-',
                'certificate_training' => '-',
                'email' => '-',
                'primary_phone' => '-',
                'secondary_phone' => '-',
                'office_telephone' => '-'
            ],
            [
                'notary_id' => 2,
                'name' => 'Belum Memilih Saat Ini',
                'address' => '-',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'provinceId' => 0,
                'districtId' => 0,
                'ahu_number' => '-',
                'sk_number' => '-',
                'certificate_training' => '-',
                'email' => '-',
                'primary_phone' => '-',
                'secondary_phone' => '-',
                'office_telephone' => '-'
            ],
            [
                'notary_id' => 3,
                'name' => 'Ari Pramuja, S.Kom',
                'address' => '-',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'provinceId' => 6, // Sumatra Selatan
                'districtId' => 108, // Kab Empat Lawang
                'ahu_number' => '-',
                'sk_number' => '-',
                'certificate_training' => '-',
                'email' => 'ari@satu.kop.id',
                'primary_phone' => '-',
                'secondary_phone' => '-',
                'office_telephone' => '-'
            ],
            [
                'notary_id' => 4,
                'name' => 'Dede Zakaria, S.H., M.Kn.',
                'address' => 'Jl. Kh. Ahmad Dahlan No. 71 (D/H 6A) Kel. Petir, Kec. Cipondoh, Kota Tangerang',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'provinceId' => 12, // Jawa Barat
                'districtId' => 154, // Kab Bogor
                'ahu_number' => 'AHU-1114.AH.2.1.TAHUN 215',
                'sk_number' => 'W11.AH.2.1-183/XII/215',
                'certificate_training' => '1296/SERT-NPAK/DEP.I/VII/224224-27',
                'email' => 'ddzakaria12@gmail.com',
                'primary_phone' => '6281288017351',
                'secondary_phone' => '6281288017351',
                'office_telephone' => '(021)82495554'
            ],
            [
                'notary_id' => 5,
                'name' => 'Rasyida Thalib, S.H., M.Kn.',
                'address' => 'Jl. Aip Ks. Tubun No. 15 Kel. Pasar Batang Kec. Brebes Kab. Brebes',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'provinceId' => 12, // Jawa Barat
                'districtId' => 169, // Kab Bekasi
                'ahu_number' => 'C-37.HT.3.1-Th.27',
                'sk_number' => 'W8.HT.3.1-17/27',
                'certificate_training' => '131/SERT-NPAK/DEP.I/VII/224224-41',
                'email' => 'rastha_azatha@yahoo.com',
                'primary_phone' => '6281314561123',
                'secondary_phone' => '6285717362908',
                'office_telephone' => '(021)87901643'
            ],
            [
                'notary_id' => 6,
                'name' => 'Aviandini Hanuranti, S.H., M.Kn.',
                'address' => 'Jl. Kh. Ahmad Dahlan No. 71 (D/H 6A) Kel. Petir, Kec. Cipondoh, Kota Tangerang',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'provinceId' => 12, // Jawa Barat
                'districtId' => 154, // Kab Bogor
                'ahu_number' => 'AHU-81.AH.2.2.TAHUN 223',
                'sk_number' => 'W11.AH.2.1-15/II/217',
                'certificate_training' => '1325/SERT-NPAK/DEP.I/VII/224224-56',
                'email' => 'ahanuranti@gmail.com',
                'primary_phone' => '6282310270448',
                'secondary_phone' => '6281314561123',
                'office_telephone' => '(0251)8240762'
            ],
            [
                'notary_id' => 7,
                'name' => 'Ukon Krisnajaya, S.H., Spn.',
                'address' => 'Perum Griya Mas Matungkas Lorong Melon Block C No. 21 Desa Matungkas Kec. Dimembe',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'provinceId' => 11, // Jakarta
                'districtId' => 508, // Jakarta Selatan
                'ahu_number' => 'C-963.HT.3.2-Th.22',
                'sk_number' => '142/HKM.P/22/PN.Jak.Sel.',
                'certificate_training' => '136/SERT-NPAK/DEP.I/VII/224224-37',
                'email' => 'ukonkrisna@gmail.com',
                'primary_phone' => '6285717362908',
                'secondary_phone' => '628176634514',
                'office_telephone' => '(021)94901888'
            ],
            [
                'notary_id' => 8,
                'name' => 'Bella Ratna Syafierra, S.H., M.Kn.',
                'address' => 'Jl. Kh. Ali Hamzah No. 27, Kel. Payo Lebar, Kec. Jelutung, Kota Jambi',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'provinceId' => 12, // Jawa Barat
                'districtId' => 171, // Kota Bogor
                'ahu_number' => 'AHU-521.AH.2.1.TAHUN 223',
                'sk_number' => 'W.11.AH.2.1-1343/XI/223',
                'certificate_training' => '1312/SERT-NPAK/DEP.I/VII/224224-43',
                'email' => 'bellamuladi@gmail.com',
                'primary_phone' => '628176634514',
                'secondary_phone' => '6282310270448',
                'office_telephone' => '(021)82480748'
            ]
        ]);

        $path = base_path('npak-cleaned-utf8-new.csv');

        $data = [];

        if (!file_exists($path) || !is_readable($path)) {
            Log::info('ERROR');
        }

        if (($handle = fopen($path, 'r')) !== false) {
            $header = fgetcsv($handle, 1000, ',');

            while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                $data[] = array_combine($header, $row);
            }

            fclose($handle);
        }

        $invalidProvinces = [];
        $invalidDistricts = [];

        foreach ($data as $index => $npak) {
            $provinsi = trim($npak['Provinsi']);
            if (Str::contains($provinsi, '/')) {
                $provinsi = trim(explode('/', $provinsi)[0]);
            }
            $province = Province::where('name', $provinsi)->first();
            if ($province) {
                $kabkota = trim($npak['Tempat Kedudukan']);
                if (Str::contains($kabkota, '/')) {
                    $kabkota = trim(explode('/', $kabkota)[0]);
                }
                $district = District::where('name', $kabkota)
                    ->where('province_code', $province->code)
                    ->first();

                if ($district) {
                    try {
                        NPAK::insert([
                            'notary_id' => 7 + $index + 1,
                            'name' => $npak['Nama'],
                            'address' => $npak['Alamat Kantor'],
                            'created_at' => Carbon::now(),
                            'updated_at' => Carbon::now(),
                            'provinceId' => $province->province_id,
                            'districtId' => $district->district_id,
                            'ahu_number' => $npak['No. AHU'] != 'N/A' && $npak['No. AHU'] != '' ? $npak['No. AHU'] : '-',
                            'sk_number' => $npak['SK Pengangkatan Notaris'] != 'N/A' && $npak['SK Pengangkatan Notaris'] != '' ? $npak['SK Pengangkatan Notaris'] : '-',
                            'certificate_training' => $npak['Sertifikat Pelatihan NPAK'] != 'N/A' && $npak['Sertifikat Pelatihan NPAK'] != '' ? $npak['Sertifikat Pelatihan NPAK'] : '-',
                            'email' => $npak['Email'] != 'N/A' && $npak['Email'] != '' ? $npak['Email'] : '-',
                            'primary_phone' => $npak['No.HP-1'] != 'N/A' && $npak['No.HP-1'] != '' ? $npak['No.HP-1'] : '-',
                            'secondary_phone' => $npak['No.HP-2'] != 'N/A' && $npak['No.HP-2'] != '' ? $npak['No.HP-2'] : '-',
                            'office_telephone' => $npak['No. Kantor'] != 'N/A' && $npak['No. Kantor'] != '' ? $npak['No. Kantor'] : '-',
                        ]);
                    } catch (\Throwable $th) {
                        Log::error($th->getMessage());
                    }
                }else{
                    Log::info('INVALID DISTRICT');
                    array_push($invalidDistricts, $npak['Tempat Kedudukan']);
                    Log::info($npak['Tempat Kedudukan']);
                }
            }else{
                Log::info('INVALID PROVINCE');
                array_push($invalidProvinces, $npak['Provinsi']);
                Log::info($npak['Provinsi']);
            }
        }

        Log::info(array_unique($invalidProvinces));
        Log::info(array_unique($invalidDistricts));
    }
}
