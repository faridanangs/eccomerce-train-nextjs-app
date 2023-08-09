"use client";
import {
  addToCart,
  getDataProducts,
  productsEntity,
} from "@/redux/sliceComponent/productSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCartAdd, BiCheck } from "react-icons/bi";
import { Merriweather, Merriweather_Sans } from "next/font/google";

const merriweather400 = Merriweather({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
});
const merriweather700 = Merriweather({
  weight: ["700"],
  display: "swap",
  subsets: ["latin"],
});

const MerriweatherSans = Merriweather_Sans({
  weight: ["800"],
  display: "swap",
  subsets: ["latin"],
});

const MerriweatherSans4Def = Merriweather_Sans({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
});

export default function CategoryProducts({ params }) {
  const [notif, setNotif] = useState(false)
  const dispatch = useDispatch();
  const products = useSelector(productsEntity.selectAll);
  useEffect(() => {
    dispatch(getDataProducts());
  }, [dispatch]);
  const categoryProducts = products.filter(
    (product) => product.category === params.slug
  );

  const addProductToCart = (val) => {
    dispatch(addToCart(val));
  };

  const handleNotif = ()=> {
    setTimeout(()=> setNotif(false), 2000)
  }
  return (
    <main className="relative w-full">
      {categoryProducts ? (
        <div className="p-1">
          <h1 className={`${MerriweatherSans.className} text-xl mt-2 mb-1`}>
            {params.slug.toUpperCase()}
          </h1>
          <section className="grid grid-cols-2 gap-2">
            {categoryProducts.map((product) => (
              <div
                className="cursor-pointer col-auto flex justify-center flex-col bg-white/90 px-2 hover:scale-[1.02] transition-all duration-300"
                key={product.id}
              >
                {/* Image content */}
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  priority
                  width={200}
                  height={200}
                  quality={100}
                  className="object-contain mb-2 max-h-[90px] mt-2 min-h-[90px] hover:scale-[.97] transition-all duration-200"
                />
                {/* Text content */}

                {/* text */}
                <TitleDescDisconRating textProduct={product} />

                {/* Price dan add Cart */}
                <div className="flex items-center justify-between mt-6 mb-2">
                  <h1 className="text-[red]">${product.price.toFixed(2)}</h1>
                  <button
                    onClick={() => {
                      setNotif(true);
                      handleNotif();
                      addProductToCart(product)
                    }}
                    className="flex hover:scale-105 transition-all hover:shadow-lg duration-200 items-center justify-center gap-1 px-2 rounded py-[1px] font-bold"
                  >
                    <BiCartAdd className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      ) : (
        <span className="loading loading-ring loading-lg"></span>
      )}
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

// text content
function TitleDescDisconRating({ textProduct }) {
  return (
    <Link
      rel="preloaded"
      href={`/detail/${textProduct.title}/${textProduct.description}/${textProduct.id}`}
    >
      <h1 className="font-bold link link-neutral">
        {" "}
        {textProduct.title.length > 15
          ? textProduct.title.slice(0, 15) + "..."
          : textProduct.title}
      </h1>
      <p
        className={`${merriweather400.className} link link-neutral text-[13px]`}
      >
        {textProduct.description.length > 30
          ? textProduct.description.slice(0, 30).toLowerCase() + "..."
          : textProduct.description.toLowerCase()}
      </p>
      <span
        className={`bg-[#ff7c2beb] text-[12px] p-1 rounded text-white ${merriweather700.className}`}
      >
        diskon: {textProduct.discountPercentage}%
      </span>
      <div className="rating h-6 px-[1px] rounded flex justify-center items-center w-11 font-bold rating-sm mt-2 text-[10px] bg-[#ff6c102b] border ">
        <input
          type="radio"
          name="rating-5"
          className="mask mask-star-2 bg-orange-600 block scale-75"
        />{" "}
        {textProduct.rating}
      </div>
    </Link>
  );
}
