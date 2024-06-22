import React from 'react';
import Navbar from '../parts/Navbar';

export default function Settings() {
	return (
		<div className="bg-slate-100 h-screen">
			<Navbar />
			<div className="flex justify-center mt-20">
				<div className="avatar">
					<div className="w-28 rounded-full">
						<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
					</div>
				</div>
			</div>
			<div className="flex flex-col px-10 pb-10 mt-10 w-full">
				<div className="flex-col flex w-full">
					<label className="form-control w-full">
						<div className="label">
							<h1 className="label-text font-semibold text-base text-black">
								Fullname
							</h1>
						</div>
						<input
							type="text"
							placeholder="Farhan Izzaturrahman Andiejanto"
							className="input input-bordered input-sm w-full bg-transparent border-slate-500 font-semibold"
						/>
					</label>
				</div>
				<div className="flex-col flex w-full mt-5">
					<label className="form-control w-full">
						<div className="label">
							<h1 className="label-text font-semibold text-base text-black">
								Email
							</h1>
						</div>
						<input
							type="email"
							placeholder="Farhan@gmail.com"
							className="input input-bordered input-sm w-full bg-transparent border-slate-500 font-semibold"
						/>
					</label>
				</div>
				<div className="flex-col flex w-full mt-5">
					<label className="form-control w-full">
						<div className="label">
							<h1 className="label-text font-semibold text-base text-black">
								Change password
							</h1>
						</div>
						<input
							type="password"
							className="input input-bordered input-sm w-full bg-transparent border-slate-500 font-semibold"
						/>
					</label>
				</div>
				<div className="mt-10 flex justify-end">
					<button className="btn btn-sm bg-green-700 border-none text-slate-100 px-5">
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
