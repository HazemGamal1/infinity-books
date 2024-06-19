"use client"
import Hero from "./components/Hero";
import banner from '@/public/banner.png'
import banner2 from '@/public/banner2.png'
import CategoryShowcase from "./components/CategoryShowcase";
import Image from "next/image";

export default function Home() {
  

  return (
    <main>
        {/* Hero section */}
        <Hero />
        <CategoryShowcase text="Top books of the month" category="Top Of The Month" categoryIndex={1} apiCall="Top Of The Month"/>
        <CategoryShowcase text="Fiction" category="Fiction" categoryIndex={0} apiCall="Fiction"/>
        <CategoryShowcase text="Romance" category="Romance" categoryIndex={0} apiCall="Romance"/>
        <CategoryShowcase text="Self Help" category="Self Help" categoryIndex={0} apiCall="Self Help"/> 
    </main>
  );
}
