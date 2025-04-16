<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CooperativeType;
use Illuminate\Support\Carbon;

class CooperativeTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CooperativeType::insert([
            [
                'cooperative_type_id' => 1,
                'name' => 'Gerai Sembako (Embrio KopHub)',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'cooperative_type_id' => 2,
                'name' => 'Apotek Desa',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'cooperative_type_id' => 3,
                'name' => 'Gerai Kantor Koperasi',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'cooperative_type_id' => 4,
                'name' => 'Gerai Unit Usaha Simpan Pinjam (Embrio Kop Bank)',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'cooperative_type_id' => 5,
                'name' => 'Gerai Klinik Desa',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'cooperative_type_id' => 6,
                'name' => 'Gerai Cold Storage/Cold Chain',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'cooperative_type_id' => 7,
                'name' => 'Logistik (Distribusi)',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}
