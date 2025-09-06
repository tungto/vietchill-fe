import { FacilitiesResponse } from '@/types/facility';
import FacilityCard from './FacilityCard';
import { getFacilities } from '@/lib/api/facilities';

export default async function HomepageFacilities() {
	const facilities: FacilitiesResponse = await getFacilities();

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
			{facilities.data.slice(0, 6).map((facility) => (
				<FacilityCard key={facility.id} facility={facility} />
			))}
		</div>
	);
}
