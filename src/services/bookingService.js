import {dbPrisma} from '../utils/database.js';
const {NODE_HOST, NODE_PORT, APP_PROT} = process.env;

const vipServiceUrl = `${APP_PROT || 'http'}://${NODE_HOST || 'localhost'}:${NODE_PORT || 5000}/api/users`;

export const BookingService = {
	create: async (userId, roomId, startDate, lastDate) => {
		const findUser = await dbPrisma.user.findUnique({where: {id: Number(userId)}});
		if (!findUser) throw Error('This user was not found');

		const findBooking = await dbPrisma.booking.findFirst({
			where: {
				roomId: Number(roomId),
				startDate: Number(startDate),
				lastDate: Number(lastDate),
				isDeleted: false,
			},
		});
		if (findBooking) throw Error('This room is booked');

		const createdAt = Math.floor(Date.now() / 1000);
		const isVip = await userResponse(userId);
		
		const booking = await dbPrisma.booking.create({
			data: {
				userId: Number(userId),
				roomId: Number(roomId),
				startDate: Number(startDate),
				lastDate: Number(lastDate),
				createdAt: createdAt,
				isVip,
			},
		});

		return booking;
	},

	decline: async (id, userId) => {
		const findUser = await dbPrisma.user.findUnique({where: {id: Number(userId)}});
		if (!findUser) throw Error('This user was not found');

		const findBooking = await dbPrisma.booking.findFirst({
			where: {
				id: Number(id),
				userId: Number(userId),
				isDeleted: false,
			},
		});
		if (!findBooking) throw Error(`This room was not booked with this userId ${userId}`);

		const booking = await dbPrisma.booking.update({
			where: {
				id: Number(id),
				userId: Number(userId),
				isDeleted: false,
			},
			data: {
				isDeleted: true,
			},
		});

		return !!booking;
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
