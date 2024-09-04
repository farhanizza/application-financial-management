import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(id) {
	const list_navbar = ['Home', 'Statistic', 'Goal', 'Settings', 'Logout'];
	return (
		<>
			<div className="navbar bg-green-700 px-10">
				<div className="flex-1">
					<h1 className="text-lg font-bold text-slate-100">Financial</h1>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1">
						{list_navbar.map((list, index) => (
							<li key={index} className="mx-2">
								<Link
									to={
										list.toLowerCase() === 'logout'
											? '/'
											: `/${list.toLowerCase()}/${id?.id}`
									}
									className="text-md font-normal text-slate-100"
								>
									{list}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
