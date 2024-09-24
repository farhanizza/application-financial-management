function greetUser(timeString) {
	const date = new Date(timeString);

	const hours = date;

	let greeting;

	if (hours >= 0 && hours < 12) {
		greeting = 'Good Morning!';
	} else if (hours >= 12 && hours < 18) {
		greeting = 'Good Afternoon!';
	} else {
		greeting = 'Good Night!';
	}

	return greeting;
}

export default greetUser;
