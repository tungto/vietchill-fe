export default function BookingStatusBadge({ status }: { status: string }) {
	const statusColors: Record<string, string> = {
		pending: 'bg-yellow-100 text-yellow-800',
		confirmed: 'bg-blue-100 text-blue-800',
		completed: 'bg-green-100 text-green-800',
		cancelled: 'bg-red-100 text-red-800',
	};

	const statusClass = statusColors[status] || 'bg-gray-100 text-gray-800';

	return (
		<span
			className={`px-3 py-1 rounded-full text-sm font-medium select-none ${statusClass}`}
			aria-label={`Booking status: ${status}`}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</span>
	);
}
