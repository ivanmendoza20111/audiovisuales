import cors from 'cors';
import express from 'express';
import path from 'path';

// enable webpack hot module replacement in development mode
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import * as errorHandler from './middlewares/errorHandler';
import joiErrorHandler from './middlewares/joiErrorHandler.js';
import routes from './routes/index.routes';

const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'), { fallthrough: true }));
app.use('/dist', express.static(path.join(__dirname, '../dist'), { fallthrough: true }));

if (process.env.NODE_ENV === 'development') {
  const webpackConfig = require('../webpack/webpack.config.dev');
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath })
  );
  app.use(webpackHotMiddleware(compiler));
}

// Router
app.use('/api', routes);

// Landing page
app.get('/(.*)/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Joi Error Handler Middleware
app.use(joiErrorHandler);

// Error Handler Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);
app.use(errorHandler.methodNotAllowed);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is listening on port ${process.env.APP_PORT}`);
});
