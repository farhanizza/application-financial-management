import React from 'react';

export default function NoData(className) {
	return (
		<>
			<div className={`flex justify-center items-center ${className}`}>
				<h1 className="font-semibold text-black">No records available.</h1>
			</div>
		</>
	);
}
