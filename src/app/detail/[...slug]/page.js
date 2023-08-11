"use client";
import {
  addToCart,
  getDataProducts,
  productsEntity,
} from "@/redux/sliceComponent/productSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Merriweather, Merriweather_Sans } from "next/font/google";
import { BiCartAdd } from "react-icons/bi";
import Link from "next/link";
import { BiCheck } from "react-icons/bi";
import { MdArrowBackIos } from "react-icons/md";

const merriweather700 = Merriweather({
  weight: ["700"],
  display: "swap",
  subsets: ["latin"],
});
const merriweather900 = Merriweather({
  weight: ["900"],
  display: "swap",
  subsets: ["latin"],
});

const MerriweatherSans4Def = Merriweather_Sans({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
});

export default function DetailProduct({ params }) {
  const [notif, setNotif] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const product = useSelector((state) =>
    productsEntity.selectById(state, params.slug[params.slug.length - 1])
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataProducts());
  }, [dispatch]);

  // Jika url tidak di temukan
  if (!product) {
    return (
      <main className="w-full h-screen">
        <section className="p-1 flex items-center h-[60vh]">
          <div className="w-full flex text-center justify-center items-center flex-col">
            <h1 className="text-2xl text-red-700">Product Tidak Di Temukan</h1>
            <Link href="/" className={`link ${MerriweatherSans4Def.className}`}>
              Kembali ke halaman utama
            </Link>
          </div>
        </section>
      </main>
    );
  }
  return (
    <main className="relative lg:h-screen lg:px-8">
      {/* Tombol kembali */}
      <div >
        <Link href="/" className="flex items-center gap-2 px-4 py-2 md:py-4">
          <MdArrowBackIos className="text-xl md:text-3xl" />
        <h1 className={`text-xl md:text-2xl ${MerriweatherSans4Def.className}`}>
          {params.slug[0].length > 30
            ? decodeURIComponent(params.slug[0].slice(0, 28).replace(/_/g, " ")) + "..."
            : decodeURIComponent(params.slug[0]).replace(/_/g, " ")}
        </h1>{" "}
        </Link>
      </div>
      <section className="p-1 md:flex md:gap-2 md:p-4 md:items-start h-screen">
        {/* Image content */}
        {product ? (
          <div className="overflow-x-hidden md:flex-1">
            <Image
              src={currentImage ? currentImage : product.thumbnail}
              alt={product.title}
              priority
              quality={100}
              width={200}
              height={200}
              className="object-contain w-full bg-white/20 max-h-[200px] min-h-[200px] md:max-w-[350px] md:min-w-[350px] lg:max-w-[450px] lg:min-w-[450px]"
            />
            <div className="flex justify-start w-full px-4 overflow-x-scroll gap-2 mt-4">
              {product.images ? (
                product.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrentImage(img)}
                    className="cursor-pointer"
                  >
                    <Image
                      src={img}
                      alt={product.title}
                      quality={100}
                      priority
                      width={60}
                      height={60}
                      className={`object-contain max-w-[60px] min-h-[60px] bg-white min-w-[60px] max-h-[60px] grid-cols-1 ${
                        currentImage === img ? "border border-blue-500" : ""
                      }`}
                    />
                  </div>
                ))
              ) : (
                <span className="loading loading-ring loading-xl"></span>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        )}
        {/* Text content */}
        {product && (
          <div className="mt-6 md:mt-0 px-4 pb-6 lg:pb-0 md:flex-1">
            <h1 className={`${merriweather700.className} text-sm lg:text-lg`}>
              {product.brand} / {product.category}
            </h1>
            <h1 className={`${merriweather900.className} text-xl my-3 lg:text-2xl`}>
              {product.title}
            </h1>
            <div className="mb-2">
              <h1 className={`${merriweather700.className} text-lg lg:text-xl`}>
                Peoduct Details
              </h1>
              <p className={`${MerriweatherSans4Def.className} text-sm lg:text-lg`}>
                {product.description}
              </p>
            </div>
            <div className="flex flex-col">
              <span
                className={`bg-black/10 inline-flex justify-center items-center w-28 text-[13px] my-2 p-1 lg:text-[20px] lg:w-48 rounded ${merriweather700.className}`}
              >
                diskon: {product.discountPercentage}%
              </span>
            </div>
            <h1
              className={`${merriweather900.className} text-2xl mb-8 text-red-700`}
            >
              ${product.price}.00
            </h1>

            {/* Button Content */}
            <div className="flex">
              <button
                onClick={() => {
                  setNotif(true);
                  setTimeout(() => setNotif(false), 2000);
                  dispatch(addToCart(product));
                }}
                className="flex btn rounded btn-neutral"
              >
                Masukan Keranjang <BiCartAdd className="text-3xl lg:text-5xl" />
              </button>
            </div>
          </div>
        )}
      </section>
      {notif && (
        <div
          className={`${MerriweatherSans4Def.className} text-center fixed 
         min-w-[320px] max-w-[320px] md:min-w-[520px] md:max-w-[520px] mx-auto  text-white bg-black/80 z-[600] 
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 md:p-8 rounded-md flex justify-center items-center flex-col`}
        >
          <span className="inline-block p-2 rounded-full my-2  bg-green-400/70">
            <BiCheck className="text-3xl md:text-5xl" />
          </span>
          <p className="md:text-xl">Product telah di masukan ke dalam kranjang</p>
        </div>
      )}
    </main>
  );
}
