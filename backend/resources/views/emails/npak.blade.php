<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Pengajuan Koperasi</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
      <tr>
        <td>
          <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <tr>
              <td align="center" style="padding: 24px 0 16px 0;">
                <img src="https://merahputih.kop.id/images/logo.png" alt="Logo" style="max-height: 60px;" />
              </td>
            </tr>
            <tr>
              <td style="padding: 0 24px 8px 24px; font-size: 14px;">
                <p style="margin: 0;">Halo <strong>{{ $data['npak']->name }}</strong>,</p>
                <p style="margin: 8px 0 0 0;">Terdapat pengajuan self-declare Koperasi Desa/Kelurahan Merah Putih, dengan informasi dan data berikut:</p>
              </td>
            </tr>

            <tr>
              <td style="padding: 16px 24px 0 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 6px; background-color: #fafafa; padding: 16px;">
                  <tr>
                    <td style="font-size: 14px; padding: 16px;">
                        <p style="margin: 0 0 8px 0;"><strong>Provinsi:</strong> {{ $data['provinsi'] ?? '-' }}</p>
                        <p style="margin: 0 0 8px 0;"><strong>Kab/Kota:</strong> {{ $data['kabupaten'] ?? '-' }}</p>
                        <p style="margin: 0 0 8px 0;"><strong>Kecamatan:</strong> {{ $data['kecamatan'] ?? '-' }}</p>
                        <p style="margin: 0 0 8px 0;"><strong>Desa/Kel:</strong> {{ $data['desa'] ?? '-' }}</p>
                        <p style="margin: 0 0 8px 0;"><strong>Nama Koperasi:</strong> {{ $data['nama_koperasi'] ?? '-' }}</p>
                        <p style="margin: 0 0 8px 0;"><strong>Nama Notaris:</strong> {{ $data['npak']->name ?? '-' }}</p>
                        <p style="margin: 0 0 8px 0;"><strong>Jenis Usaha Koperasi:</strong></p>
                        @foreach ($data['klus'] as $klu)
                        <p style="margin: 0 0 8px 0;"><strong>{{ $loop->iteration }}.</strong> {{ $klu->cooperative_type_name }} - ({{ $klu->code }}) {{ $klu->klu_name }}</p>
                        @endforeach
                        <p style="margin: 0 0 8px 0;"><strong>Subdomain:</strong> {{ $data['subdomain'] ?? '-' }}</p>
                        <p style="margin: 0 0 16px 0;"><strong>Email:</strong> {{ $data['email_koperasi'] ?? '-' }}</p>
                        <p style="margin: 0 0 8px 0;"><strong>Telepon:</strong> {{ $data['telepon_koperasi'] ?? '-' }}</p>

                        <hr style="border: none; border-top: 1px solid #ccc; margin: 16px 0;" />

                        <p style="margin: 0 0 8px 0;"><strong>Kuasa Penghadap Notaris:</strong> {{ $data['pj_nama'] ?? '-' }}</p>
                        <p style="margin: 0 0 8px 0;"><strong>NIK:</strong> {{ $data['nik'] ?? '-' }}</p>
                        <p style="margin: 0 0 8px 0;"><strong>Email:</strong> {{ $data['pj_email'] ?? '-' }}</p>
                        <p style="margin: 0;"><strong>Telepon:</strong> {{ $data['pj_telepon'] ?? '-' }}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding: 24px; font-size: 14px;">
                <p style="margin: 16px 0 0 0; font-weight: bold;">
                  Dengan menekan tombol di bawah ini, Anda menyatakan telah membaca, memahami, dan memproses permohonan aplikasi pada SABH Kemenkum.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding: 0 24px 24px 24px;">
                <a href="https://merahputih.kop.id/npak/proses-permohonan/{{ $data['cooperative_id'] }}/{{ $data['token'] }}" style="display: inline-block; background-color: #00796B; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
                  Masuk dan Proses
                </a>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding: 16px 24px 24px 24px; font-size: 12px; color: #888;">
                Hakcipta © 2025. Kementerian Koperasi Republik Indonesia
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
