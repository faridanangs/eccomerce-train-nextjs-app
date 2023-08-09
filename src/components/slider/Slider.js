"use client";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import slider1 from "public/images/main-banner-1.jpg";
import slider2 from "public/images/main-banner.jpg";

// Ini saya panggil di page app
export default function Banner() {
  return (
    <div className="relative">
      <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} showIndicators={true} 
      showThumbs={false} interval={4000} showArrows={false}
      >
        <div>
          <Image priority quality={100} src={slider1} alt="Slider 1" />
        </div>
        <div>
          <Image priority quality={100} src={slider2} alt="Slider 2" />
        </div>
        <div>
          <Image priority quality={100} src={slider1} alt="Slider 1" />
        </div>
        <div>
          <Image priority quality={100} src={slider2} alt="Slider 2" />
        </div>
      </Carousel>
    </div>
  );
}
