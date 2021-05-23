"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = _interopRequireDefault(require("passport-jwt"));

var _User = require("../models/User");

const {
  Strategy: JwtStrategy,
  ExtractJwt
} = _passportJwt.default; // example config taken from:
// http://www.passportjs.org/packages/passport-jwt/

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

function useJWTStrategy() {
  _passport.default.use(new JwtStrategy(options, (jwtPayload, done) => _User.User.findOne({
    _id: jwtPayload.id
  }).select('-password').exec().then(user => done(null, user || false)).catch(err => done(err, false))));
}

var _default = useJWTStrategy;
exports.default = _default;