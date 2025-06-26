import express from 'express';
import RoomsController from '../controllers/roomsController.js';

const roomsRouter = express.Router();

roomsRouter.get('/', RoomsController.all);
roomsRouter.get('/:userId', RoomsController.getByUserId);

export default roomsRouter;
