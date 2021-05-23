"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("./users"));

var _chatChannels = _interopRequireDefault(require("./chatChannels"));

const router = _express.default.Router();

router.use('/users', _users.default);
router.use('/chat-channels', _chatChannels.default);
router.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});
var _default = router;
exports.default = _default;