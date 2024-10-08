import React, { useState, useEffect } from 'react';
import Navbar from '../parts/Navbar';
import { AccountBalanceWallet } from '@mui/icons-material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import formatIDR from '../helpers/CurrencyChangeIDR';
import useFetch from '../helpers/hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function GoalDetail() {
	const [Amount, setAmount] = useState('');
	const [DataGoal, setDataGoal] = useState('');
	// const [CalculateAmount, setCalculateAmount] = useState('');
	const navigate = useNavigate();

	ChartJS.register(ArcElement, Tooltip, Legend);

	const percentageTotalReached = (DataGoal || []).map((data) => {
		const amount = parseInt(data?.amount?.replace(/\./g, ''), 10);
		const saved = parseInt(data?.saved, 10);

		return String(Math.ceil((saved / amount) * 100));
	});

	const totalPercentageReached = percentageTotalReached.reduce(
		(acc, val) => acc + parseInt(val, 10),
		0
	);

	const CenterTextPlugin = {
		id: 'centerText',
		beforeDraw: (chart) => {
			const width = chart.width,
				height = chart.height,
				ctx = chart.ctx;

			ctx.restore();
			const fontSize = (height / 300).toFixed(2);
			ctx.font = `600 ${fontSize}em sans-serif`;
			ctx.textBaseline = 'middle';

			const text = `Total Reached ${totalPercentageReached.toString()}%`,
				textX = Math.round((width - ctx.measureText(text).width) / 2),
				textY = height / 2;

			ctx.fillText(text, textX, textY);
			ctx.save();
		},
	};

	const { id, id_goal } = useParams();

	const { data, error, loading } = useFetch(
		`http://localhost:3001/users/${id}`
	);

	useEffect(() => {
		const GetData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/goal?id_user=${id}`
				);

				setDataGoal(response.data);
			} catch (error) {
				console.error(
					'Error fetching data:',
					error.response?.status,
					error.response?.data
				);
			}
		};

		GetData();
	}, [id]);

	const handleDelete = async (id) => {
		try {
			const response = await axios.get('http://localhost:3001/goal');
			const data = response.data;

			// Filter data yang memiliki id_user yang sesuai

			const goalsToDelete = data.filter((goal) => goal.id_user === id);

			// Hapus setiap data yang ditemukan
			for (const goal of goalsToDelete) {
				// console.log(goal.id);
				await axios.delete(`http://localhost:3001/goal/${goal.id}`);
				navigate(`/home/${id}`);
			}
		} catch (error) {
			if (error.response) {
				// Server memberikan response
				console.log('Error response data:', error.response.data);
				console.log('Error response status:', error.response.status); // Mungkin ini 404
				console.log('Error response headers:', error.response.headers);
			} else if (error.request) {
				// Request dibuat tetapi tidak ada response yang diterima
				console.log('Error request:', error.request);
			} else {
				// Something happened in setting up the request
				console.log('Error message:', error.message);
			}
		}
	};

	const handleUpdateSaved = async () => {
		try {
			const dataGoal = {
				id_user: DataGoal[0].id_user,
				saved: Amount,
				isActive: DataGoal[0].isActive,
			};

			await axios
				.post(`http://localhost:3001/goal`, dataGoal, {
					headers: {
						'Content-type': 'application/json',
					},
				})
				.then(() => {
					window.location.reload();
				});
		} catch (error) {
			console.log(error);
		}
	};

	const handleSetGoal = (id_goal) => {
		try {
			const dataSetGoal = {
				isActive: 1,
			};
			axios
				.patch(`http://localhost:3001/goal/${id_goal}`, dataSetGoal)
				.then(() => {
					navigate(`/goal/${id}`);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const now = new Date();

	const estimatedWeek = (DataGoal || []).map((data) => {
		const goalDate = new Date(data?.goaldate);
		const diffInTime = goalDate - now;
		const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
		const diffInWeeks = Math.floor(diffInDays / 7);
		return diffInWeeks;
	});

	const dataChart = {
		datasets: [
			{
				data: [
					(DataGoal || []).reduce((total, item) => {
						const saved = item.saved
							? parseInt(item.saved.replace(/\./g, ''), 10)
							: 0;
						return total + saved;
					}, 0),
					(DataGoal || []).reduce((total, item) => {
						const amount = item.amount
							? parseInt(item.amount.replace(/\./g, ''), 10)
							: 0;
						return total + amount;
					}, 0),
				],
				backgroundColor: ['rgb(34,169,95)', 'rgb(240,240,240)'],
			},
		],
	};

	return (
		<>
			<div className="bg-slate-100 h-screen">
				<Navbar id={data?.id} />
				<div className="mt-10 px-10 pb-10">
					<div className="mt-10">
						<div className="flex mb-5">
							<div className="flex py-5 px-3 rounded-lg bg-green-500 mr-5">
								<AccountBalanceWallet className="text-white" />
							</div>
							<div className="flex w-full justify-between">
								<div className="flex flex-col">
									<h1 className="font-semibold text-black">
										{(DataGoal || []).map((data) => data.goalname)}
									</h1>
									<h1 className="mt-3 font-medium text-gray-500">
										{(DataGoal || []).map((data) => data.goaldate)}
									</h1>
								</div>
								<div className="flex flex-col justify-center cursor-pointer">
									<button
										className="btn btn-sm px-5 bg-red-700 hover:bg-red-800 text-white border-none"
										onClick={() => {
											handleDelete(id);
										}}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="flex mt-12">
						<div className="flex flex-col w-full">
							<div className="flex justify-between">
								<div className="w-1/4">
									<h1 className="font-semibold text-black">
										Last added week amount
									</h1>
									<h1 className="mt-5 font-medium text-gray-500">
										Rp. {(DataGoal || []).map((data) => data.amount)}
									</h1>
									<div className="mt-10">
										<h1 className="font-semibold text-black">
											Estimated time to reach goal
										</h1>
										<h1 className="mt-5 font-medium text-gray-500">
											{estimatedWeek[0]} Week
										</h1>
									</div>
									<div className="mt-10">
										<h1 className="font-semibold text-black">Note</h1>
										<h1 className="mt-5 font-medium text-gray-500">
											{(DataGoal || []).map((data) => data.note)}
										</h1>
									</div>
									<div className="mt-10">
										<div className="flex flex-col">
											<button
												onClick={() =>
													document
														.getElementById('modal_saved_amount')
														.showModal()
												}
												className="btn btn-sm px-5 bg-green-700 hover:bg-green-800 text-white border-none"
											>
												Add saved amount
											</button>
											<button
												className="btn btn-sm px-5 bg-transparent text-black hover:bg-transparent border-none mt-5"
												onClick={() => {
													handleSetGoal(id_goal);
												}}
											>
												Set goal as reached
											</button>
										</div>
									</div>
								</div>
								<div className="bg-gray-200 px-20 pt-5  rounded-lg shadow-xl shadow-green-200">
									<div className="flex flex-col">
										<div className="chart-doughnut">
											<Doughnut
												data={dataChart}
												width={300}
												height={300}
												options={{
													maintainAspectRatio: false,
													cutout: 120,
												}}
												plugins={[CenterTextPlugin]}
											/>
										</div>
										<div className="flex justify-center mt-10">
											<h1 className="font-semibold text-green-700">
												Goal: Rp. {(DataGoal || []).map((data) => data.amount)}
											</h1>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<dialog id="modal_saved_amount" className="modal">
				<div className="modal-box bg-slate-100">
					<form method="dialog">
						<div className="w-full flex justify-between bg-green-700 px-5 py-2 rounded-lg">
							<h1 className="text-slate-100 font-semibold mt-1">Add Saved</h1>
							<button className="btn btn-sm btn-circle btn-ghost font-bold text-slate-100">
								✕
							</button>
						</div>
					</form>
					<div className="mt-5 flex flex-col">
						<div className="mb-3">
							<label className="form-control w-full max-w-lg">
								<label className="form-control w-full max-w-lg">
									<div className="label mb-1">
										<span className="label-text font-semibold text-black">
											Add amount
										</span>
									</div>
									<input
										type="text"
										placeholder="IDR"
										className="input input-bordered w-full max-w-lg bg-slate-100"
										value={Amount}
										onChange={(e) => setAmount(formatIDR(e.target.value))}
									/>
								</label>
							</label>
						</div>

						<div className="mt-5 flex justify-end">
							<button
								className="btn btn-sm bg-green-700 hover:bg-green-800 border-none text-slate-100 px-5"
								onClick={() => {
									handleUpdateSaved();
								}}
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
