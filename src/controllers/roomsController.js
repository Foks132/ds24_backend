import {getRoomsValidation} from '../utils/validation.js';
import {RoomsService} from '../services/roomsService.js';

const RoomsController = {
	all: async (req, res) => {
		const {error} = getRoomsValidation(req.query);
		if (error) {
			return res.status(400).json({message: error.details[0].message});
		}
		const {userId, startDate, lastDate} = req.query;

		try {
			const row = await RoomsService.all(startDate, lastDate);
			const result = row.map(room => {
				const filteredBookings = room.booking.filter(b => !b.isDeleted);

				return {
					id: room.id,
					number: room.number,
					isMine: room.booking.some(x => x.userId === Number(userId)) || false,
					booking: filteredBookings,
				};
			});

			return res.status(200).json(result);
		} catch (e) {
			return res.status(400).json({message: e.message});
		}
	},

	getByUserId: async (req, res) => {
		const {error} = getRoomsValidation(req.params);
		if (error) {
			return res.status(400).json({message: error.details[0].message});
		}
		const {userId} = req.params;

		try {
			const row = await RoomsService.getByUserId(userId);
			const result = row.map(room => ({
				...room,
				booking: room.booking.filter(b => b.userId === Number(userId)),
			}));

			return res.status(200).json(result);
		} catch (e) {
			return res.status(400).json({message: e.message});
		}
	},
};

export default RoomsController;
