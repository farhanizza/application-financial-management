import axios from 'axios';

export const TotalAmount = async (id) => {
	const id_user = id[0];

	try {
		const responseBalance = await axios.get(
			`http://localhost:3001/users_balance?id_user=${id_user}`
		);

		const data = responseBalance.data;

		const IncomeData = data
			?.filter((item) => item.type === 'Income')
			.map((item) => {
				const balance = item.amount || '0';
				return parseFloat(balance.replace('.', ''));
			})
			.reduce((acc, value) => acc + value, 0);

		const ExpenseData = data
			?.filter((item) => item.type !== 'Income')
			.map((item) => {
				const balance = item.amount || '0';
				return parseFloat(balance.replace('.', ''));
			})
			.reduce((acc, value) => acc + value, 0);

		return IncomeData - ExpenseData;
	} catch (error) {
		console.error('Error fetching balance:', error);
		return 0;
	}
};
