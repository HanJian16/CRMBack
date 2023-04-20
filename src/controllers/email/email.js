const nodemailer = require("nodemailer");
const createTrans = () => {
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true, // true for 465, false for other ports
  //   auth: {
  //     user: "frankcito639@gmail.com", // generated ethereal user
  //     pass: "fnmuboojokaxxgkl", // generated ethereal password
  //   },
  // });
  const transporter = nodemailer.createTransport({
    service: "Gmail", // true for 465, false for other ports
    auth: {
      user: "jhohanjianpierre@gmail.com",
      pass: "ifhpwgudrixwaxxw",
    },
  });
  return transporter;
};
const sendMail = async (user) => {
  const transporter = createTrans();
  const info = await transporter.sendMail({
    from: '"CRM" <jhohanjianpierre@gmail.com>',
    to: `${user.email}`,
    subject: `Bienvenido a CRM ${user.name}`, // Subject line
    text: "Gracias por preferirnos!", // plain text body
    html: `<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <title></title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        table, td, div, h1, p {font-family: Arial, sans-serif;}
      </style>
    </head>

  <body style="margin:0;padding:0;"><table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
  <tr>
    <td align="center" style="padding:0;">

      <table role="presentation" style="width:602px;height=400px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">

      
      <tr>
      <div style="position: relative; display:flex; justify-content: center; align-items: center; width: 100% ; height: 200px; background:#fff ">
        <img src="https://i.ibb.co/gdmyqMK/logo-Front.png" alt="logo" style="width:50%; height: 80%"/>
      </div>
      </tr>

      <tr>
      <td style="padding:0 0 36px 0;color:#153643;width:100%">
        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;margin-top:15px; margin-bottom:15px;"><b>Muchas gracias por registrarse en CRM!!</b>. Bienvenid@ a nuestra pagina ${user.name}.</h1>
        <p style="margin:0 0 12px 0;font-size:18px;line-height:24px;font-family:Arial,sans-serif;">Esperamos que disrute de nuestro servicio, si desea contactarnos puede enviar un mail a: pfcrm23@gmail.com</p>
        <a href="https://crm-henry-34b.vercel.app/authentication" style="color:#11F930;text-decoration:none;"><div style="width:80%; display:flex; justify-content:center;align-items:center;height:50px;background:#00002d; color:white; font-weight:bold; font-size:18px; margin:auto"><h3>Link de Verificación</h3></div></a>
      </td>
    </tr>

    <hr>       
          <td style="padding:30px;background:#00002d;width:100%">
            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
              <tr>
                <td style="padding:0;width:50%;" align="left">
                  <p style="margin:0;font-size:18px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff; font-weight: bold">Desarrollo CRM - Argentina 2023</p>
                </td>
                <td style="padding:0;width:50%;" align="right">
                  <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="padding-right: 30px;width:38px; display: flex;">
                      <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://assets.stickpng.com/images/5a2fe3efcc45e43754640848.png" alt="Twitter" width="38" style="height:38px;display:block;border:0;  padding-right: 10px;" /></a>
                        <a href="http://www.linkedin.com/" style="color: white;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="Linkedin" width="38" style="height:38px;display:block;border:0;" /></a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        
      </table>

    </td>
  </tr>
</table>
</body>

</html>`, // html body
  });
  console.log("Message sent: %s", info.messageId);
  return;
};

exports.sendMail = (user) => sendMail(user);
