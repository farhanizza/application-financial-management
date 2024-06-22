import React from 'react';
import Navbar from '../parts/Navbar';
import {
	AttachMoney,
	AccountBalanceWallet,
	Settings,
} from '@mui/icons-material';
import IDR from '../helpers/CurrencyIDR';

export default function Statistics(props) {
	return (
		<>
			<div className="bg-slate-100 h-screen">
				<Navbar />
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
											{IDR(125000)}
										</td>
										<td className="py-2  text-red-500 font-semibold">
											{IDR(52500)}
										</td>
									</tr>
									<tr>
										<td className="py-2 text-slate-500 font-semibold">
											Highest
										</td>
										<td className="py-2 text-green-500 font-semibold">
											{IDR(125000)}
										</td>
										<td className="py-2 text-red-500 font-semibold">
											{IDR(52500)}
										</td>
									</tr>
									<tr>
										<td className="py-2 text-slate-500 font-semibold">
											Lowest
										</td>
										<td className="py-2 text-green-500 font-semibold">
											{IDR(125000)}
										</td>
										<td className="py-2 text-red-500 font-semibold">
											{IDR(52500)}
										</td>
									</tr>
									<tr>
										<td className="py-2 text-slate-500 font-semibold">Total</td>
										<td className="py-2 text-green-500 font-semibold">
											{IDR(125000)}
										</td>
										<td className="py-2 text-red-500 font-semibold">
											{IDR(52500)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="bg-gray-200 px-5 py-5 rounded-lg w-3/5 shadow-xl shadow-green-200 hover:overflow-y-scroll  max-h-96">
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
											{IDR(1000000)}
										</h1>
									</div>
								</div>
							</div>
							<div className="mt-3">
								<div className="flex pr-5">
									<div className="bg-green-700 flex items-center justify-center rounded-lg mr-5 w-10 px-5 py-5">
										<AttachMoney className="text-white" />
									</div>
									<div className="flex items-center w-full justify-between">
										<h1 className="font-semibold text-black">Income</h1>
										<h1 className="font-semibold text-slate-500">
											{IDR(1000000)}
										</h1>
									</div>
								</div>
							</div>
							<div className="mt-5">
								<div className="w-full bg-green-800 px-5 py-2 rounded-lg">
									<div className="flex justify-between">
										<h1 className="font-semibold text-slate-100">Expenses</h1>
										<h1 className="font-semibold text-slate-100">
											{IDR(500000)}
										</h1>
									</div>
								</div>
							</div>
							<div className="mt-3">
								<div className="flex pr-5">
									<div className="bg-red-700 flex items-center justify-center rounded-lg mr-5 w-10 px-5 py-5">
										<AccountBalanceWallet className="text-white" />
									</div>
									<div className="flex items-center w-full justify-between">
										<h1 className="font-semibold text-black">Saving to goal</h1>
										<h1 className="font-semibold text-slate-500">
											{IDR(1000000)}
										</h1>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
