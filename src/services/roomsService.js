import { dbPrisma } from "../utils/database.js";

export const RoomsService = {
  all: async (userId, startDate, lastDate) => {
    const rooms = await dbPrisma.room.findMany({
      where: {
        OR: [
          {
            booking: {
              some: {
                userId,
              },
            },
          },
          {
            booking:
              startDate && lastDate
                ? {
                    none: {
                      AND: [
                        {
                          startDate: {
                            lte: Number(lastDate),
                          },
                        },
                        {
                          lastDate: {
                            gte: Number(startDate),
                          },
                        },
                      ],
                    },
                  }
                : undefined,
          },
        ],
      },
    });
    return rooms;
  },
};
