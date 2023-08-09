"use client";

import NavbarBottom from "@/components/navbar/NavbarBottom";
import Products from "@/components/products/Products";
import Service from "@/components/service/Service";
import Banner from "@/components/slider/Slider";
export default function Home() {
  return (
    <main>
      <div className="max-w-screen-2xl mx-auto">
        <NavbarBottom/>
        <Banner />
        <Service/>
        <Products />
      </div>
    </main>
  );
}
