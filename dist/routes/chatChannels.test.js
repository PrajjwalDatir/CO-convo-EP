"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _supertest = _interopRequireDefault(require("supertest"));

var _getPort = _interopRequireDefault(require("get-port"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _ChatChannel = require("../models/ChatChannel");

var _User = require("../models/User");

var _app = require("../app");

describe('ChatChannel route', () => {
  let app;
  beforeAll(async () => {
    const port = await (0, _getPort.default)();
    app = await (0, _app.startServer)(port);
  });
  afterEach(async () => {
    await Promise.all([_ChatChannel.ChatChannel.deleteMany({}), _User.User.deleteMany({})]);
  });
  describe('GET /api/chat-channels/', () => {
    it('should get all channels', async () => {
      await _ChatChannel.ChatChannel.insertMany([{
        name: 'general',
        owner: _mongoose.default.Types.ObjectId()
      }, {
        name: 'random',
        owner: _mongoose.default.Types.ObjectId()
      }]);
      const response = await (0, _supertest.default)(app).get('/api/chat-channels');
      expect(response.body.chatChannels).toHaveLength(2);
    });
    it('should get a specific channel', async () => {
      const owner = _mongoose.default.Types.ObjectId().toString();

      const channel = await new _ChatChannel.ChatChannel({
        name: 'general',
        owner
      }).save();
      const response = await (0, _supertest.default)(app).get(`/api/chat-channels/${channel._id}`);
      expect(response.body.chatChannel).toBeTruthy();
      expect(response.body.chatChannel.name).toBe('general');
      expect(response.body.chatChannel.owner).toBe(owner);
    });
    it('should 404 when channel does not exist', async () => {
      const id = _mongoose.default.Types.ObjectId().toString();

      const response = await (0, _supertest.default)(app).get(`/api/chat-channels/${id}`);
      expect(response.status).toBe(404);
    });
  });
  describe('POST /api/chat-channels/', () => {
    it('should not create a new channel without auth token', async () => {
      const response = await (0, _supertest.default)(app).post(`/api/chat-channels`).send({
        name: 'general'
      });
      expect(response.error).toBeTruthy();
    });
    it('should respond with 401 without auth token', async () => {
      const response = await (0, _supertest.default)(app).post(`/api/chat-channels`).send({
        name: 'general'
      });
      expect(response.status).toBe(401);
    });
    it('should create a new channel', async () => {
      const user = await (0, _User.User)({
        email: 'some@email.com',
        username: 'user1',
        password: 'password1'
      }).save();

      const token = _jsonwebtoken.default.sign({
        id: user._id
      }, process.env.JWT_SECRET);

      await (0, _supertest.default)(app).post(`/api/chat-channels`).set('Authorization', `Bearer ${token}`).send({
        name: 'general'
      });
      const channel = await _ChatChannel.ChatChannel.findOne({
        name: 'general'
      }).exec();
      expect(channel).toBeTruthy();
    });
  });
});