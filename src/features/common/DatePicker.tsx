import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import * as React from 'react';

type CommonDatePickerProps = {
	label?: string;
	value: Dayjs | null;
	onChange: (newValue: Dayjs | null) => void;
};

export const CommonDatePicker: React.FC<CommonDatePickerProps> = ({
	label = 'Select date',
	value,
	onChange,
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<MUIDatePicker label={label} value={value} onChange={onChange} />
		</LocalizationProvider>
	);
};

// // Example usage
// export default function Example() {
// 	const [date, setDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

// 	return (
// 		<div style={{ display: 'flex', gap: '1rem' }}>
// 			<CommonDatePicker
// 				value={date}
// 				onChange={setDate}
// 				label='Controlled Date'
// 			/>
// 			<CommonDatePicker
// 				value={null}
// 				onChange={() => {}}
// 				label='Empty Date'
// 			/>
// 		</div>
// 	);
// }
