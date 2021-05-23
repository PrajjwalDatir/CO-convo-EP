import request from 'supertest';
import getPort from 'get-port';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { startServer } from '../app';

describe('User route', () => {
  let app;

  beforeAll(async () => {
    const port = await getPort();
    app = startServer(port);
  });

  afterEach(() => User.deleteMany({}));

  describe('GET /api/users/', () => {
    it('should respond to get requests', async () => {
      const response = await request(app).get('/api/users');
      expect(response).toBeTruthy();
    });

    it('should get all users', async () => {
      await User.insertMany([
        {
          email: 'some@email.com',
          username: 'user1',
          password: 'password1',
        },
        {
          email: 'another@email.com',
          username: 'user2',
          password: 'password1',
        },
      ]);
      const response = await request(app).get('/api/users');
      expect(response.body.users).toHaveLength(2);
    });

    it('should not expose password for all users', async () => {
      await User({
        email: 'some@email.com',
        username: 'user1',
        password: 'password1',
      }).save();
      const response = await request(app).get('/api/users');
      expect(response.body.users[0].password).toBeUndefined();
    });

    it('should get a specific user', async () => {
      const user = await new User({
        email: 'valid@email.com',
        username: 'user1',
        password: 'password1',
      }).save();
      const response = await request(app).get(`/api/users/${user._id}`);
      expect(response.body.user).toBeTruthy();
      expect(response.body.user.email).toBe('valid@email.com');
      expect(response.body.user.username).toBe('user1');
    });

    it('should 404 when user does not exist', async () => {
      const id = mongoose.Types.ObjectId().toString();
      const response = await request(app).get(`/api/users/${id}`);
      expect(response.status).toBe(404);
    });

    it('should not expose password for single user', async () => {
      const user = await new User({
        email: 'valid@email.com',
        username: 'user1',
        password: 'password1',
      }).save();
      const response = await request(app).get(`/api/users/${user._id}`);
      expect(response.body.user.password).toBeUndefined();
    });
  });

  describe('POST /api/users/', () => {
    it('should respond to post requests', async () => {
      const response = await request(app).post('/api/users');
      expect(response).toBeTruthy();
    });

    it('should create a new user', async () => {
      await request(app)
        .post('/api/users')
        .send({
          email: 'valid@email.com',
          username: 'user1',
          password: 'password1',
        });
      const user = await User.findOne({ username: 'user1' }).exec();
      expect(user).toBeTruthy();
    });

    it("tests are isolated (database isn't modified)", async () => {
      const users = await User.find({}).exec();
      expect(users).toHaveLength(0);
    });

    it('should check if email is valid', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'notvalidemail',
          username: 'user1',
          password: 'password1',
        });
      const { errors } = response.body;
      expect(errors).toBeTruthy();
      expect(errors.email).toBeTruthy();
    });

    it('should check if username is blank', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'valid@email.com',
          username: '',
          password: 'password1',
        });
      const { errors } = response.body;
      expect(errors).toBeTruthy();
      expect(errors.username).toBeTruthy();
    });

    it('should check if password is blank', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'valid@email.com',
          username: 'user1',
          password: '',
        });
      const { errors } = response.body;
      expect(errors).toBeTruthy();
      expect(errors.password).toBeTruthy();
    });

    it('should check if password is at least 8 characters', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'valid@email.com',
          username: 'user1',
          password: '1234',
        });
      const { errors } = response.body;
      expect(errors).toBeTruthy();
      expect(errors.password).toBeTruthy();
    });

    it('should validate multiple fields', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'hi',
          username: '',
          password: '1234',
        });
      const { errors } = response.body;
      expect(errors).toBeTruthy();
      expect(Object.keys(errors)).toHaveLength(3);
    });

    it('should respond with user data', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'valid@email.com',
          username: 'user1',
          password: 'password1',
        });
      expect(response.body.user._id).toBeTruthy();
      expect(response.body.user.email).toBe('valid@email.com');
      expect(response.body.user.username).toBe('user1');
    });

    it('should not expose password', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'valid@email.com',
          username: 'user1',
          password: 'password1',
        });
      expect(response.body.user.password).toBeUndefined();
    });

    it('should not create users with same email', async () => {
      const spy = jest.spyOn(console, 'error').mockImplementation();
      const request1 = request(app)
        .post('/api/users')
        .send({
          email: 'valid@email.com',
          username: 'user1',
          password: 'password1',
        });
      const request2 = request(app)
        .post('/api/users')
        .send({
          email: 'valid@email.com',
          username: 'user2',
          password: 'password1',
        });
      await Promise.all([request1, request2]);
      const users = await User.find({ email: 'valid@email.com' }).exec();
      expect(users).toHaveLength(1);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should not create users with same username', async () => {
      const spy = jest.spyOn(console, 'error').mockImplementation();
      const request1 = request(app)
        .post('/api/users')
        .send({
          email: 'valid1@email.com',
          username: 'user1',
          password: 'password1',
        });
      const request2 = request(app)
        .post('/api/users')
        .send({
          email: 'valid2@email.com',
          username: 'user1',
          password: 'password1',
        });
      await Promise.all([request1, request2]);
      const users = await User.find({ username: 'user1' }).exec();
      expect(users).toHaveLength(1);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('POST /api/users/auth', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/users/')
        .send({
          email: 'valid@email.com',
          username: 'user',
          password: 'password1',
        });
    });

    it('should login with success', async () => {
      const response = await request(app)
        .post('/api/users/auth')
        .send({
          username: 'user',
          password: 'password1',
        });
      expect(response.status).toBe(200);
    });

    it('should login with token', async () => {
      const response = await request(app)
        .post('/api/users/auth')
        .send({
          username: 'user',
          password: 'password1',
        });
      expect(response.body.token).toBeTruthy();
    });

    it('should respond with error when receiving wrong password', async () => {
      const response = await request(app)
        .post('/api/users/auth')
        .send({
          username: 'user',
          password: 'wrongpassword',
        });
      expect(response.status).not.toBe(200);
    });

    it('should respond with error when user not found', async () => {
      const response = await request(app)
        .post('/api/users/auth')
        .send({
          username: 'doesnotexist',
          password: 'password1',
        });
      expect(response.status).not.toBe(200);
    });
  });
});
