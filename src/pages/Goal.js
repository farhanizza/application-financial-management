import React, { useState } from 'react';
import Navbar from '../parts/Navbar';
import IDR from '../helpers/CurrencyIDR';
import formatIDR from '../helpers/CurrencyChangeIDR';
import { Settings, Add, AccountBalanceWallet } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Goal(props) {
	const [amount, setAmount] = useState('');
	const [Filter, setFilter] = useState('');
	const [Category, setCategory] = useState('');
	const categoryList = [
		'Income',
		'Saving to goal',
		'Investment',
		'Food',
		'Transportation',
		'Vechicle',
	];
	const filterList = ['Active', 'Reached', 'Not Reached'];
	const dummy_data = [
		{
			id: 1,
			title: 'Emergency fund',
			goal: 1000000,
			target_date: 'No target date',
			saved: 500000,
		},
	];
	const insertBudgetButton = (e) => {
		// Send to Backend
		console.log(Filter);
		console.log(Category);
		console.log(amount);
	};
	return (
		<>
			<div className="bg-slate-100 h-screen">
				<Navbar />
				<div className="mt-10 px-10 pb-10">
					<div className="flex">
						<h1 className="text-black font-semibold text-lg">{props.name}</h1>
						<div className="flex justify-end w-full pr-5">
							<div className="p-1 rounded-md bg-gray-500 cursor-pointer mr-7">
								<Settings
									className="text-white"
									onClick={() =>
										document.getElementById('modal_filter').showModal()
									}
								/>
							</div>
							<div className="p-1 rounded-md bg-gray-500 cursor-pointer">
								<Add
									className="text-white font-bold"
									onClick={() =>
										document.getElementById('modal_set_goal').showModal()
									}
								/>
							</div>
						</div>
					</div>
					<div className="mt-5 px-5 py-2 bg-green-700 rounded-lg w-1/12 flex justify-center">
						<h1 className="font-semibold text-slate-100">Active</h1>
					</div>
					<div className="mt-10 bg-gray-200 px-5 py-5 rounded-lg shadow-xl shadow-green-200 cursor-pointer">
						{dummy_data.map((value, key) => (
							<Link key={key} to={`/goal/detail/${value.id}`}>
								<div className="flex mb-5">
									<div className="flex py-5 px-3 rounded-lg bg-green-500 mr-5">
										<AccountBalanceWallet className="text-white" />
									</div>
									<div className="flex w-full justify-between">
										<div className="flex flex-col">
											<h1 className="font-semibold text-black">
												{value.title}
											</h1>
											<h1 className="mt-3 font-medium text-gray-500">
												{value.target_date}
											</h1>
										</div>
										<div className="flex flex-col">
											<h1 className="font-semibold text-black">
												Goal: {IDR(value.goal)}
											</h1>
											<h1 className="mt-3 text-green-500 font-medium">
												Saved: {IDR(value.saved)}
											</h1>
										</div>
									</div>
								</div>
								<progress
									className="progress progress-success h-5"
									value="70"
									max="100"
								></progress>
							</Link>
						))}
					</div>
				</div>
			</div>
			<dialog id="modal_set_goal" className="modal">
				<div className="modal-box bg-slate-100">
					<form method="dialog">
						<div className="w-full flex justify-between bg-green-700 px-5 py-2 rounded-lg">
							<h1 className="text-slate-100 font-semibold mt-1">Insert Goal</h1>
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
										Goal name
									</span>
								</div>
								<input
									type="text"
									placeholder="Type goal name"
									className="input input-bordered w-full max-w-lg bg-slate-100"
								/>
							</label>
						</div>
						<div className="mb-3">
							<label className="form-control w-full max-w-lg">
								<div className="label mb-1">
									<span className="label-text font-semibold text-black">
										Target amount
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
						<div className="mb-3">
							<label className="form-control w-full max-w-lg">
								<div className="label mb-1">
									<span className="label-text font-semibold text-black">
										Target date
									</span>
								</div>
								<input
									type="date"
									className="input input-bordered w-full max-w-lg bg-slate-100"
								/>
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
										Note
									</span>
								</div>
								<textarea
									type="text"
									placeholder="Type note"
									className="textarea textarea-bordered w-full max-w-lg bg-slate-100"
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
			<dialog id="modal_filter" className="modal">
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
								<div className="label mb-1">
									<span className="label-text font-semibold text-black">
										Filter Category
									</span>
								</div>
								<select
									className="select select-bordered bg-slate-100"
									value={Filter}
									onChange={(e) => setFilter(e.target.value)}
								>
									<option disabled value={(e) => setFilter('')}>
										Filter category
									</option>
									{filterList.map((value, index) => (
										<option key={index} value={value}>
											{value}
										</option>
									))}
								</select>
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
