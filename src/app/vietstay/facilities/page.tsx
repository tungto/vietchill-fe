import { getFacilities } from '@/lib/api/facilities';
import { coloredIconMap } from '@/lib/iconMap';
import { FaCheck, FaHotel, FaStar } from 'react-icons/fa';

const FacilitiesPage = async () => {
	const facilities = await getFacilities();

	const stats = [
		{ label: 'Facilities Available', value: '10+', icon: FaHotel },
		{ label: 'Premium Services', value: '24/7', icon: FaStar },
		{ label: 'Satisfaction Rate', value: '98%', icon: FaCheck },
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 mt-16'>
			{/* Hero Section */}
			<div className='relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white'>
				<div className='absolute inset-0 bg-black/20'></div>
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200'>
							Hotel Facilities
						</h1>
						<p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed'>
							Discover our premium amenities designed to make your
							stay comfortable, productive, and memorable
						</p>
					</div>
				</div>
			</div>

			{/* Stats Section */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{stats.map((stat, index) => (
						<div
							key={index}
							className='bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100'>
							<stat.icon className='text-4xl text-blue-600 mx-auto mb-4' />
							<div className='text-3xl font-bold text-gray-900 mb-2'>
								{stat.value}
							</div>
							<div className='text-gray-600 font-medium'>
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Main Facilities Section */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
						Premium Room Amenities
					</h2>
					<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
						Every room is thoughtfully equipped with modern
						conveniences to ensure your comfort and satisfaction
					</p>
				</div>

				{/* Facilities Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{facilities.data.map((facility) => {
						return (
							<div
								key={facility.id}
								className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden hover:-translate-y-1'>
								<div className='p-8'>
									<div className='flex items-center mb-6'>
										<div
											className={`p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 group-hover:from-blue-50 group-hover:to-indigo-50 transition-colors duration-300`}>
											{coloredIconMap[facility.name] ? (
												coloredIconMap[facility.name]
											) : (
												<span className='w-8 h-8 bg-gray-200 rounded-full' />
											)}
										</div>
										<h3 className='text-xl font-bold text-gray-900 ml-4'>
											{facility.content}
										</h3>
									</div>

									<p className='text-gray-600 leading-relaxed'>
										{facility.description}
									</p>

									<div className='mt-6 pt-4 border-t border-gray-100'>
										<span className='inline-flex items-center text-sm font-medium text-blue-600'>
											<FaCheck className='mr-2 text-green-500' />
											Included in all rooms
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Additional Services Section */}
			<div className='bg-gradient-to-r from-gray-900 to-blue-900 text-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
					<div className='text-center'>
						<h2 className='text-3xl md:text-4xl font-bold mb-6'>
							Need More Information?
						</h2>
						<p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
							Our concierge team is available 24/7 to assist you
							with any questions about our facilities and services
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl'>
								Contact Concierge
							</button>
							<button className='border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-xl transition-colors duration-300'>
								View Room Types
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FacilitiesPage;
