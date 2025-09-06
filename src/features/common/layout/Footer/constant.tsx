import {
	FaFacebookF,
	FaInstagram,
	FaLinkedinIn,
	FaTwitter,
} from 'react-icons/fa';

// Mock data
export const companyLinks = [
	{ label: 'About', href: 'about-ú' },
	{ label: 'Careers', href: '#' },
	{ label: 'Press', href: '#' },
	{ label: 'Blog', href: '#' },
	{ label: 'Partners', href: '#' },
];

export const supportLinks = [
	{ label: 'Help Center', href: 'contact-us' },
	{ label: 'Safety Information', href: '#' },
	{ label: 'Cancellation Options', href: '#' },
	{ label: 'Contact Us', href: '#' },
	{ label: 'Accessibility', href: '#' },
];

export const bottomLinks = [
	{ label: 'Privacy', href: '#' },
	{ label: 'Terms', href: '#' },
	{ label: 'Sitemap', href: '#' },
];

export const socialLinks = [
	{ icon: <FaInstagram size={18} />, href: '#', label: 'Instagram' },
	{ icon: <FaFacebookF size={18} />, href: '#', label: 'Facebook' },
	{ icon: <FaTwitter size={18} />, href: '#', label: 'Twitter' },
	{ icon: <FaLinkedinIn size={18} />, href: '#', label: 'LinkedIn' },
];
