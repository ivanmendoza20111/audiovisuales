const bcrypt = require('bcrypt');
import { pool } from '../db.js';
import { regExPassword } from '../shared/utils';

export const ResetPassword = async (req, res) => {
  if (!regExPassword.test(req.body.password)) {
    res.send({
      message:
        'La contraseña debe contener mínimo seis caracteres y máximo dieciséis caracteres, al menos una letra en minúscula, una en mayúscula y un número',
    });
  }

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const resetPassword = await pool
      .query('UPDATE users SET ? where id = ? AND reset_password_token = ?', [
        {
          password: req.body.password,
        },
        req.body.id,
        req.body.reset_password_token,
      ])
      .then(() => {
        res.status(201).send({
          message: 'Password change success',
        });
      })
      .catch((error) => {
        console.error('Something goes wrong:', error);
        res.status(500).send({
          message: 'Something goes wrong',
          error,
        });
      });
    console.log('password', resetPassword);
  } catch (error) {
    console.error('Something goes wrong at the final:', error);
    res.status(500).send({
      message: 'Something goes wrong',
      error,
    });
  }
};
