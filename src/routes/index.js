import express from 'express';
import roomsRouter from './roomsRouter.js';
import bookingRouter from './bookingRouter.js';
import vipRouter from './vipRouter.js';

export const apiRouter = express.Router();

apiRouter.use('/booking', bookingRouter);
apiRouter.use('/rooms', roomsRouter);
apiRouter.use('/users', vipRouter);
