import Link from 'next/link';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductCardSimple from '@/components/ProductCardSimple';
import Carousel from '@/components/Carousel';
import HeroCarousel from '@/components/home/HeroCarousel';


export default function Home() {
  return (
    <div>
       <HeroCarousel />
    </div>
  );
}
