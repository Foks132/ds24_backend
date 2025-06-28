export const VipService = {
	isVip: async userId => {
		await new Promise(res => setTimeout(res, 100));
		return Number(userId) % 2 === 0;
	},
};
