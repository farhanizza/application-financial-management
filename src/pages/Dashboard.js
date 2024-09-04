import React, { useEffect, useState } from 'react';

// Helpers
import IDR from '../helpers/CurrencyIDR';
import formatIDR from '../helpers/CurrencyChangeIDR';
import capitalizeLetter from '../helpers/CapitalizeEachWord';
import greetUser from '../helpers/Greetings';
import { TotalAmount } from '../helpers/TotalAmount';
import { formatDate } from '../helpers/FormatDate';
// End

// icon
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// End

// Chart
import { Doughnut, Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from 'chart.js';
// End

// Parts
import Skeleton from '../parts/Skeleton';
import Navbar from '../parts/Navbar';
// End

import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/index.css';
import useFetch from '../helpers/hooks/useFetch';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);
export default function Dashboard() {
	const monthNamesEnglish = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const opton_line = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: false,
				text: 'Statistics',
			},
		},
	};

	const [amount, setAmount] = useState('');
	const [CategoryOption, setCategoryOption] = useState('');
	const [Category, setCategory] = useState('');

	const [dataUsers, setdataUsers] = useState({
		dataUsers: null,
		dataUsersBalance: null,
		dataUsersLastRecord: null,
	});

	const [Error, setError] = useState(false);
	const categoryOptionList = ['Cash', 'QRIS', 'Transfer'];
	const [totalAmount, setTotalAmount] = useState(null);
	const now = new Date();

	const { id } = useParams();

	const categoryList = [
		'Income',
		'Saving to goal',
		'Investment',
		'Food',
		'Transportation',
		'Vechicle',
	];
	const insertBudgetButton = async (e) => {
		// Send to Backend
		try {
			const data = {
				id_user: id,
				type: Category,
				category: CategoryOption,
				amount: amount,
				date: now,
			};

			const response = await axios.post(
				'http://localhost:3001/users_balance',
				data,
				{
					headers: {
						'Content-type': 'application/json',
					},
				}
			);
			window.location.reload();
		} catch (error) {
			setError(true);
			console.log(error.response ? error.response.data : error.message);
		}
	};

	useEffect(() => {
		const GetData = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/users/${id}`);

				const responseBalance = await axios.get(
					`http://localhost:3001/users_balance?id_user=${id}`
				);

				const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

				const filteredLastRecord = responseBalance.data.filter((item) => {
					const itemDate = new Date(item.date);
					return itemDate >= thirtyDaysAgo;
				});

				setdataUsers({
					dataUsers: response.data,
					dataUsersBalance: responseBalance.data,
					dataUsersLastRecord: filteredLastRecord,
				});
			} catch (error) {
				console.error(
					'Error fetching data:',
					error.response?.status,
					error.response?.data
				);
				setError(true);
			}
		};

		GetData();
	}, [id]);

	const Income = dataUsers?.dataUsersBalance
		?.filter((balance) => balance.type === 'Income')
		.map((balance) => {
			return parseFloat(balance.amount?.replace('.', '') || '0');
		})
		.reduce((acc, value) => acc + value, 0);

	const AmountDate = dataUsers?.dataUsersBalance
		?.filter((balance) => balance.type === 'Income')
		.map((balance) => {
			const date = new Date(balance.date);
			const monthIndex = date.getMonth();
			return monthNamesEnglish[monthIndex];
		});

	const Expense = dataUsers?.dataUsersBalance
		?.filter((balance) => balance.type !== 'Income')
		.map((balance) => {
			return parseFloat(balance.amount?.replace('.', '') || '0');
		})
		.reduce((acc, value) => acc + value, 0);

	const data = {
		datasets: [
			{
				data: [Income, Expense],
				backgroundColor: ['rgba(21,128,61)', 'rgba(220,38,38)'],
				borderWidth: 1,
			},
		],
		labels: ['Income', 'Expense'],
	};

	const parseAmount = (amount) => {
		// Menghapus karakter yang tidak diinginkan dan mengubah ke angka
		return parseFloat(amount.replace(/[^\d.-]/g, '')) || 0;
	};

	const currentMonthIndex = now.getMonth();
	const filteredMonths = monthNamesEnglish.slice(0, currentMonthIndex + 1);

	const incomeData = filteredMonths.map((month) => {
		return dataUsers?.dataUsersBalance
			?.filter(
				(balance) =>
					balance.type === 'Income' &&
					new Date(balance.date).toLocaleString('default', {
						month: 'long',
					}) === month
			)
			.reduce((sum, balance) => sum + parseAmount(balance.amount), 0);
	});

	console.log(incomeData);

	const lossData = filteredMonths.map((month) => {
		return dataUsers?.dataUsersBalance
			?.filter(
				(balance) =>
					balance.type !== 'Income' &&
					new Date(balance.date).toLocaleString('default', {
						month: 'long',
					}) === month
			)
			.reduce((sum, balance) => sum + parseAmount(balance.amount), 0);
	});

	const data_line = {
		labels: filteredMonths,
		datasets: [
			{
				label: 'Profit',
				data: incomeData,
				borderColor: 'rgba(21,128,61,1)',
				backgroundColor: 'rgba(21,128,61,0.5)',
			},
			{
				label: 'Loss',
				data: lossData,
				borderColor: 'rgba(220,38,38,1)',
				backgroundColor: 'rgba(220,38,38,0.5)',
			},
		],
	};

	useEffect(() => {
		const fetchTotalAmount = async () => {
			if (dataUsers?.dataUsersBalance) {
				const amount = await TotalAmount(
					dataUsers?.dataUsersBalance?.map((balance) => balance.id_user)
				);
				setTotalAmount(amount);
			}
		};

		fetchTotalAmount();
	}, [dataUsers]);

	return (
		<>
			<div className="bg-slate-100">
				{<Navbar id={dataUsers.dataUsers?.id} />}
				<div className="mt-10 px-10 pb-10">
					<h1 className="text-black font-semibold text-lg">
						<div className="flex">
							{greetUser(now.getHours())}
							{dataUsers.dataUsers ? (
								<span className="text-green-700 ml-[5px] ">
									{capitalizeLetter(dataUsers.dataUsers.username)}
								</span>
							) : (
								<div className="flex items-center ml-[10px]">
									<Skeleton
										color="bg-gray-300"
										size="h-2"
										widthSize="w-[100px]"
									/>
								</div>
							)}
						</div>
					</h1>
					<div className="flex justify-between mt-10">
						<div className="bg-green-700 px-5 py-3 rounded-lg w-1/3">
							<div className="flex justify-between">
								<div className="">
									<p className="text-slate-100 font-semibold">Cash</p>
								</div>
								{dataUsers.dataUsersBalance ? (
									<p className="text-slate-100 font-semibold">
										{IDR(totalAmount)}
									</p>
								) : (
									<div className="flex items-center justify-center">
										<Skeleton
											color="bg-gray-300"
											size="h-5"
											widthSize="w-[70px]"
										/>
									</div>
								)}
							</div>
						</div>
						<button
							className="btn bg-green-700 border-none text-xl text-slate-100 hover:bg-green-800"
							onClick={() =>
								document.getElementById('modal_insert_budget').showModal()
							}
						>
							+
						</button>
					</div>
					<div className="flex justify-between mt-10">
						<div className="bg-gray-200 px-5 py-5 rounded-lg w-1/3 shadow-xl shadow-green-200 scroll-auto">
							<div className="flex justify-between">
								<div className="">
									<h1 className="font-semibold text-black">
										Expenses structures
									</h1>
								</div>
								<SettingsIcon className="text-black cursor-pointer" />
							</div>
							<div className="flex flex-col mt-5">
								<h1 className="text-slate-500 font-medium">Last 30 Days</h1>
								<h1 className="text-slate-500 font-medium mt-3">
									{IDR(totalAmount)}
								</h1>
								<div className="mt-4">
									<Doughnut
										data={data}
										width={200}
										height={200}
										options={{ maintainAspectRatio: false }}
									/>
								</div>
							</div>
						</div>

						<div
							className={
								dataUsers.dataUsersLastRecord == 2
									? 'bg-gray-200 px-5 py-3 rounded-lg w-3/5 max-h-96 shadow-xl shadow-green-200'
									: 'bg-gray-200 px-5 py-3 rounded-lg w-3/5 max-h-96 overflow-y-scroll scrollbar-custom shadow-xl shadow-green-200'
							}
						>
							<div className="flex justify-between">
								<div className="">
									<h1 className="font-semibold text-black">
										Last records overview
									</h1>
								</div>
								<SettingsIcon className="text-black cursor-pointer" />
							</div>
							<div className="flex flex-col mt-5">
								<h1 className="text-slate-500 font-medium">Last 30 Days</h1>
								{Array.isArray(dataUsers.dataUsersLastRecord) &&
								dataUsers.dataUsersLastRecord.length > 0 ? (
									dataUsers.dataUsersLastRecord.map((record, index) => (
										<div
											key={index}
											className="flex bg-white mt-5 rounded-xl px-7 py-5"
										>
											<div
												className={
													record.type === 'Income'
														? 'bg-green-700 flex items-center justify-center rounded-lg mr-5 w-10 px-5'
														: categoryList.includes(record.type) &&
														  record.type !== 'Income'
														? 'bg-red-600 flex items-center justify-center rounded-lg mr-5 w-10 px-5'
														: ''
												}
											>
												{record.type === 'Income' ? (
													<AttachMoneyIcon className="text-white" />
												) : categoryList.includes(record.type) &&
												  record.type !== 'Income' ? (
													<AccountBalanceWalletIcon className="text-white" />
												) : (
													''
												)}
											</div>
											<div className="flex flex-col w-full">
												<div className="text-black font-semibold">
													{record.type}
												</div>
												<h1 className="text-slate-500 font-medium mt-3">
													{record.category}
												</h1>
											</div>
											<div className="flex items-end flex-col">
												<h1
													className={
														record.type === 'Income'
															? 'text-green-500 font-semibold'
															: categoryList.includes(record.type) &&
															  record.type !== 'Income'
															? 'text-red-600 font-semibold'
															: ''
													}
												>
													{record.type === 'Income'
														? record.amount
														: categoryList.includes(record.type) &&
														  record.type !== 'Income'
														? record.amount
														: ''}
												</h1>
												<h1 className="text-slate-500 font-medium mt-3">
													{formatDate(record.date)}
												</h1>
											</div>
										</div>
									))
								) : (
									<p>No records available.</p>
								)}
							</div>
						</div>
					</div>
					<div className="mt-14 bg-gray-200 px-5 py-5 rounded-lg w-full shadow-xl shadow-green-200">
						<div className="flex justify-between">
							<div className="">
								<h1 className="font-semibold text-black">Balance trend</h1>
							</div>
							<SettingsIcon className="text-black cursor-pointer" />
						</div>
						<div className="mt-5">
							<Line
								data={data_line}
								width={200}
								height={40}
								options={opton_line}
							/>
						</div>
					</div>
				</div>
			</div>
			<dialog id="modal_insert_budget" className="modal">
				<div className="modal-box bg-slate-100">
					<form method="dialog">
						<div className="w-full flex justify-between bg-green-700 px-5 py-2 rounded-lg">
							<h1 className="text-slate-100 font-semibold mt-1">
								Insert budget
							</h1>
							<button className="btn btn-sm btn-circle btn-ghost font-bold text-slate-100">
								✕
							</button>
						</div>
					</form>
					<div className="mt-5 flex flex-col">
						<div className="mb-3">
							<label className="form-control w-full max-w-lg">
								<div className="label mb-1">
									<span className="label-text font-semibold text-black">
										Category option
									</span>
								</div>
								<select
									className="select select-bordered bg-slate-100"
									value={CategoryOption}
									onChange={(e) => setCategoryOption(e.target.value)}
								>
									<option value={(e) => setCategoryOption('')}>
										Select category option
									</option>
									{categoryOptionList.map((value, index) => (
										<option key={index} value={value}>
											{value}
										</option>
									))}
								</select>
							</label>
						</div>
						<div className="mb-3">
							<label className="form-control w-full max-w-lg">
								<div className="label mb-1">
									<span className="label-text font-semibold text-black">
										Category
									</span>
								</div>
								<select
									className="select select-bordered bg-slate-100"
									value={Category}
									onChange={(e) => setCategory(e.target.value)}
								>
									<option value={(e) => setCategory('')}>
										Select category
									</option>
									{categoryList.map((value, index) => (
										<option key={index} value={value}>
											{value}
										</option>
									))}
								</select>
							</label>
						</div>
						<div className="mb-3">
							<label className="form-control w-full max-w-lg">
								<div className="label mb-1">
									<span className="label-text font-semibold text-black">
										Insert budget
									</span>
								</div>
								<input
									type="text"
									placeholder="IDR"
									className="input input-bordered w-full max-w-lg bg-slate-100"
									value={amount}
									onChange={(e) => setAmount(formatIDR(e.target.value))}
								/>
							</label>
						</div>
						<div className="mt-5 flex justify-end">
							<button
								className="btn btn-sm bg-green-700 border-none text-slate-100 px-5"
								onClick={insertBudgetButton}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
}
