export const APP_HOST = process.env.APP_HOST || 'localhost';
export const APP_PORT = process.env.APP_PORT || 3000;

export const HOST =
  APP_PORT === 80 || process.env.NODE_ENV === 'production'
    ? `http://${APP_HOST}`
    : `http://${APP_HOST}:${APP_PORT}`;

export const regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,16}$/;
