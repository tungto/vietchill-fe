import NewsletterForm from './NewsletterForm';
import { bottomLinks, companyLinks, supportLinks } from './constant';
import FooterBottom from './FooterBottom';
import FooterLinks from './FooterLinks';
import FooterLogo from './FooterLogo';

export const NAV_LINKS = [
	{ href: '/', label: 'Trang chủ' },
	{ href: '/rooms', label: 'Danh sách phòng' },
	{ href: '/facilities', label: 'Tiện ích' },
	{ href: '/contact', label: 'Liên hệ' },
	{ href: '/about-us', label: 'Về chúng tôi' },
];

const Footer = () => {
	return (
		<footer className='bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32 pb-3'>
			<div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10'>
				<FooterLogo />
				<div className='grid grid-cols-2 sm:grid-cols-3 gap-8 md:flex md:gap-16'>
					<FooterLinks title='Company' links={companyLinks} />
					<FooterLinks title='Support' links={supportLinks} />
					<NewsletterForm />
				</div>
			</div>
			<FooterBottom />
		</footer>
	);
};

export default Footer;
