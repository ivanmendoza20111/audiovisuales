import moment from 'moment';
import nodemailer from 'nodemailer';

const newLineToBr = (str) => {
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
};

const getEmailHtml = (content) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Universidad Tecnológica de Santiago ~ UTESA</title>
      </head>
      <body style="font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        ${newLineToBr(content)}   
        <br>
        <footer>
            © Universidad Tecnológica de Santiago ~ UTESA, ${new Date().getFullYear()}.
        </footer>
      </body>
    </html>
    `;
};

export const EMAIL = process.env.GM_EMAIL;

export const transporter = nodemailer.createTransport(
  {
    service: 'Gmail',
    auth: {
      user: EMAIL,
      pass: process.env.GM_PASSWORD,
    },
  },
  {
    from: `Universidad Tecnológica de Santiago ~ UTESA <${EMAIL}>`,
  }
);

export const generateEmailTemplate = (data) => {
  const { userName, startHour, endHour, equipment, classroom, subject, career } = data;
  const date = moment(startHour).locale('es').format('ll');
  const startHourParsed = moment(startHour).locale('es').format('hh:mm:ss a');
  const endHourParsed = moment(endHour).locale('es').format('hh:mm:ss a');
  const listOfEquipment = Object.keys(equipment).join(', ');

  return getEmailHtml(`
    <b>Hola <strong>${userName}</strong>,</b>
    🎉 Tu reservación ha sido completada!. Los detalles pueden ser encontrados abajo.
    
    <strong>DETALLES DE LA RESERVACIÓN</strong>:

    Haz reservado los siguientes equipos: <b>${listOfEquipment}</b>
    
    Fecha:  <strong>${date}</strong>
    Hora Inicial: <strong>${startHourParsed}</strong>
    Hora final: <strong>${endHourParsed}</strong>
    Aula: <strong>${classroom}</strong>
    Asignatura: <strong>${subject}</strong>
    Carrera: <strong>${career}</strong>
  `);
};

export const sendEmail = async (data) => {
  try {
    const { userName, email } = data;
    const mailOptions = {
      to: email,
      subject: `Detalles de orden de ${userName}`,
      html: generateEmailTemplate(data),
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};
