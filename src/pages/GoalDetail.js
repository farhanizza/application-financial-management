import React, { useState } from 'react';
import Navbar from '../parts/Navbar';
import { AccountBalanceWallet } from '@mui/icons-material';
import IDR from '../helpers/CurrencyIDR';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import formatIDR from '../helpers/CurrencyChangeIDR';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
	datasets: [
		{
			data: [76, 24],
			backgroundColor: ['rgb(34,169,95)', 'rgb(240,240,240)'],
		},
	],
};

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

		const text = 'Total Reached 76%',
			textX = Math.round((width - ctx.measureText(text).width) / 2),
			textY = height / 2;

		ctx.fillText(text, textX, textY);
		ctx.save();
	},
};

export default function GoalDetail() {
	const [Amount, setAmount] = useState('');

	return (
		<>
			<div className="bg-slate-100 h-screen">
				<Navbar />
				<div className="mt-10 px-10 pb-10">
					<div className="mt-10">
						<div className="flex mb-5">
							<div className="flex py-5 px-3 rounded-lg bg-green-500 mr-5">
								<AccountBalanceWallet className="text-white" />
							</div>
							<div className="flex w-full justify-between">
								<div className="flex flex-col">
									<h1 className="font-semibold text-black">Emergency fund</h1>
									<h1 className="mt-3 font-medium text-gray-500">
										No target data
									</h1>
								</div>
								<div className="flex flex-col justify-center cursor-pointer">
									<button className="btn btn-sm px-5 bg-red-700 hover:bg-red-800 text-white border-none">
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
										{IDR(284000)}
									</h1>
									<div className="mt-10">
										<h1 className="font-semibold text-black">
											Estimated time to reach goal
										</h1>
										<h1 className="mt-5 font-medium text-gray-500">25 Week</h1>
									</div>
									<div className="mt-10">
										<h1 className="font-semibold text-black">Note</h1>
										<h1 className="mt-5 font-medium text-gray-500">
											Saving from income a week
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
											<button className="btn btn-sm px-5 bg-transparent text-black hover:bg-transparent border-none mt-5">
												Set goal as reached
											</button>
										</div>
									</div>
								</div>
								<div className="bg-gray-200 px-20 pt-5  rounded-lg shadow-xl shadow-green-200">
									<div className="flex flex-col">
										<div className="chart-doughnut">
											<Doughnut
												data={data}
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
												Goal: {IDR(10000000)}
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
							<h1 className="text-slate-100 font-semibold mt-1">Filter</h1>
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
							<button className="btn btn-sm bg-green-700 hover:bg-green-800 border-none text-slate-100 px-5">
								Submit
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
}
