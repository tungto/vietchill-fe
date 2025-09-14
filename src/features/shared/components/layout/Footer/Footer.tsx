import { companyLinks, supportLinks } from './constant';
import FooterBottom from './FooterBottom';
import FooterLinks from './FooterLinks';
import FooterLogo from './FooterLogo';
import NewsletterForm from './NewsletterForm';

const Footer = () => {
  return (
    <footer className='bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32 pb-3'>
      <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10'>
        <FooterLogo />
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-8 md:flex md:gap-16'>
          <FooterLinks title='Công ty' links={companyLinks} />
          <FooterLinks title='Hỗ trợ' links={supportLinks} />
          <NewsletterForm />
        </div>
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;
