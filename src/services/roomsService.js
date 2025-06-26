import {dbPrisma} from '../utils/database.js';

export const RoomsService = {
	all: async (startDate, lastDate) => {
		const where = {};

		if (startDate && lastDate) {
			where.booking = {
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
						{
							isDeleted: false,
						},
					],
				},
			};
		}

		const rooms = await dbPrisma.room.findMany({
			where,
			include: {
				booking: {
					select: {
						id: true,
						isVip: true,
						userId: true,
						startDate: true,
						lastDate: true,
						isDeleted: true,
					},
				},
			},
			orderBy: {
				id: 'asc',
			},
		});

		return rooms;
	},

	getByUserId: async userId => {
		const rooms = await dbPrisma.room.findMany({
			where: {
				booking: {
					some: {
						userId: Number(userId),
						isDeleted: false,
					},
				},
			},
			include: {
				booking: {
					select: {
						id: true,
						isVip: true,
						userId: true,
						startDate: true,
						lastDate: true,
						isDeleted: true,
					},
				},
			},
		});

		return rooms;
	},
};
