import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Notfound from './pages/Notfound';
import Goal from './pages/Goal';
import GoalDetail from './pages/GoalDetail';
import Settings from './pages/Settings';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home/:id" element={<Dashboard />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/statistic/:id"
					element={<Statistics name="Statistics" />}
				/>
				<Route path="/goal/:id" element={<Goal name="Goal" />} />
				<Route path="/goal/detail/:id" element={<GoalDetail />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="*" element={<Notfound />} />
			</Routes>
		</BrowserRouter>
	);
}
