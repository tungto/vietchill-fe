import React, { JSX, ReactNode } from 'react';
import { BiFridge } from 'react-icons/bi';
import {
  FaBath,
  FaFireAlt,
  FaGlassMartiniAlt,
  FaLock,
  FaShower,
  FaSnowflake,
  FaSnowman,
  FaTv,
  FaUtensils,
  FaWifi,
} from 'react-icons/fa';
import { GiClothes, GiTeapot } from 'react-icons/gi';
import {
  MdOutlineBalcony,
  MdOutlineBedroomParent,
  MdOutlineDesk,
  MdOutlineHolidayVillage,
  MdOutlineKingBed,
  MdOutlineKitchen,
  MdOutlineLandscape,
  MdOutlineLocalDrink,
  MdOutlineSecurity,
  MdWaterDrop,
} from 'react-icons/md';

export const coloredIconMap: Record<string, ReactNode> = {
  wifi: <FaWifi className='w-8 h-8 text-blue-500' />,
  conditioner: <FaSnowflake className='w-8 h-8 text-cyan-500' />,
  tv: <FaTv className='w-8 h-8 text-purple-500' />,
  desk: <MdOutlineDesk className='w-8 h-8 text-amber-600' />,
  heater: <FaFireAlt className='w-8 h-8 text-red-500' />,
  'water-heater': <MdWaterDrop className='w-8 h-8 text-orange-500' />,
  safe: <MdOutlineSecurity className='w-8 h-8 text-gray-600' />,
  fridge: <BiFridge className='w-8 h-8 text-sky-600' />,
  kettle: <GiTeapot className='w-8 h-8 text-green-600' />,
  minibar: <MdOutlineLocalDrink className='w-8 h-8 text-pink-500' />,
  shower: <FaShower className='w-8 h-8 text-indigo-500' />,
  wardrobe: <GiClothes className='w-8 h-8 text-yellow-600' />,
  bathub: <FaBath className='w-8 h-8 text-teal-500' />,
};

export const coloredMiniIconMap: Record<string, React.ReactNode> = {
  wifi: <FaWifi className='w-4 h-4 text-blue-500' />,
  conditioner: <FaSnowflake className='w-4 h-4 text-cyan-500' />,
  tv: <FaTv className='w-4 h-4 text-purple-500' />,
  desk: <MdOutlineDesk className='w-4 h-4 text-amber-600' />,
  heater: <FaFireAlt className='w-4 h-4 text-red-500' />,
  'water-heater': <MdWaterDrop className='w-4 h-4 text-orange-500' />,
  safe: <MdOutlineSecurity className='w-4 h-4 text-gray-600' />,
  fridge: <BiFridge className='w-4 h-4 text-sky-600' />,
  kettle: <GiTeapot className='w-4 h-4 text-green-600' />,
  minibar: <MdOutlineLocalDrink className='w-4 h-4 text-pink-500' />,
  shower: <FaShower className='w-4 h-4 text-indigo-500' />,
  wardrobe: <GiClothes className='w-4 h-4 text-yellow-600' />,
  bathub: <FaBath className='w-4 h-4 text-teal-500' />,
};

// Icon Mapping
export const simpleIconsMap: Record<string, JSX.Element> = {
  wifi: <FaWifi />,
  conditioner: <FaSnowflake />,
  tv: <FaTv />,
  desk: <MdOutlineDesk />,
  heater: <FaSnowman />,
  'water-heater': <FaUtensils />,
  safe: <FaLock />,
  fridge: <FaGlassMartiniAlt />,
  kettle: <FaUtensils />,
  minibar: <FaGlassMartiniAlt />,
  bedroom: <MdOutlineBedroomParent />,
  balcony: <MdOutlineBalcony />,
  kitchen: <MdOutlineKitchen />,
  'garden-view': <MdOutlineLandscape />,
  'lake-view': <MdOutlineLandscape />,
  'forest-view': <MdOutlineLandscape />,
  'city-view': <MdOutlineHolidayVillage />,
  'single-bed': <MdOutlineKingBed />,
  'double-bed': <MdOutlineKingBed />,
  'interconnecting-room': <MdOutlineBedroomParent />,
};

// export const simpleFeatureIcons: Record<string, JSX.Element> = {
// 	bedroom: <MdOutlineBedroomParent />,
// 	balcony: <MdOutlineBalcony />,
// 	kitchen: <MdOutlineKitchen />,
// 	'garden-view': <MdOutlineLandscape />,
// 	'lake-view': <MdOutlineLandscape />,
// 	'forest-view': <MdOutlineLandscape />,
// 	'city-view': <MdOutlineHolidayVillage />,
// 	'single-bed': <MdOutlineKingBed />,
// 	'double-bed': <MdOutlineKingBed />,
// 	'interconnecting-room': <MdOutlineBedroomParent />,
// };

// const facilityIconMap: Record<string, React.ReactNode> = {
// 	wifi: <FiWifi size={18} />,
// 	conditioner: <MdOutlineAcUnit size={18} />,
// 	tv: <FiTv size={18} />,
// 	desk: <FiCoffee size={18} />,
// 	heater: <FiSun size={18} />,
// 	'water-heater': <GiAlarmClock size={18} />,
// 	safe: <FiShield size={18} />,
// 	fridge: <BiFridge size={18} />,
// 	kettle: <GiTeapot size={18} />,
// 	minibar: <MdKitchen size={18} />,
// };
