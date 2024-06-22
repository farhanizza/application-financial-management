import React, { useState } from 'react';
import auth_page from '../assets/image/auth_page.png';
import { Link } from 'react-router-dom';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const sendData = (e) => {
		// Send to backend
		console.log(username);
		console.log(password);
	};
	return (
		<>
			<div className="flex bg-slate-100 h-screen">
				<img src={auth_page} alt="" className="w-1/4" />
				<div className="flex flex-col justify-center items-center w-full">
					<div className="max-w-lg mb-10">
						<h1 className="font-bold text-4xl font-poppins text-gray-800">
							Application Management Financial
						</h1>
						<div className="mt-10">
							<label className="form-control">
								<div className="label">
									<span className="label-text text-gray-800 font-semibold text-md mb-2">
										Username
									</span>
								</div>
								<input
									type="text"
									placeholder="Type username here"
									className="input input-sm input-bordered bg-gray-200 text-black"
									onChange={(e) => {
										setUsername(e.target.value);
									}}
								/>
							</label>
						</div>
						<div className="mt-5">
							<label className="form-control">
								<div className="label">
									<span className="label-text text-gray-800 font-semibold text-md mb-2">
										Password
									</span>
								</div>
								<input
									type="password"
									placeholder="Type password here"
									className="input input-sm input-bordered bg-gray-200 text-black"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
								<div className="label flex justify-end">
									<Link to="#">
										<span className="label-text-alt text-black font-bold">
											Forgot?
										</span>
									</Link>
								</div>
							</label>
						</div>
						<div className="mt-7">
							<Link to="/home">
								<button
									className="btn btn-md w-full bg-green-700 border-none text-slate-100 hover:bg-green-800"
									onClick={sendData}
								>
									Sign In
								</button>
							</Link>
						</div>
						<div className="mt-3">
							<div className="flex justify-center">
								<span className="font-bold text-black">
									Don't have an account?{' '}
									<Link to="/register" className="text-green-700">
										Sign up
									</Link>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
