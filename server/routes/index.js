import express from 'express';
import usersRoute from './users';
import channelsRoute from './chatChannels';

const router = express.Router();

router.use('/users', usersRoute);
router.use('/chat-channels', channelsRoute);

router.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default router;
