/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import HttpStatus from 'http-status-codes';
import { regExPassword } from '../shared/utils';
import { pool } from '../db';

export function findAll(req, res) {
  pool
    .query('SELECT * FROM view_users_full_data WHERE isActive = 1 ORDER BY createdAt DESC')
    .then(([users]) =>
      res.json({
        error: false,
        data: users,
      })
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err.message,
      })
    );
}

export function findById(req, res) {
  pool
    .query('SELECT * FROM view_users_full_data WHERE userId = ?', [req.params.id])
    .then(([users]) => {
      if (users.length === 0) {
        res.status(HttpStatus.NOT_FOUND).json({
          error: true,
          data: {},
        });
      } else {
        res.json({
          error: false,
          data: users[0],
        });
      }
    })
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err.message,
      })
    );
}

export const findByRoleId = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM view_users_full_data WHERE roleId = ?', [
      req.params.id,
    ]);

    if (users.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: users,
      });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

export const store = async (req, res) => {
  try {
    const { username, roleId, name, surname, birthday, email, phone } = req.body;
    const id = uuidv4();
    const password = bcrypt.hashSync(req.body.password, 10);
    const [usernameResult] = await pool.query(
      `SELECT COUNT(*) AS total from user where username = '${username}'`
    );
    const isUserRegistered = usernameResult[0].total > 0;

    const [emailResult] = await pool.query(
      `SELECT COUNT(*) AS total from user where email = '${email}'`
    );
    const isEmailRegistered = emailResult[0].total > 0;

    if (isUserRegistered) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{ message: 'Username already exists.' }],
      });
    } else if (isEmailRegistered) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{ message: 'Email already exists.' }],
      });
    } else {
      const insert = `INSERT INTO user (id, username, password, role_id, name, surname, birthday, email, phone, active)
          VALUES ('${id}', '${username}', '${password}', '${roleId}', '${name}', '${surname}', '${birthday}','${email}','${phone}','1');`;
      const [data] = await pool.query(insert);
      res.json({ success: true, data });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { userId, username, roleId, name, surname, birthday, email, phone } = req.body;

    const [usernameResult] = await pool.query(
      `SELECT COUNT(*) AS total from user where username = '${username}' AND NOT id = '${userId}'`
    );
    const isUserRegistered = usernameResult[0].total > 0;

    const [emailResult] = await pool.query(
      `SELECT COUNT(*) AS total from user where email = '${email}' AND NOT id = '${userId}'`
    );
    const isEmailRegistered = emailResult[0].total > 0;

    if (isUserRegistered) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{ message: 'Username already exists.' }],
      });
    } else if (isEmailRegistered) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{ message: 'Email already exists.' }],
      });
    } else {
      const updateUser = `UPDATE user SET username='${username}', role_id='${roleId}', name='${name}', surname='${surname}', 
                                          birthday='${birthday}', email='${email}', phone='${phone}', updated_at=CURRENT_TIMESTAMP
                                          WHERE id = '${userId}'`;
      const [data] = await pool.query(updateUser);
      res.json({ success: true, user: data });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const updateUser = `UPDATE user SET active = 0, updated_at=CURRENT_TIMESTAMP WHERE id = '${req.params.id}'`;
    const [data] = await pool.query(updateUser);
    res.json({ success: true, user: data });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  if (!regExPassword.test(req.body.password)) {
    res.send({
      message:
        'La contraseña debe contener mínimo seis caracteres y máximo dieciséis caracteres, al menos una letra en minúscula, una en mayúscula y un número',
    });
  }

  const { oldPassword } = req.body;
  const [users] = await pool.query('SELECT * FROM user WHERE id = ?', [req.body.id]);

  if (users.length !== 0) {
    const [user] = users;
    if (bcrypt.compareSync(oldPassword, user.password)) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const resetPassword = await pool
          .query('UPDATE user SET ? where id = ?', [
            {
              password: req.body.password,
            },
            req.body.id,
          ])
          .then(() => {
            res.status(HttpStatus.CREATED).send({
              message: 'Password change success',
            });
          })
          .catch((error) => {
            console.error('Something goes wrong:', error);
            res.status(HttpStatus.CREATED).send({
              message: 'Something goes wrong',
              error,
            });
          });
        console.log('password', resetPassword);
      } catch (error) {
        console.error('Something goes wrong at the final:', error);
        res.status(HttpStatus.CREATED).send({
          message: 'Something goes wrong',
          error,
        });
      }
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication failed. Invalid password.',
      });
    }
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid username or password.',
    });
  }
};
