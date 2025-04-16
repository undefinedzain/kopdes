<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Perubahan Data Notaris</title>
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
                <p style="margin: 0;">Halo <strong>{{ $npak->name }}</strong>,</p>
                <p style="margin: 8px 0 0 0;">
                  Perubahan data Notaris Pembuat Akta Koperasi Anda telah berhasil disimpan. Kami menghargai waktu dan perhatian Anda dalam memastikan informasi tetap akurat dan terkini.
                </p>
                <p style="margin: 16px 0 0 0;">
                  Jika ada data lain yang perlu diperbarui atau pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding: 24px;">
                <p style="font-size: 14px; margin: 0 0 16px 0;">
                    <strong>Selanjutnya, mohon dapat membuat akun pada sistem ini dengan menekan tombol di bawah ini:*</strong>
                  </p>                  
                <div style="text-align: center;">
                  <a href="http://merahputih.kop.id/daftar/npak/{{ $npak->notary_id }}" 
                     style="display: inline-block; background-color: #00796B; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
                    Buat Akun
                  </a>
                </div>
                <p style="font-size: 14px; margin: 20px 0 16px 0; color: #ff0000;">
                  <strong>*Abaikan jika salah satu penanggung jawab Notaris Pembuat Akta Koperasi telah memiliki akun pada platform Koperasi Desa/Kelurahan Merah Putih</strong>
                </p>                 
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
