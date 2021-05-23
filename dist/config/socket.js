"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSocketIO = setupSocketIO;

var _socket = _interopRequireDefault(require("socket.io"));

var _v = _interopRequireDefault(require("uuid/v4"));

var R = _interopRequireWildcard(require("ramda"));

var _ChatChannel = require("../models/ChatChannel");

var _utils = require("../../utils");

const onConnect = R.curry((io, socket) => {
  // subscribe to chat channel
  socket.on('join channel', channelId => {
    socket.join(channelId);
  }); // unsubscribe to chat channel

  socket.on('leave channel', channelId => {
    socket.leave(channelId);
  }); // emit a chat message and save the same message to the database

  socket.on('chat message', async payload => {
    if (!(0, _utils.hasProps)(['channelId', 'user', 'message'], payload)) {
      return;
    } // send chat message to everyone in channel


    io.to(payload.channelId).emit('chat message', { ...R.dissoc('channelId', payload),
      sent: new Date().toISOString(),
      _id: (0, _v.default)()
    }); // get the chat channel and add the message

    try {
      const channel = await _ChatChannel.ChatChannel.findOne({
        _id: payload.channelId
      }).select('+messages').exec();

      if (!channel) {
        // eslint-disable-next-line no-console
        console.error("Couldn't find chat channel:", payload.channelId);
        return;
      }

      channel.messages.push(R.pick(['user', 'message'], payload));
      channel.save();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }); // emit "user is typing" message

  socket.on('start typing', payload => {
    if ((0, _utils.hasProps)(['channelId', 'username'], payload)) {
      io.to(payload.channelId).emit('start typing', payload.username);
    }
  }); // emit a message to hide "user is typing"

  socket.on('stop typing', payload => {
    if ((0, _utils.hasProps)(['channelId', 'username'], payload)) {
      io.to(payload.channelId).emit('stop typing', payload.username);
    }
  });
}); // eslint-disable-next-line import/prefer-default-export

function setupSocketIO(server) {
  const io = (0, _socket.default)(server);
  io.on('connection', onConnect(io));
}