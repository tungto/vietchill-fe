export const mockdata = {
	success: true,
	message: 'Room types retrieved successfully',
	data: [
		{
			id: 1,
			name: 'Phòng Deluxe',
			area: 30,
			price: 1000000,
			quantity: 10,
			adult: 2,
			children: 0,
			description:
				'Phòng Deluxe với diện tích 30m2, phù hợp cho gia đình hoặc nhóm bạn bè.',
			created_at: '2024-11-29T00:00:00.000000Z',
			updated_at: '2024-11-29T00:00:00.000000Z',
			images: [
				{
					id: 1,
					room_type_id: 1,
					path: 'room-1.jpg',
					is_thumbnail: true,
					created_at: '2025-08-12 20:19:57',
				},
				{
					id: 2,
					room_type_id: 1,
					path: 'room-2.jpg',
					is_thumbnail: false,
					created_at: '2025-08-12 20:19:57',
				},
				{
					id: 3,
					room_type_id: 1,
					path: 'room-3.jpg',
					is_thumbnail: false,
					created_at: '2025-08-12 20:19:57',
				},
			],
			facilities: [
				{
					id: 1,
					name: 'wifi',
					content: 'Wi-Fi',
					description:
						'Kết nối Internet tốc độ cao, miễn phí trong toàn bộ khách sạn, giúp bạn dễ dàng làm việc hoặc giải trí trực tuyến.',
					pivot: {
						room_type_id: 1,
						facility_id: 1,
					},
				},
				{
					id: 2,
					name: 'conditioner',
					content: 'Máy Lạnh',
					description:
						'Hệ thống điều hòa không khí hiện đại, mang lại không gian thoải mái và dễ chịu, phù hợp với mọi điều kiện thời tiết.',
					pivot: {
						room_type_id: 1,
						facility_id: 2,
					},
				},
				{
					id: 3,
					name: 'tv',
					content: 'Truyền Hình',
					description:
						'TV màn hình phẳng với đa dạng kênh giải trí trong nước và quốc tế, đáp ứng nhu cầu thư giãn của khách hàng.',
					pivot: {
						room_type_id: 1,
						facility_id: 3,
					},
				},
				{
					id: 4,
					name: 'desk',
					content: 'Bàn làm việc',
					description:
						'Trang bị bàn làm việc tiện nghi, phù hợp cho cả công tác và nghỉ dưỡng.',
					pivot: {
						room_type_id: 1,
						facility_id: 4,
					},
				},
				{
					id: 5,
					name: 'heater',
					content: 'Máy Sưởi',
					description:
						'Hệ thống sưởi ấm chất lượng cao, giữ không gian ấm áp, đặc biệt phù hợp vào những ngày lạnh giá.',
					pivot: {
						room_type_id: 1,
						facility_id: 5,
					},
				},
				{
					id: 6,
					name: 'water-heater',
					content: 'Máy Nước Nóng',
					description:
						'Máy nước nóng tiện lợi, cung cấp nước nóng tức thì, đảm bảo sự thoải mái khi sử dụng phòng tắm.',
					pivot: {
						room_type_id: 1,
						facility_id: 6,
					},
				},
				{
					id: 7,
					name: 'safe',
					content: 'Két sắt',
					description:
						'Két sắt điện tử giúp quý khách yên tâm cất giữ vật dụng có giá trị.',
					pivot: {
						room_type_id: 1,
						facility_id: 7,
					},
				},
				{
					id: 8,
					name: 'fridge',
					content: 'Tủ lạnh',
					description:
						'Tủ lạnh mini tiện dụng, giữ lạnh thực phẩm và đồ uống.',
					pivot: {
						room_type_id: 1,
						facility_id: 8,
					},
				},
				{
					id: 9,
					name: 'kettle',
					content: 'Bình siêu tốc',
					description:
						'Bình đun siêu tốc hỗ trợ pha trà, cà phê ngay trong phòng.',
					pivot: {
						room_type_id: 1,
						facility_id: 9,
					},
				},
				{
					id: 10,
					name: 'minibar',
					content: 'Minibar',
					description:
						'Minibar với các loại thức uống và đồ ăn nhẹ được tuyển chọn.',
					pivot: {
						room_type_id: 1,
						facility_id: 10,
					},
				},
			],
			features: [
				{
					id: 1,
					name: 'bedroom',
					content: 'Phòng ngủ',
					pivot: {
						room_type_id: 1,
						feature_id: 1,
					},
				},
				{
					id: 2,
					name: 'balcony',
					content: 'Ban công',
					pivot: {
						room_type_id: 1,
						feature_id: 2,
					},
				},
				{
					id: 3,
					name: 'kitchen',
					content: 'Nhà bếp',
					pivot: {
						room_type_id: 1,
						feature_id: 3,
					},
				},
				{
					id: 4,
					name: 'garden-view',
					content: 'Hướng sân vườn',
					pivot: {
						room_type_id: 1,
						feature_id: 4,
					},
				},
				{
					id: 5,
					name: 'lake-view',
					content: 'Hướng hồ',
					pivot: {
						room_type_id: 1,
						feature_id: 5,
					},
				},
				{
					id: 6,
					name: 'forest-view',
					content: 'Hướng rừng thông',
					pivot: {
						room_type_id: 1,
						feature_id: 6,
					},
				},
				{
					id: 7,
					name: 'city-view',
					content: 'Hướng thành phố',
					pivot: {
						room_type_id: 1,
						feature_id: 7,
					},
				},
				{
					id: 8,
					name: 'single-bed',
					content: 'Giường đơn',
					pivot: {
						room_type_id: 1,
						feature_id: 8,
					},
				},
				{
					id: 9,
					name: 'double-bed',
					content: 'Giường đôi',
					pivot: {
						room_type_id: 1,
						feature_id: 9,
					},
				},
				{
					id: 10,
					name: 'Interconnecting-room',
					content: 'Phòng thông nhau',
					pivot: {
						room_type_id: 1,
						feature_id: 10,
					},
				},
			],
		},
		{
			id: 2,
			name: 'Phòng Premium',
			area: 40,
			price: 1500000,
			quantity: 8,
			adult: 2,
			children: 0,
			description:
				'Phòng Premium với diện tích 40m2, phù hợp cho gia đình hoặc nhóm bạn bè.',
			created_at: '2024-11-29T00:00:00.000000Z',
			updated_at: '2024-11-29T00:00:00.000000Z',
			images: [
				{
					id: 4,
					room_type_id: 2,
					path: 'room-4.jpg',
					is_thumbnail: false,
					created_at: '2025-08-12 20:19:57',
				},
				{
					id: 5,
					room_type_id: 2,
					path: 'room-5.jpg',
					is_thumbnail: false,
					created_at: '2025-08-12 20:19:57',
				},
				{
					id: 6,
					room_type_id: 2,
					path: 'room-6.jpg',
					is_thumbnail: false,
					created_at: '2025-08-12 20:19:57',
				},
			],
			facilities: [],
			features: [],
		},
		{
			id: 3,
			name: 'Phòng Suite',
			area: 50,
			price: 2000000,
			quantity: 6,
			adult: 2,
			children: 0,
			description:
				'Phòng Suite với diện tích 50m2, phù hợp cho gia đình hoặc nhóm bạn bè.',
			created_at: '2024-11-29T00:00:00.000000Z',
			updated_at: '2024-11-29T00:00:00.000000Z',
			images: [
				{
					id: 7,
					room_type_id: 3,
					path: 'room-7.jpg',
					is_thumbnail: true,
					created_at: '2025-08-12 20:19:57',
				},
				{
					id: 8,
					room_type_id: 3,
					path: 'room-8.jpg',
					is_thumbnail: false,
					created_at: '2025-08-12 20:19:57',
				},
			],
			facilities: [],
			features: [],
		},
		{
			id: 4,
			name: 'Phòng Presidential',
			area: 100,
			price: 5000000,
			quantity: 2,
			adult: 2,
			children: 0,
			description:
				'Phòng Presidential với diện tích 100m2, phù hợp cho gia đình hoặc nhóm bạn bè.',
			created_at: '2024-11-29T00:00:00.000000Z',
			updated_at: '2024-11-29T00:00:00.000000Z',
			images: [
				{
					id: 9,
					room_type_id: 4,
					path: 'room-9.jpg',
					is_thumbnail: true,
					created_at: '2025-08-12 20:19:57',
				},
			],
			facilities: [],
			features: [],
		},
	],
	pagination: {
		total: 4,
		current_page: 1,
		limit: 10,
		last_page: 1,
	},
	filters_applied: {
		search: null,
		price_range: {
			min: null,
			max: null,
		},
		area_range: {
			min: null,
			max: null,
		},
		capacity: {
			adult: null,
			children: null,
		},
		facilities: null,
		features: null,
		sort: {
			by: 'price',
			order: 'asc',
		},
	},
};
