/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}', // For App Router projects
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	important: '#root',
	theme: {
		extend: {},
	},
	plugins: [],
};
