import { Box, Typography } from '@mui/material';
import React from 'react';

const AboutUs = () => {
	return (
		<Box className='flex justify-center flex-col items-center gap-4 mt-10 m-16'>
			<Typography variant='h3' textAlign='center'>
				Về Chúng tôi
			</Typography>
			<hr style={{ width: 500, margin: '0 auto' }} />
			<Typography>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
				corrupti, odit aut, totam porro in quod neque quas mollitia
				dicta eius vero? Delectus debitis atque rerum maiores porro
				aliquid assumenda.
			</Typography>
		</Box>
	);
};

export default AboutUs;
