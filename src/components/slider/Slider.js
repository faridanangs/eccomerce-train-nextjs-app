"use client";
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import slider1 from "public/images/main-banner-1.jpg";
import slider2 from "public/images/main-banner.jpg";

// Ini saya panggil di page app
export default function Banner() {
  return (
    <div className="relative">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
       
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{ delay: 3500 }}
        loop={true}
        className="relative w-full h-[30vh] md:h-[35vh] md:w-[100vw] lg:h-[70vh] h-full"
      >
          
        <SwiperSlide>
          <Image src={slider1} alt="slider img" fill quality={100} className="object-cover" priority />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slider2} alt="slider img" fill quality={100} className="object-cover" priority />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slider1} alt="slider img" fill quality={100} className="object-cover" priority />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slider2} alt="slider img" fill quality={100} className="object-cover" priority />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
