import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";


export default function Home() {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-[family-name:var(--font-geist-sans)]">
       <Hero />
       <FeaturedProducts/>
       <Categories />
    </div>
  );
}
