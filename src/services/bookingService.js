import { dbPrisma } from "../utils/database.js";

export const BookingService = {
  create: async (userId, roomId, startDate, lastDate) => {
    const createdAt = Math.floor(Date.now() / 1000);
    const bookmark = await dbPrisma.booking.create({
      data: {
        userId: Number(userId),
        roomId: Number(roomId),
        startDate: Number(startDate),
        lastDate: Number(lastDate),
        createdAt: createdAt,
      },
    });

    return bookmark;
  },

  decline: async (userId, roomId) => {
    const room = await dbPrisma.booking.updateMany({
      where: {
        isDeleted: false,
        userId,
        roomId,
      },
      data: {
        isDeleted: true,
      },
    });

    return !!room.count;
  },
};
