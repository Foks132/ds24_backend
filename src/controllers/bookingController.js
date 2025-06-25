import { getRoomsValidation } from "../utils/validation.js";
import { BookingService } from "../services/bookingService.js";

const BookingController = {
  create: async (req, res) => {
    const { error } = getRoomsValidation(req.query);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { userId, roomId, startDate, lastDate } = req.query;

    try {
      const result = await BookingService.create(
        userId,
        roomId,
        startDate,
        lastDate
      );

      return res.status(200).json(result);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  },

  decline: async (req, res) => {
    const { error } = getRoomsValidation(req.query);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { userId, roomId } = req.query;

    try {
      const result = await BookingService.decline(userId, roomId);

      return res.status(200).json({ success: result });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  },
};

export default BookingController;
