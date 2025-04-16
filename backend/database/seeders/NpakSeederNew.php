<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class NpakSeederNew extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('npaks')->insert([
            'notary_id' => 16067,
            'name' => 'Ari Pramuja, S.Kom',
            'address' => '-',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'provinceId' => 6, // Sumatra Selatan
            'districtId' => 108, // Kab Empat Lawang
            'ahu_number' => '-',
            'sk_number' => '-',
            'certificate_training' => '-',
            'email' => 'green.pramuja@gmail.com',
            'primary_phone' => '-',
            'secondary_phone' => '-',
            'office_telephone' => '-'
        ]);
    }
}
