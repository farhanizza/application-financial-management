function capitalizeLetter(name) {
	let str = name.split(' ');

	for (var i = 0, x = str.length; i < x; i++) {
		str[i] = str[i][0].toUpperCase() + str[i].substr(1);
	}

	return str.join(' ');
}

export default capitalizeLetter;
