"use client";

import {
  addToCart,
  getDataProducts,
  productsEntity,
} from "@/redux/sliceComponent/productSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCartAdd, BiCheck } from "react-icons/bi";
import Link from "next/link";
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
const MerriweatherSans4Def = Merriweather_Sans({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
});

export default function Products() {
  const [notif, setNotif] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(productsEntity.selectAll);
  useEffect(() => {
    dispatch(getDataProducts());
  }, [dispatch]);

  const addProductToCart = (val) => {
    dispatch(addToCart(val));
  };

  const startNotificationTimer = () => {
    setTimeout(() => {
      setNotif(false);
    }, 2000);
  };

  // Untuk mengecek apakah nilai notif true untuk di ubah menjadi fals

  return (
    <main className="bg-white/70 mt-10  p-1 lg:px-8 relative w-full">
      <h1 className="my-2 font-bold text-xl md:text-2xl">REKOMENDASI</h1>
      {products ? (
        <section className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
          {products.map((product) => (
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
                className="object-contain mb-2 max-h-[90px] md:max-h-[120px] mt-2 min-h-[90px] md:min-h-[120px] hover:scale-[.97] transition-all duration-200"
              />
              {/* Text content */}

              {/* text */}
              <TitleDescDisconRating textProduct={product} />

              {/* price and addCart */}
              <div className="flex items-center justify-between mt-6 mb-2">
                <h1 className="text-[red] md:text-xl">
                  ${product.price.toFixed(2)}
                </h1>
                <button
                  onClick={() => {
                    setNotif(true);
                    startNotificationTimer();
                    addProductToCart(product);
                  }}
                  className="flex hover:scale-105 transition-all hover:shadow-lg duration-200 items-center justify-center gap-1 px-2 rounded py-[1px] font-bold"
                >
                  <BiCartAdd className="text-2xl md:text-4xl" />
                </button>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <span className="loading loading-ring loading-lg"></span>
      )}
      {notif && (
        <div
          className={`${MerriweatherSans4Def.className} text-center fixed 
         min-w-[320px] max-w-[320px] md:min-w-[520px] md:max-w-[520px] mx-auto  text-white bg-black/80 z-[600] 
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 md:p-8 rounded-md flex justify-center items-center flex-col`}
        >
          <span className="inline-block p-2 rounded-full my-2  bg-green-400/70">
            <BiCheck className="text-3xl md:text-5xl" />
          </span>
          <p className="md:text-xl">
            Product telah di masukan ke dalam kranjang
          </p>
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
      href={`/detail/${encodeURIComponent(
        textProduct.title.replace(/\s+/g, "_").toUpperCase()
      )}/${encodeURIComponent(
        textProduct.description.replace(/\s+/g, "_").toUpperCase()
      )}/${textProduct.id}`}
    >
      <h1 className="font-bold link link-neutral md:text-xl">
        {" "}
        {textProduct.title.length > 15
          ? textProduct.title.slice(0, 15) + "..."
          : textProduct.title}
      </h1>
      <p
        className={`${merriweather400.className} link link-neutral text-[13px] md:text-[20px]`}
      >
        {textProduct.description.length > 30
          ? textProduct.description.slice(0, 30).toLowerCase() + "..."
          : textProduct.description.toLowerCase()}
      </p>
      <span
        className={`bg-black/20 text-[12px] p-1 inline-block md:text-[15px] md:my-2 rounded text-black/90 ${merriweather700.className}`}
      >
        diskon: {textProduct.discountPercentage}%
      </span>
      <div className="rating h-6 md:h-8 px-[1px] md:gap-1 rounded flex justify-center items-center md:px-2 w-11 md:w-20 font-bold rating-sm mt-2 text-[10px] bg-black/10 border ">
        <input
          type="radio"
          name="rating-5"
          className="mask mask-star-2 bg-[orange]  block scale-75 md:scale-105"
        />{" "}
        <p className="md:text-lg">{textProduct.rating}</p>
      </div>
    </Link>
  );
}
