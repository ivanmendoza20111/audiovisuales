/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';
import { pool } from '../db';

export const findAll = async (req, res) => {
  try {
    const [role] = await pool.query('SELECT id "value", role "label" FROM role');

    res.json({
      error: false,
      data: role,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};
