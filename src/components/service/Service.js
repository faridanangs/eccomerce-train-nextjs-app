import Image from "next/image";
import service_1 from "/public/images/service.png";
import service_2 from "/public/images/service-02.png";
import service_3 from "/public/images/service-03.png";
import service_4 from "/public/images/service-04.png";
import service_5 from "/public/images/service-05.png";
import { Merriweather_Sans } from "next/font/google";

const MerriweatherSans = Merriweather_Sans({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
});

export default function Service() {
  return (
    <section className="flex justify-center px-4 bg-slate-400 pt-10 pb-14 rounded-b-3xl">
      <div className="grid grid-cols-5 w-full md:px-2">
        <div className="mb-3 flex flex-col items-center text-center">
          <Image
            src={service_1}
            alt="service 1"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-white px-2 py-1 rounded-md object-contain"
          />
          <h1
            className={`text-white text-[12px] md:text-[16px] my-2 ${MerriweatherSans.className}`}
          >
            Service
          </h1>
        </div>
        <div className="mb-3 flex flex-col items-center text-center">
          <Image
            src={service_2}
            alt="service 1"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]  bg-white px-2 py-1 rounded-md object-contain"
          />
          <h1
            className={`text-white text-[12px] md:text-[16px] my-2 ${MerriweatherSans.className}`}
          >
            Service
          </h1>
        </div>
        <div className="mb-3 flex flex-col items-center text-center">
          <Image
            src={service_3}
            alt="service 1"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]  bg-white px-2 py-1 rounded-md object-contain"
          />
          <h1
            className={`text-white text-[12px] md:text-[16px] my-2 ${MerriweatherSans.className}`}
          >
            Service
          </h1>
        </div>
        <div className="mb-3 flex flex-col items-center text-center">
          <Image
            src={service_4}
            alt="service 1"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]  bg-white px-2 py-1 rounded-md object-contain"
          />
          <h1
            className={`text-white text-[12px] md:text-[16px] my-2 ${MerriweatherSans.className}`}
          >
            Service
          </h1>
        </div>
        <div className="mb-3 flex flex-col items-center text-center">
          <Image
            src={service_5}
            alt="service 1"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]  bg-white px-2 py-1 rounded-md object-contain"
          />
          <h1
            className={`text-white text-[12px] md:text-[16px] my-2 ${MerriweatherSans.className}`}
          >
            Service
          </h1>
        </div>
        <div className="mb-3 flex flex-col items-center text-center">
          <Image
            src={service_1}
            alt="service 1"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]  bg-white px-2 py-1 rounded-md object-contain"
          />
          <h1
            className={`text-white text-[12px] md:text-[16px] my-2 ${MerriweatherSans.className}`}
          >
            Service
          </h1>
        </div>
        <div className="mb-3 flex flex-col items-center text-center">
          <Image
            src={service_2}
            alt="service 1"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]  bg-white px-2 py-1 rounded-md object-contain"
          />
          <h1
            className={`text-white text-[12px] md:text-[16px] my-2 ${MerriweatherSans.className}`}
          >
            Service
          </h1>
        </div>
        <div className="mb-3 flex flex-col items-center text-center">
          <Image
            src={service_3}
            alt="service 1"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]  bg-white px-2 py-1 rounded-md object-contain"
          />
          <h1
            className={`text-white text-[12px] md:text-[16px] my-2 ${MerriweatherSans.className}`}
          >
            Service
          </h1>
        </div>
        <div className="mb-3 flex flex-col items-center text-center">
          <Image
            src={service_4}
            alt="service 1"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]  bg-white px-2 py-1 rounded-md object-contain"
          />
          <h1
            className={`text-white text-[12px] md:text-[16px] my-2 ${MerriweatherSans.className}`}
          >
            Service
          </h1>
        </div>
        <div className="mb-3 flex flex-col items-center text-center">
          <Image
            src={service_5}
            alt="service 1"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]  bg-white px-2 py-1 rounded-md object-contain"
          />
          <h1
            className={`text-white text-[12px] md:text-[16px] my-2 ${MerriweatherSans.className}`}
          >
            Service
          </h1>
        </div>
      </div>
    </section>
  );
}
