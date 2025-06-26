import { loginUserValidation } from '../utils/validation.js';
import {VipService} from '../services/vipSerivce.js';

 const VipController = {
	isVip: async (req, res) => {
    const {error} = loginUserValidation(req.params)
    if (error) {
			return res.status(400).json({message: error.details[0].message});
		}
		const {userId} = req.params;

		try {
			const result = await VipService.isVip(userId);

			return res.status(200).json({isVip: result});
		} catch (e) {
			return res.status(400).json({message: e.message});
		}
	},
};

export default VipController;