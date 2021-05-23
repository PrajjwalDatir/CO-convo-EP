"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupServer = setupServer;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _helmet = _interopRequireDefault(require("helmet"));

var _passport = _interopRequireDefault(require("passport"));

var _connectHistoryApiFallback = _interopRequireDefault(require("connect-history-api-fallback"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpack2 = _interopRequireDefault(require("../webpack.dev"));

var _passport2 = _interopRequireDefault(require("./config/passport"));

var _socket = require("./config/socket");

var _routes = _interopRequireDefault(require("./routes"));

require("./config/mongoDB");

/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
const app = (0, _express.default)(); // running express behind a proxy

if (process.env.RUNNING_PROXY) {
  app.enable('trust proxy');
} // parse requests with json


app.use(_express.default.json()); // change http headers for security

app.use((0, _helmet.default)()); // use passport for login sessions. setup passport middleware and use
// authentication with JWT.
// from the passport docs:
// http://www.passportjs.org/docs/configure/

app.use(_passport.default.initialize());
(0, _passport2.default)(); // setup api endpoints for the client to talk to

app.use('/api', _routes.default); // play nicely with html history api (react router) by serving
// index.html for unhandled routes.
// https://github.com/bripkens/connect-history-api-fallback#usage

app.use((0, _connectHistoryApiFallback.default)()); // serve the front-end application. expose the public folder when in
// production, or use webpack when in development

switch (process.env.NODE_ENV) {
  case 'production':
    app.use(_express.default.static(_path.default.join(__dirname, '../public')));
    break;

  case 'test':
    break;

  default:
    {
      const compiler = (0, _webpack.default)(_webpack2.default); // webpack-dev-middleware usage from
      // https://github.com/webpack/webpack-dev-middleware#usage

      app.use((0, _webpackDevMiddleware.default)(compiler, {
        publicPath: _webpack2.default.output.publicPath,
        stats: 'minimal'
      })); // webpack hot middleware from
      // https://github.com/webpack-contrib/webpack-hot-middleware#installation--usage

      app.use((0, _webpackHotMiddleware.default)(compiler));
      break;
    }
} // no favicon to serve


app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
}); // catch all error handler

app.use((error, req, res, next) => {
  if (!error) {
    next();
    return;
  }

  res.status(500).json({
    message: 'Internal server error'
  });
  console.error('Internal server error:', error);
}); // eslint-disable-next-line import/prefer-default-export

function setupServer(callback) {
  function useMiddleware(server) {
    (0, _socket.setupSocketIO)(server);
  }

  callback(app, useMiddleware);
}