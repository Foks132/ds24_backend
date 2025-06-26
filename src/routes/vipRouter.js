import express from 'express';
import VipController from '../controllers/vipController.js';

const roomsRouter = express.Router();

roomsRouter.get('/:userId', VipController.isVip);

export default roomsRouter;
