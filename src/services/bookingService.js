import {dbPrisma} from '../utils/database.js';
const {NODE_HOST, NODE_PORT, APP_PROT} = process.env;

const vipServiceUrl = `${APP_PROT || 'http'}://${NODE_HOST || 'localhost'}:${NODE_PORT || 5000}/api/users`;

export const BookingService = {
	create: async (userId, roomId, startDate, lastDate) => {
		const findUser = await dbPrisma.user.findUnique({
			where: {id: Number(userId)},
		});
		if (!findUser) throw new Error('This user was not found');

		const createdAt = Math.floor(Date.now() / 1000);
		const isVip = await userResponse(userId);

		const booking = await dbPrisma.$transaction(async prisma => {
			const findBooking = await prisma.booking.findFirst({
				where: {
					roomId: Number(roomId),
					isDeleted: false,
					startDate: {lte: Number(lastDate)},
					lastDate: {gte: Number(startDate)},
				},
			});
			if (findBooking) {
				throw new Error('This room is already booked for this period');
			}

			const newBooking = await prisma.booking.create({
				data: {
					userId: Number(userId),
					roomId: Number(roomId),
					startDate: Number(startDate),
					lastDate: Number(lastDate),
					createdAt,
					isVip,
				},
			});

			return newBooking;
		});

		return booking;
	},

	decline: async (id, userId) => {
		const findUser = await dbPrisma.user.findUnique({
			where: {id: Number(userId)},
		});
		if (!findUser) throw new Error('This user was not found');

		const updatedBooking = await dbPrisma.$transaction(async prisma => {
			const findBooking = await prisma.booking.findFirst({
				where: {
					id: Number(id),
					userId: Number(userId),
					isDeleted: false,
				},
			});

			if (!findBooking) {
				throw new Error(`This room was not booked with this userId ${userId}`);
			}

			const deletedBooking = await prisma.booking.update({
				where: {
					id: Number(id),
				},
				data: {
					isDeleted: true,
				},
			});

			return deletedBooking;
		});

		return !!updatedBooking;
	},
};

const userResponse = async userId => {
	const response = await fetch(`${vipServiceUrl}/${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch VIP info, status: ${response.status}`);
	}

	const userData = await response.json();

	return userData.isVip === true;
};
