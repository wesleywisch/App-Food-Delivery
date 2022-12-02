import IceCream from '../assets/i1.png';
import Strawberry from '../assets/f1.png';
import MixedKebabPlate from '../assets/c3.png';
import MixedFishKebab from '../assets/fi1.png';

interface HeroDataProps {
  id: string;
  name: string;
  desc: string;
  price: string;
  imgSrc: string;
  category: string;
  calories: string;
  amount: number;
}

export const heroData = [
  {
    id: '1',
    name: 'Ice Cream',
    desc: 'Chocolate & vanilla',
    price: '5.25',
    imgSrc: IceCream,
    amount: 0,
    calories: '12',
    category: 'drinks',
  },
  {
    id: '2',
    name: 'Strawberries',
    desc: 'Fresh Strawberries',
    price: '10.25',
    imgSrc: Strawberry,
    amount: 0,
    calories: '12',
    category: 'drinks',
  },
  {
    id: '3',
    name: 'Chicken Kebab',
    desc: 'Mixed Kebab Plate',
    price: '8.25',
    imgSrc: MixedKebabPlate,
    amount: 0,
    calories: '12',
    category: 'drinks',
  },
  {
    id: '4',
    name: 'Fish Kebab',
    desc: 'Mixed Fish kebab',
    price: '5.25',
    imgSrc: MixedFishKebab,
    amount: 0,
    calories: '12',
    category: 'drinks',
  },
] as HeroDataProps[];