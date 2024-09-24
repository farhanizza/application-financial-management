import React, { useEffect, useState } from 'react';
import Navbar from '../parts/Navbar';
import {
	AttachMoney,
	AccountBalanceWallet,
	Settings,
} from '@mui/icons-material';
import IDR from '../helpers/CurrencyIDR';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../assets/css/index.css';
import NoData from '../parts/NoData';

export default function Statistics(props) {
	const [dataUsers, setdataUsers] = useState('');
	const [dataAmount, setdataAmount] = useState('');
	const [Error, setError] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/users/${id}`);

				const responseAmount = await axios.get(
					`http://localhost:3001/users_balance?id_user=${id}`
				);

				setdataAmount(responseAmount.data);

				setdataUsers(response.data);
			} catch (error) {
				console.error(
					'Error fetching data:',
					error.response?.status,
					error.response?.data
				);
				setError(true);
			}
		};

		getData();
	}, [id]);

	const MaxamountsIncome = (dataAmount || [])
		.filter((amount) => amount.type === 'Income')
		.map((data) => Number(data.amount.replace('.', '')));

	const MaxamountsExpense = (dataAmount || [])
		.filter((amount) => amount.type !== 'Income')
		.map((data) => Number(data.amount.replace('.', '')));

	const MinamountsIncome = (dataAmount || [])
		.filter((amount) => amount.type === 'Income')
		.map((data) => Number(data.amount.replace('.', '')));

	const MinamountsExpense = (dataAmount || [])
		.filter((amount) => amount.type !== 'Income')
		.map((data) => Number(data.amount.replace('.', '')));

	const SumAmountIncome =
		Math.max(...MaxamountsIncome) + Math.min(...MinamountsIncome);

	const SumAmountExpense =
		Math.max(...MaxamountsExpense) + Math.min(...MinamountsExpense);

	const Income = (dataAmount || [])
		.filter((balance) => balance.type === 'Income')
		.map((balance) => {
			return parseFloat(balance.amount?.replace('.', '') || '0');
		})
		.reduce((acc, value) => acc + value, 0);

	const Expense = (dataAmount || [])
		.filter((balance) => balance.type !== 'Income')
		.map((balance) => {
			return parseFloat(balance.amount?.replace('.', '') || '0');
		})
		.reduce((acc, value) => acc + value, 0);

	return (
		<>
			<div className="bg-slate-100 h-screen">
				<Navbar id={dataUsers?.id} />
				<div className="mt-10 px-10 pb-10">
					<h1 className="text-black font-semibold text-lg">{props.name}</h1>
					<div className="flex justify-between mt-10">
						<div className="bg-gray-200 px-5 py-5 rounded-lg w-1/3 shadow-xl shadow-green-200">
							<div className="flex justify-between">
								<div className="">
									<h1 className="font-semibold text-black">Cash flow tables</h1>
								</div>
								<Settings className="text-black cursor-pointer" />
							</div>
							<div className="flex flex-col mt-5">
								<h1 className="text-slate-500 font-medium">Last 7 Days</h1>
							</div>
							<table className="min-w-full mt-7">
								<thead className="bg-gray-200">
									<tr>
										<th className="py-2 text-left text-black">
											Quick overview
										</th>
										<th className="py-2 text-left text-black">Income</th>
										<th className="py-2 text-left text-black">Expense</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="py-2 text-slate-500 font-semibold">
											Average (Day)
										</td>
										<td className="py-2 text-green-500 font-semibold">
											{IDR(0)}
										</td>
										<td className="py-2  text-red-500 font-semibold">
											{IDR(0)}
										</td>
									</tr>
									<tr>
										<td className="py-2 text-slate-500 font-semibold">
											Highest
										</td>
										<td className="py-2 text-green-500 font-semibold">
											{IDR(Math.max(...MaxamountsIncome))}
										</td>
										<td className="py-2 text-red-500 font-semibold">
											{IDR(Math.max(...MaxamountsExpense))}
										</td>
									</tr>
									<tr>
										<td className="py-2 text-slate-500 font-semibold">
											Lowest
										</td>
										<td className="py-2 text-green-500 font-semibold">
											{IDR(Math.min(...MinamountsIncome))}
										</td>
										<td className="py-2 text-red-500 font-semibold">
											{IDR(Math.min(...MinamountsExpense))}
										</td>
									</tr>
									<tr>
										<td className="py-2 text-slate-500 font-semibold">Total</td>
										<td className="py-2 text-green-500 font-semibold">
											{IDR(SumAmountIncome)}
										</td>
										<td className="py-2 text-red-500 font-semibold">
											{IDR(SumAmountExpense)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="bg-gray-200 px-5 py-5 rounded-lg w-3/5 shadow-xl shadow-green-200 overflow-y-scroll scrollbar-custom max-h-96">
							<div className="flex justify-between">
								<div className="">
									<h1 className="font-semibold text-black">
										Income & Expenses book in IDR
									</h1>
								</div>
								<Settings className="text-black cursor-pointer" />
							</div>
							<div className="flex flex-col mt-5">
								<h1 className="text-slate-500 font-medium">Last 7 Days</h1>
							</div>
							<div className="mt-5">
								<div className="w-full bg-green-800 px-5 py-2 rounded-lg">
									<div className="flex justify-between">
										<h1 className="font-semibold text-slate-100">Income</h1>
										<h1 className="font-semibold text-slate-100">
											{IDR(Income)}
										</h1>
									</div>
								</div>
							</div>
							{(dataAmount || []).length > 0 ? (
								(dataAmount || [])
									.filter((data) => data.type === 'Income')
									.map((item, key) => (
										<div className="mt-3" key={key}>
											<div className="flex pr-5">
												<div className="bg-green-700 flex items-center justify-center rounded-lg mr-5 w-10 px-5 py-5">
													<AttachMoney className="text-white" />
												</div>
												<div className="flex items-center w-full justify-between">
													<h1 className="font-semibold text-black">
														{item.type}
													</h1>
													<h1 className="font-semibold text-slate-500">
														{item.amount}
													</h1>
												</div>
											</div>
										</div>
									))
							) : (
								<div className="mt-3">
									<NoData />
								</div>
							)}
							<div className="mt-5">
								<div className="w-full bg-green-800 px-5 py-2 rounded-lg">
									<div className="flex justify-between">
										<h1 className="font-semibold text-slate-100">Expenses</h1>
										<h1 className="font-semibold text-slate-100">
											{IDR(Expense)}
										</h1>
									</div>
								</div>
							</div>
							{(dataAmount || []).length > 0 ? (
								(dataAmount || [])
									.filter((data) => data.type !== 'Income')
									.map((item, key) => (
										<div className="mt-3" key={key}>
											<div className="flex pr-5">
												<div className="bg-red-700 flex items-center justify-center rounded-lg mr-5 w-10 px-5 py-5">
													<AccountBalanceWallet className="text-white" />
												</div>
												<div className="flex items-center w-full justify-between">
													<h1 className="font-semibold text-black">
														{item.type}
													</h1>
													<h1 className="font-semibold text-slate-500">
														{item.amount}
													</h1>
												</div>
											</div>
										</div>
									))
							) : (
								<div className="mt-3">
									<NoData />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
