import request from 'supertest';
import getPort from 'get-port';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { ChatChannel } from '../models/ChatChannel';
import { User } from '../models/User';
import { startServer } from '../app';

describe('ChatChannel route', () => {
  let app;

  beforeAll(async () => {
    const port = await getPort();
    app = await startServer(port);
  });

  afterEach(async () => {
    await Promise.all([ChatChannel.deleteMany({}), User.deleteMany({})]);
  });

  describe('GET /api/chat-channels/', () => {
    it('should get all channels', async () => {
      await ChatChannel.insertMany([
        {
          name: 'general',
          owner: mongoose.Types.ObjectId(),
        },
        {
          name: 'random',
          owner: mongoose.Types.ObjectId(),
        },
      ]);
      const response = await request(app).get('/api/chat-channels');
      expect(response.body.chatChannels).toHaveLength(2);
    });

    it('should get a specific channel', async () => {
      const owner = mongoose.Types.ObjectId().toString();
      const channel = await new ChatChannel({
        name: 'general',
        owner,
      }).save();

      const response = await request(app).get(
        `/api/chat-channels/${channel._id}`,
      );

      expect(response.body.chatChannel).toBeTruthy();
      expect(response.body.chatChannel.name).toBe('general');
      expect(response.body.chatChannel.owner).toBe(owner);
    });

    it('should 404 when channel does not exist', async () => {
      const id = mongoose.Types.ObjectId().toString();
      const response = await request(app).get(`/api/chat-channels/${id}`);
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/chat-channels/', () => {
    it('should not create a new channel without auth token', async () => {
      const response = await request(app)
        .post(`/api/chat-channels`)
        .send({ name: 'general' });
      expect(response.error).toBeTruthy();
    });

    it('should respond with 401 without auth token', async () => {
      const response = await request(app)
        .post(`/api/chat-channels`)
        .send({ name: 'general' });
      expect(response.status).toBe(401);
    });

    it('should create a new channel', async () => {
      const user = await User({
        email: 'some@email.com',
        username: 'user1',
        password: 'password1',
      }).save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      await request(app)
        .post(`/api/chat-channels`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'general' });

      const channel = await ChatChannel.findOne({ name: 'general' }).exec();
      expect(channel).toBeTruthy();
    });
  });
});
