<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Kata Sandi</title>
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
                <p style="margin: 0;">Halo Bapak/Ibu <strong>{{ $user->name ?? 'Sobat Koperasi' }}</strong>,</p>
                <p style="margin: 8px 0 0 0;">
                  Kami menerima permintaan untuk mengatur ulang kata sandi akun Anda. Jika Anda ingin melanjutkan, silakan klik tombol di bawah ini.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding: 24px;">
                <a href="{{ $actionUrl }}" style="display: inline-block; background-color: #00796B; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
                  Atur Ulang Kata Sandi
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding: 0 24px 24px 24px; font-size: 14px;">
                <p style="margin: 0;">
                  Jika Anda tidak merasa melakukan permintaan ini, Anda dapat mengabaikan email ini dan tidak perlu melakukan tindakan apa pun.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding: 0 24px 24px 24px; font-size: 12px; color: #888;">
                <p style="margin: 0;">
                  Jika tombol di atas tidak berfungsi, salin dan tempel URL berikut ke dalam peramban Anda:
                </p>
                <p style="word-break: break-all;"><a href="{{ $actionUrl }}" style="color: #00796B;">{{ $displayableActionUrl }}</a></p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding: 16px 24px 24px 24px; font-size: 12px; color: #888;">
                Hak Cipta © {{ now()->year }}. Kementerian Koperasi Republik Indonesia
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
