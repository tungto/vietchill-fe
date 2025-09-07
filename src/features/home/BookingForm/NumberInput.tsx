import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

type NumberInputProps = {
	label: string;
	icon: React.ReactNode;
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
};

const NumberInput: React.FC<NumberInputProps> = ({
	label,
	icon,
	value,
	onChange,
	min = 0,
	max = 10,
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newValue = Number(event.target.value);
		console.log('newValue', newValue);
		if (newValue < min) newValue = min;
		if (newValue > max) newValue = max;
		onChange(newValue);
	};

	return (
		<TextField
			type='number'
			label={label}
			value={value}
			onChange={handleChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>{icon}</InputAdornment>
				),
				inputProps: { min, max },
			}}
			fullWidth
			variant='outlined'
		/>
	);
};

export default NumberInput;
