import React, { useEffect, useState } from 'react';
import Navbar from '../parts/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../helpers/hooks/useFetch';
import bcryptjs from 'bcryptjs';
import axios from 'axios';

export default function Settings() {
	const navigate = useNavigate();
	const { id } = useParams();

	const { data, error, loading } = useFetch(
		`http://localhost:3001/users/${id}`
	);

	const [Username, setUsername] = useState('');
	const [Password, setPassword] = useState('');
	const [Email, setEmail] = useState('');

	useEffect(() => {
		if (data) {
			setUsername(data.username || '');
			setPassword(data.password || '');
			setEmail(data.email || '');
		}
	}, [data]);

	const handleUpdateSaved = async (id) => {
		try {
			const data = {
				username: Username,
				email: Email,
				password: await bcryptjs.hash(Password, 10),
			};

			await axios.patch(`http://localhost:3001/users/${id}`, data).then(() => {
				navigate(`/home/${id}`);
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="bg-slate-100 h-screen">
			<Navbar id={data?.id} />
			<div className="flex justify-center mt-20">
				<div className="avatar">
					<div className="w-28 rounded-full">
						<img src={`../../assets/image/photo.png`} />
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
							value={Username}
							className="input input-bordered input-sm w-full bg-transparent border-slate-500 font-semibold"
							onChange={(e) => setUsername(e.target.value)}
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
							value={Email}
							className="input input-bordered input-sm w-full bg-transparent border-slate-500 font-semibold"
							onChange={(e) => setEmail(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
				</div>
				<div className="mt-10 flex justify-end">
					<button
						className="btn btn-sm bg-green-700 border-none text-slate-100 px-5"
						onClick={() => handleUpdateSaved(id)}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
