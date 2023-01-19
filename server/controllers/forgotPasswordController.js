import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';
import { pool } from '../db.js';
require('dotenv').config();
const nodemailer = require('nodemailer');

export const ForgotPassword = async (req, res) => {
  let userId = '';
  let userEmail = '';
  let userToken = '';
  if (req.body.email === '') {
    res.status(400).send({
      message: 'The email is required',
    });
  }

  try {
    const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [req.body.email]);
    userId = result[0].id;
    userEmail = result[0].email;
    if (result.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    }

    const token = jwt.sign({ id: result.id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 30 * 60,
    });
    userToken = token;
    await pool
      .query('UPDATE users SET ? where email = ?', [
        {
          reset_password_token: token,
        },
        req.body.email,
      ])
      .catch((err) =>
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: true,
          data: { message: err.message },
        })
      );
  } catch (error) {
    res.status(500).send({
      message: error.message,
      error,
    });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GM_EMAIL,
      pass: process.env.GM_PASSWORD,
    },
  });
  const HOST = process.env.APP_HOST || 'localhost';
  const PORT = process.env.APP_PORT || 3000;
  const emailPort = PORT === 80 ? `http://${HOST}` : `http://${HOST}:${PORT}`;
  const mailOptions = {
    from: process.env.GM_EMAIL,
    to: `${userEmail}`,
    subject: 'Enlace para recuperrar contraseña de Caribbean Cinemas',
    text: `${emailPort}/ReiniciarContraseña?id=${userId}&token=${userToken}`,
  };

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error('Something goes wrong:', err);
    } else {
      console.log('Response:', response);
      res.status(200).json('The email for recovery has been send');
    }
  });
};
