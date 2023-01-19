/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';
import HttpStatus from 'http-status-codes';

import { pool } from '../db';
import { generateSchedule } from '../utils/generateSchedule';

export const findAll = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM schedule ORDER BY created_at ASC');
    res.json({
      error: false,
      data: result,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const findAllFullInformation = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM view_schedule_full_information ORDER BY created_at ASC'
    );
    const schedule = generateSchedule(result);
    res.json({
      error: false,
      data: schedule,
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const findById = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM schedule WHERE id = ?', [req.params.id]);
    if (result.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: result[0],
      });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const store = async (req, res) => {
  try {
    const { startDate, endDate, movie_id, room_id } = req.body;
    const id = uuidv4();
    const insert = `INSERT INTO schedule (id, start_date, end_date, movie_id, room_id)
    VALUES ('${id}', '${startDate}', '${endDate}', '${movie_id}', '${room_id}');`;

    const [data] = await pool.query(insert);

    res.json({
      success: true,
      data,
      id: id.slice(0, 15),
      insert,
    });

    // TODO: Handle invalid Schedule
    // res.status(HttpStatus.BAD_REQUEST).json({
    //     details: [{ message: 'Invalid Schedule.' }],
    //   });
    // }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const [result] = await pool.query('UPDATE schedule SET ? where id = ?', [
      {
        movie_id: req.body.movie_id,
        room_id: req.body.room_id,
        start_date: req.body.startDate,
        end_date: req.body.endDate,
      },
      req.params.id,
    ]);
    res.json({
      error: false,
      data: result,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    await pool.query(`DELETE FROM schedule WHERE id = '${req.params.id}';`);
    res.json({
      error: false,
      data: { message: 'Schedule deleted successfully.' },
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
