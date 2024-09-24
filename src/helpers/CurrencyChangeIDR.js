export default function formatIDR(number) {
	if (!number) return number;
	const stringValue = number.toString().replace(/[^0-9]/g, '');
	const formattedValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	return `${formattedValue}`;
}
