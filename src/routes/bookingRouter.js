import express from "express";
import BookingController from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", BookingController.create);
bookingRouter.post("/decline", BookingController.decline);

export default bookingRouter;
