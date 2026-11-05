import Link from 'next/link';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductCardSimple from '@/components/ProductCardSimple';
import Carousel from '@/components/Carousel';
import HeroCarousel from '@/components/home/HeroCarousel';
import TopCategories from '@/components/home/Topcategories';
import { BannerTrio, PromoStrip } from '@/components/home/Promobanners';
import DealOfTheDay from '@/components/home/Dealoftheday';
import CategoryProductSection from '@/components/home/CategoryProductSection';
import { fashionSection, furnitureSection, electronicsSection } from '@/data/categorySections';
import CompactCategoryRow from '@/components/home/Compactcategoryrow';
import ServiceStrip from '@/components/home/Servicestrip';
import { toySection, healthSection } from '@/data/categorySections';
import PromoCards from '@/components/home/PromoCards';
import BestSeller from '@/components/home/Bestseller';
import BrandCarousel from '@/components/home/BrandCarousel';




export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <TopCategories />
      <PromoStrip />
      <DealOfTheDay />
      <BannerTrio />
      <CategoryProductSection data={fashionSection} />
      <CategoryProductSection data={furnitureSection} />
      <CategoryProductSection data={electronicsSection} />
      <CompactCategoryRow sections={[toySection, healthSection]} />
      <ServiceStrip />
      <PromoCards />
      <BestSeller />
      <BrandCarousel />
    </div>
  );
}
