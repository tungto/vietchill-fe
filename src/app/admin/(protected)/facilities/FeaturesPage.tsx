// pages/admin/facilities.tsx
import { FacilitiesResponse, Facility, Pagination } from '@/types/admin';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { createFacility, getFacilities } from './api';
import CreateFacilityForm from './CreateFacilityForm';
import FacilityList from './FacilityList';

interface FacilitiesPageProps {
	initialFacilities: FacilitiesResponse;
}

const FacilitiesPage: React.FC<FacilitiesPageProps> = ({
	initialFacilities,
}) => {
	const [facilities, setFacilities] = useState<Facility[]>(
		initialFacilities.data
	);
	const [pagination, setPagination] = useState<Pagination>(
		initialFacilities.pagination
	);

	// Function to handle page change for pagination
	const handlePageChange = async (page: number) => {
		if (page < 1 || page > pagination.last_page) return;
		const newFacilities = await getFacilities(10, page);
		setFacilities(newFacilities.data);
		setPagination(newFacilities.pagination);
	};

	// Function to create a new facility
	const handleCreateFacility = async (data: Omit<Facility, 'id'>) => {
		const newFacility = await createFacility(data);
		setFacilities((prev) => [...prev, newFacility.data]); // Add new facility to the list
	};

	return (
		<div className='container mx-auto p-8'>
			<h1 className='text-3xl font-semibold mb-6'>
				Admin Dashboard - Facilities
			</h1>

			{/* Create Facility Form */}
			<CreateFacilityForm onCreate={handleCreateFacility} />

			{/* List of Facilities */}
			<FacilityList
				facilities={facilities}
				pagination={pagination}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const initialFacilities = await getFacilities(10, 1); // Fetch the first page
	return { props: { initialFacilities } };
};

export default FacilitiesPage;
