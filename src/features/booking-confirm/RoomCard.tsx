import Image from 'next/image';

type RoomCardProps = {
	name: string;
	price: number;
	imageUrl: string;
};

export default function RoomCard({ name, price, imageUrl }: RoomCardProps) {
	return (
		<div className='rounded-xl border shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-2xl'>
			<Image
				src={imageUrl}
				alt={name}
				className='w-full h-72 md:h-80 object-cover rounded-t-xl'
				width={500}
				height={900}
			/>

			<div className='p-6'>
				<h2 className='text-xl font-semibold mb-2'>{name}</h2>
				<p className='text-indigo-600 font-bold text-lg'>
					{price.toLocaleString('vi-VN')} VND / đêm
				</p>
			</div>
		</div>
	);
}
