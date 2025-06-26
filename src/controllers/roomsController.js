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
			const result = await RoomsService.all(userId, startDate, lastDate);

			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
			return res.status(400).json({message: e.message});
		}
	},
};

export default RoomsController;
