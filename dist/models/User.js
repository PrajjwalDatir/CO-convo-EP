"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.UserSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const {
  Schema
} = _mongoose.default;
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});
exports.UserSchema = UserSchema;

const User = _mongoose.default.model('User', UserSchema);

exports.User = User;