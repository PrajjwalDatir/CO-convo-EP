/* eslint-disable no-console */

import express from 'express';
import path from 'path';
import helmet from 'helmet';
import passport from 'passport';
import history from 'connect-history-api-fallback';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackHotMiddleware from 'webpack-hot-middleware';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.dev';
import useJWTStrategy from './config/passport';
import { setupSocketIO } from './config/socket';
import router from './routes';
import './config/mongoDB';

const app = express();

// running express behind a proxy
if (process.env.RUNNING_PROXY) {
  app.enable('trust proxy');
}

// parse requests with json
app.use(express.json());

// change http headers for security
app.use(helmet());

// use passport for login sessions. setup passport middleware and use
// authentication with JWT.

// from the passport docs:
// http://www.passportjs.org/docs/configure/
app.use(passport.initialize());
useJWTStrategy();

// setup api endpoints for the client to talk to
app.use('/api', router);

// play nicely with html history api (react router) by serving
// index.html for unhandled routes.
// https://github.com/bripkens/connect-history-api-fallback#usage
app.use(history());

// serve the front-end application. expose the public folder when in
// production, or use webpack when in development
switch (process.env.NODE_ENV) {
  case 'production':
    app.use(express.static(path.join(__dirname, '../public')));
    break;
  case 'test':
    break;
  default: {
    const compiler = webpack(webpackConfig);
    // webpack-dev-middleware usage from
    // https://github.com/webpack/webpack-dev-middleware#usage
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: 'minimal',
      }),
    );
    // webpack hot middleware from
    // https://github.com/webpack-contrib/webpack-hot-middleware#installation--usage
    app.use(webpackHotMiddleware(compiler));
    break;
  }
}

// no favicon to serve
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

// catch all error handler
app.use((error, req, res, next) => {
  if (!error) {
    next();
    return;
  }

  res.status(500).json({ message: 'Internal server error' });
  console.error('Internal server error:', error);
});

// eslint-disable-next-line import/prefer-default-export
export function setupServer(callback) {
  function useMiddleware(server) {
    setupSocketIO(server);
  }

  callback(app, useMiddleware);
}
