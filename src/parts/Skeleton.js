import React from 'react';

export default function Skeleton({
	size = 'h-4',
	widthSize = 'w-52',
	color = 'bg-red-300',
}) {
	return (
		<div className={`flex ${widthSize} flex-col gap-4`}>
			<div className={`skeleton ${color} ${size} w-full`}></div>
		</div>
	);
}
