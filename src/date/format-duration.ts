export function formatDuration(date1: Date, date2: Date) {
	const elapsed = Math.floor(Math.abs((date2.getTime() - date1.getTime()) / 1000));
	const hours = Math.floor(elapsed / 3600);
	const minutes = Math.floor((elapsed % 3600) / 60);
	const seconds = Math.floor(elapsed % 60);
	return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
