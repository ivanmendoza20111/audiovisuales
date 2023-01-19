import { createPool } from 'mysql2/promise';
require('dotenv').config();

export const pool = createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
