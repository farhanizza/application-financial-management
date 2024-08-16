import React, { useEffect, useState } from 'react';
import Navbar from '../parts/Navbar';
import IDR from '../helpers/CurrencyIDR';
import formatIDR from '../helpers/CurrencyChangeIDR';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
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
import axios from 'axios';
import { useParams } from 'react-router-dom';
import capitalizeLetter from '../helpers/CapitalizeEachWord';

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
	const records = [
		{
			title: 'Income',
			type: 'profit',
			category: 'Cash',
			amount: '500000',
			date: 'Today',
		},
		{
			title: 'Saving to goal',
			type: 'loss',
			category: 'Cash',
			amount: '500000',
			date: 'Yesterday',
		},
	];

	const data = {
		datasets: [
			{
				data: [500000, 500000],
				backgroundColor: ['rgba(21,128,61)', 'rgba(220,38,38)'],
				borderWidth: 1,
			},
		],
		labels: ['Income', 'Saving to goal'],
	};

	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	const data_line = {
		labels: ['February 30', 'March 30', 'April 30', 'May 30'],
		datasets: [
			{
				label: 'Profit',
				data: ['February 30', 'March 30', 'April 30', 'May 30'].map(() =>
					getRandomNumber(0, 1000)
				),
				borderColor: 'rgba(21,128,61)',
				backgroundColor: 'rgba(21,128,61)',
			},
			{
				label: 'Loss',
				data: ['February 30', 'March 30', 'April 30', 'May 30'].map(() =>
					getRandomNumber(0, 1000)
				),
				borderColor: 'rgba(220,38,38)',
				backgroundColor: 'rgba(220,38,38)',
			},
		],
	};

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
	const [dataUsers, setdataUsers] = useState(null);
	const [Error, setError] = useState(false);
	const categoryOptionList = ['Cash', 'QRIS', 'Transfer'];
	const { id } = useParams();

	const categoryList = [
		'Income',
		'Saving to goal',
		'Investment',
		'Food',
		'Transportation',
		'Vechicle',
	];
	const insertBudgetButton = (e) => {
		// Send to Backend
	};

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/users/${id}`);
				setdataUsers(response.data);
				console.log(response);
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

	return (
		<>
			<div className="bg-slate-100">
				<Navbar />
				<div className="mt-10 px-10 pb-10">
					<h1 className="text-black font-semibold text-lg">
						Good Morning,{' '}
						<span className="text-green-700">
							{capitalizeLetter(dataUsers.username)}
						</span>
					</h1>
					<div className="flex justify-between mt-10">
						<div className="bg-green-700 px-5 py-3 rounded-lg w-1/3">
							<div className="flex justify-between">
								<div className="">
									<p className="text-slate-100 font-semibold">Cash</p>
								</div>
								<p className="text-slate-100 font-semibold">
									{IDR(dataUsers.balance)}
								</p>
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
						<div className="bg-gray-200 px-5 py-5 rounded-lg w-1/3 shadow-xl shadow-green-200">
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
									{IDR(2442000)}
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
								records.length === 2
									? 'bg-gray-200 px-5 py-3 rounded-lg w-3/5 max-h-96 shadow-xl shadow-green-200'
									: 'bg-gray-200 px-5 py-3 rounded-lg w-3/5 max-h-96 overflow-y-scroll shadow-xl shadow-green-200'
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
								{records.map((record, index) => (
									<div
										key={index}
										className="flex bg-white mt-5 rounded-xl px-7 py-5"
									>
										<div
											className={
												record.type === 'profit'
													? 'bg-green-700 flex items-center justify-center rounded-lg mr-5 w-10 px-5'
													: record.type === 'loss'
													? 'bg-red-600 flex items-center justify-center rounded-lg mr-5 w-10 px-5'
													: ''
											}
										>
											{record.type === 'profit' ? (
												<AttachMoneyIcon className="text-white" />
											) : record.type === 'loss' ? (
												<AccountBalanceWalletIcon className="text-white" />
											) : (
												''
											)}
										</div>
										<div className="flex flex-col w-full">
											<div className="text-black font-semibold">
												{record.title}
											</div>
											<h1 className="text-slate-500 font-medium mt-3">
												{record.category}
											</h1>
										</div>
										<div className="flex items-end flex-col">
											<h1
												className={
													record.type === 'profit'
														? 'text-green-500 font-semibold'
														: record.type === 'loss'
														? 'text-red-600 font-semibold'
														: ''
												}
											>
												{record.type === 'profit'
													? IDR(record.amount)
													: record.type === 'loss'
													? IDR(record.amount)
													: ''}
											</h1>
											<h1 className="text-slate-500 font-medium mt-3">
												{record.date}
											</h1>
										</div>
									</div>
								))}
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
									<option disabled value={(e) => setCategoryOption('')}>
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
									<option disabled value={(e) => setCategory('')}>
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
