import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';

// Mock data
export const companyLinks = [
  { label: 'Về chúng tôi', href: 'about' },
  { label: 'Nghề nghiệp', href: '#' },
  { label: 'Báo chí', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Đối tác', href: '#' },
];

export const supportLinks = [
  { label: 'Trung tâm hỗ trợ', href: 'contact' },
  { label: 'Thông tin an toàn', href: '#' },
  { label: 'Chính sách hủy phòng', href: '#' },
  { label: 'Liên hệ', href: '#' },
];

export const bottomLinks = [
  { label: 'Chính sách bảo mật', href: '#' },
  { label: 'Điều khoản dịch vụ', href: '#' },
  { label: 'Sitemap', href: '#' },
];

export const socialLinks = [
  { icon: <FaInstagram size={18} />, href: '#', label: 'Instagram' },
  { icon: <FaFacebookF size={18} />, href: '#', label: 'Facebook' },
  { icon: <FaTwitter size={18} />, href: '#', label: 'Twitter' },
  { icon: <FaLinkedinIn size={18} />, href: '#', label: 'LinkedIn' },
];
