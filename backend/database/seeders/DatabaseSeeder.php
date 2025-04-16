<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ProvinceSeeder::class,
            DistrictSeeder::class,
            SubdistrictSeeder::class,
            CooperativeTypeSeeder::class,
            KLUSeeder::class,
            NPAKSeeder::class,
            LegalStageSeeder::class,
            RoleSeeder::class,
            RolePositionSeeder::class
        ]);
    }
}
