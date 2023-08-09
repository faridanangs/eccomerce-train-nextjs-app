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
            <Link href="/" className={`link ${MerriweatherSans4Def.className}`}>Kembali ke halaman utama</Link>
          </div>
        </section>
      </main>
    );
  }
  return (
    <main className="relative">
      <section className="p-1 md:flex md:gap-4 md:p-4 md:items-start">
        {/* Image content */}
        {product ? (
          <div className="">
            <Image
              src={currentImage ? currentImage : product.thumbnail}
              alt={product.title}
              priority
              quality={100}
              width={200}
              height={200}
              className="object-contain w-full bg-white max-h-[200px] min-h-[200px]"
            />
            <div className="flex justify-center overflow-x-scroll gap-2 mt-4">
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
          <div className="mt-6 md:mt-0">
            <h1 className={`${merriweather700.className} text-sm`}>
              {product.brand} / {product.category}
            </h1>
            <h1 className={`${merriweather900.className} text-xl my-3`}>
              {product.title}
            </h1>
            <div className="mb-2">
              <h1 className={`${merriweather700.className} text-lg`}>
                Peoduct Details
              </h1>
              <p className={`${MerriweatherSans4Def.className} text-sm`}>
                {product.description}
              </p>
            </div>
            <div className="flex flex-col">
              <span
                className={`bg-[#ff7c2beb] inline-flex justify-center items-center w-28 text-[12px] my-2 p-1 rounded text-white ${merriweather700.className}`}
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
                  setNotif(true)
                  setTimeout(()=> setNotif(false) , 2000)
                  dispatch(addToCart(product))}}
                className="flex btn rounded btn-success"
              >
                Add To Cart <BiCartAdd className="text-3xl" />
              </button>
            </div>
          </div>
        )}
      </section>
      {notif && (
        <div
          className={`${MerriweatherSans4Def.className} text-center fixed 
         min-w-[320px] max-w-[320px] mx-auto  text-white bg-black/80 z-[600] 
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg flex justify-center items-center flex-col`}
        >
          <span className="inline-block p-2 rounded-full my-2  bg-green-400/70">
            <BiCheck className="text-3xl " />
          </span>
          Product telah di masukan ke dalam kranjang
        </div>
      )}
    </main>
  );
}
