import React, { useState } from 'react';
import auth_page from '../assets/image/auth_page.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcryptjs from 'bcryptjs';

export default function Login() {
	const [Username, setUsername] = useState('');
	const [Password, setPassword] = useState('');
	const [Email, setEmail] = useState('');
	const [error, seterror] = useState(false);
	const navigate = useNavigate();

	const sendData = async (e) => {
		e.preventDefault();
		try {
			const data = {
				username: Username,
				email: Email,
				password: await bcryptjs.hash(Password, 10),
			};
			const response = await axios.post('http://localhost:3001/users', data, {
				headers: {
					'Content-type': 'application/json',
				},
			});

			navigate('/');
		} catch (error) {
			seterror(true);
			console.log(error.response ? error.response.data : error.message);
		}
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
										Email
									</span>
								</div>
								<input
									type="email"
									placeholder="Type email here"
									className="input input-sm input-bordered bg-gray-200 text-black"
									onChange={(e) => {
										setEmail(e.target.value);
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
							</label>
						</div>
						<div className="mt-10">
							<button
								className="btn btn-md w-full bg-green-700 border-none text-slate-100 hover:bg-green-800"
								onClick={sendData}
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
