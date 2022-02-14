const nodemailer = require('nodemailer'); // email sender function 

const sendAdsToContact = (req, res) => {
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ele.caudete@gmail.com',
            pass: 'c707f7f54e0c89B'
        }
    });
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const mailOptions = {
        from: 'Eleazar',
        to: 'ele.caudete@gmail.com',
        subject: 'Prueba de nodemailer',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <!--<![endif]-->
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="format-detection" content="telephone=no">
          <meta name="x-apple-disable-message-reformatting">
          <title></title>
          <style type="text/css">
            @media screen {
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 300;
                src: local(''),
                url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruRA.woff2') format('woff2'),
                url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruQg.woff') format('woff');
              }
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 400;
                src: local(''),
                url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VflQ.woff2') format('woff2'),
                url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vfkw.woff') format('woff');
              }
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 500;
                src: local(''),
                url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuRA.woff2') format('woff2'),
                url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuQg.woff') format('woff');
              }
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 700;
                src: local(''),
                url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uRA.woff2') format('woff2'),
                url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uQg.woff') format('woff');
              }
              @font-face {
                font-family: 'Fira Sans';
                font-style: normal;
                font-weight: 800;
                src: local(''),
                url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uRA.woff2') format('woff2'),
                url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uQg.woff') format('woff');
              }
            }
          </style>
          <style type="text/css">
            #outlook a {
              padding: 0;
            }
        
            .ReadMsgBody,
            .ExternalClass {
              width: 100%;
            }
        
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass td,
            .ExternalClass div,
            .ExternalClass span,
            .ExternalClass font {
              line-height: 100%;
            }
        
            div[style*="margin: 14px 0"],
            div[style*="margin: 16px 0"] {
              margin: 0 !important;
            }
        
            table,
            td {
              mso-table-lspace: 0;
              mso-table-rspace: 0;
            }
        
            table,
            tr,
            td {
              border-collapse: collapse;
            }
        
            body,
            td,
            th,
            p,
            div,
            li,
            a,
            span {
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              mso-line-height-rule: exactly;
            }
        
            img {
              border: 0;
              outline: none;
              line-height: 100%;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
        
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
            }
        
            body {
              margin: 0;
              padding: 0;
              width: 100% !important;
              -webkit-font-smoothing: antialiased;
            }
        
            .pc-gmail-fix {
              display: none;
              display: none !important;
            }
        
            @media screen and (min-width: 621px) {
              .pc-email-container {
                width: 620px !important;
              }
            }
          </style>
          <style type="text/css">
            @media screen and (max-width:620px) {
              .pc-sm-mw-100pc {
                max-width: 100% !important
              }
              .pc-sm-p-25-10-15 {
                padding: 25px 10px 15px !important
              }
            }
          </style>
          <style type="text/css">
            @media screen and (max-width:525px) {
              .pc-xs-w-100pc {
                width: 100% !important
              }
              .pc-xs-p-10-0-0 {
                padding: 10px 0 0 !important
              }
              .pc-xs-p-15-0-5 {
                padding: 15px 0 5px !important
              }
              .pc-xs-br-disabled br {
                display: none !important
              }
            }
          </style>
          <!--[if mso]>
            <style type="text/css">
                .pc-fb-font {
                    font-family: Helvetica, Arial, sans-serif !important;
                }
            </style>
            <![endif]-->
          <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
        </head>
        <body style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4" class="">
          <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">This is preheader text. Some clients will show this text as a preview.</div>
          <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px;">
            ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
          </div>
          <table class="pc-email-body" width="100%" bgcolor="#f4f4f4" border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed;">
            <tbody>
              <tr>
                <td class="pc-email-body-inner" align="center" valign="top">
                  <!--[if gte mso 9]>
                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                        <v:fill type="tile" src="" color="#f4f4f4"/>
                    </v:background>
                    <![endif]-->
                  <!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
                  <table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto; max-width: 620px;">
                    <tbody>
                      <tr>
                        <td align="left" valign="top" style="padding: 0 10px;">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody>
                              <tr>
                                <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                          <!-- BEGIN MODULE: Content 2 -->
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-25-10-15 pc-xs-p-15-0-5" valign="top" bgcolor="#ffffff" style="padding: 30px 20px 20px; background-color: #ffffff; border-radius: 8px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td valign="top" style="padding: 0 20px;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                            <tbody>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td class="pc-fb-font" valign="top" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; padding: 10px 20px 0; line-height: 28px; font-size: 18px; font-weight: 300; letter-spacing: -0.2px; color: #9B9B9B;">
                                          ${req.body.message}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td height="4" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td style="font-size: 0;" valign="top">
                                          <!--[if (gte mso 9)|(IE)]><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="50%" valign="top"><![endif]-->
                                          <div class="pc-sm-mw-100pc" style="display: inline-block; width: 100%; max-width: 280px; vertical-align: top;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                              <tbody>
                                                <tr>
                                                  <td style="padding: 20px;" valign="top">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                      <tbody>
                                                        <tr>
                                                          <td valign="middle">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                              <tbody>
                                                                <tr>
                                                                  <td class="pc-fb-font" style="line-height: 24px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; letter-spacing: -0.1px; color: #1B1B1B;" valign="top">
                                                                    <a href="http://example.com" style="text-decoration: none; color: #1B1B1B;">The Best Audio Player</a>
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td height="4" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                                </tr>
                                                              </tbody>
                                                              <tbody>
                                                                <tr>
                                                                  <td class="pc-fb-font" style="line-height: 20px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; letter-spacing: -0.2px; color: #9B9B9B;" valign="top">
                                                                    <a href="http://example.com" style="text-decoration: none; color: #9B9B9B;">We move through projects in a goal-oriented way.</a>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                          <td width="60" valign="middle" style="padding: 6px 10px 0 0;">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="60" role="presentation">
                                                              <tbody>
                                                                <tr>
                                                                  <td valign="top">
                                                                    <a href="http://example.com" style="text-decoration: none;"><img src="images/content-2-image-4.jpg" width="60" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; border-radius: 6px; display: block;"></a>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                          <!--[if (gte mso 9)|(IE)]></td><td width="50%" valign="top"><![endif]-->
                                          <div class="pc-sm-mw-100pc" style="display: inline-block; width: 100%; max-width: 280px; vertical-align: top;"></div>
                                          <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!-- END MODULE: Content 2 -->
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody>
                              <tr>
                                <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Fix for Gmail on iOS -->
          <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
        </body>
        </html>`
    };

    // console.log(mailOptions)
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         res.status(500).send(error.message);
    //     } else {
    //         res.status(200).json(req.body);
    //     }
    // });
}

const sendAdToContacts = (req, res) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'equipo@attomo.digital',
            pass: '@@Google-Attomo'
        }
    });
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const mailOptions = {
        from: 'Eleazar',
        to: 'ele.caudete@gmail.com',
        subject: 'Prueba de nodemailer',
        text: 'Mensaje de prueba de nodemailer'
    };

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         res.status(500).send(error.message);
    //     } else {
    //         res.status(200).json(req.body);
    //     }
    // });
}

module.exports = { sendAdsToContact, sendAdToContacts }