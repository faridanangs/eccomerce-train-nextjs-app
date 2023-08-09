"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Merriweather_Sans } from "next/font/google";
import {
  addProdPilihan,
  minCartProduct,
  plusCartProduct,
  removeProdPilihan,
} from "@/redux/sliceComponent/productSlice";
import cartEmpty from "/public/images/empty-cart.jpg";
import Link from "next/link";

// Font google
const MerriweatherSans = Merriweather_Sans({
  weight: ["800"],
  display: "swap",
  subsets: ["latin"],
});
const MerriweatherSans4 = Merriweather_Sans({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
  style: ["italic"],
});
const MerriweatherSans4Def = Merriweather_Sans({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
});

export default function Cart() {
  const dispatch = useDispatch();

  // Slise dari redux
  const { cart } = useSelector((state) => state.products);
  const { pilihan } = useSelector((state) => state.products);

  // State
  const [lihatTotal, setLihatTotal] = useState(false);

  // Total semua harga barang
  const total = cart.reduce((prev, product) => {
    return prev + product.price * product.count;
  }, 0);


  // handle harga pilihan dari user
  const handlePilihan = (product) => {
    const existingProductIndex = pilihan.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      dispatch(removeProdPilihan(product)); // Hapus produk jika sudah ada
    } else {
      dispatch(addProdPilihan(product)); // Tambahkan produk jika belum ada
    }
  };

  return (
    <main>
      {cart.length !== 0 && cart !== undefined ? (
        <section>
          {/* Admin Name */}
          <div className="flex flex-col gap-2 justify-center h-full">
            {cart.map((val, i) => {
              return (
                <div key={i} className="flex flex-col justify-center gap-2 bg-white">
                  <div>{val.count < 1 ? alert("apus? ") : ""}</div>

                  {/* Product content */}
                  <div className="flex gap-4 p-2">
                    <div>
                      <input
                        type="checkbox"
                        className="checkbox-sm  checkbox checkbox-dark"
                        checked={
                          pilihan.some((item) => item.id === val.id)
                            ? true
                            : lihatTotal
                        } // Periksa apakah produk ada di pilihan[]
                        onChange={() => handlePilihan(val)}
                      />
                    </div>

                    {/* Image Content */}
                    <Image
                      src={val.thumbnail}
                      width={70}
                      height={70}
                      quality={100}
                      alt={val.title}
                      priority
                      className="object-contain max-h-[100px] max-w-[100px] min-h-[70px] min-w-[70px] bg-white"
                    />

                    {/* Text Content */}
                    <div>
                      <Link  href={`/detail/${val.title}/${val.description}/${val.id}`} className="link link-neutral">
                        <h1 className="font-bold">{val.title}</h1>
                        <p className={`${MerriweatherSans4.className} text-sm`}>
                          {val.thumbnail.length > 20 ? val.description.slice(0, 25).toLowerCase() + "...": val.description}
                        </p>
                      </Link>
                      <span className="text-sm bg-slate-400/40 my-1 px-1 inline-block rounded">{val.stock} Stock</span>
                      <h1 className="text-[#8a2222]  font-bold">${(val.price * val.count).toFixed(2)}</h1>

                      {/* Button Content */}
                      <div className="flex items-center gap-1 my-2">
                        <button
                          className="border px-2"
                          onClick={() => {dispatch(minCartProduct(val));}}>-</button>
                        <span className="px-4 border py-[1px]">
                          {val.count}
                        </span>
                        <button
                          className="border px-2"
                          onClick={() => {dispatch(plusCartProduct(val));}}>+
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* check out */}
          <CekOut
            setTotal={setLihatTotal}
            totalHarga={total}
            pilihanHarga={pilihan}
            lihatTotalProduct={lihatTotal}
          />
        </section>
      ) : (
        // Jika Cart Bernilai kosong
        <CartKosong />
      )}
    </main>
  );
}

// Jika Cart Bernilai kosong
function CartKosong() {
  return (
    <div className="w-full flex items-center mt-8 justify-center flex-col p-4">
      <Image
        src={cartEmpty}
        alt="cart kosong"
        priority
        quality={100}
        className="w-[80%] h-1/2 object-contain"
      />
      <div className="flex flex-col my-10 justify-center items-center">
        <h1 className={`${MerriweatherSans4.className} text-3xl`}>UPPS!</h1>
        <h2 className={`${MerriweatherSans4Def.className} text-center`}>
          Yahhh keranjangmu kosong ayok belanja sekarang
        </h2>
        <Link
          href="/"
          className={`inline-block ${MerriweatherSans4Def.className} border-red-400 border my-4 rounded-sm px-3 py-2 bg-red-100`}
        >
          Belanja sekarang
        </Link>
      </div>
    </div>
  );
}

// Kontent dari cekout
function CekOut({
  setTotal,
  totalHarga,
  lihatTotalProduct,
  pilihanHarga,
}) {

   // total harga pilihan user
   let hargaPilihan = pilihanHarga.reduce(
    (prev, product) => prev + product.price * product.count,
    0
  );

  return (
    <div className="flex items-center px-2 bg-white py-3 justify-between">
      <div className="flex">
        <label className="cursor-pointer label p-0 items-center gap-2">
          <input
            type="checkbox"
            className="checkbox-sm checkbox checkbox-dark"
            onClick={() => setTotal(!lihatTotalProduct)}
          />
          <span className={`label-text text-[15px]`}>Pilih se.. </span>
        </label>
      </div>
      <div className="flex items-center gap-2">
        <h1>
          Total: $
          {lihatTotalProduct
            ? totalHarga.toFixed(2)
            : hargaPilihan.toFixed(2)}
        </h1>
        <button className="btn btn-error btn-sm rounded-sm">Checkout</button>
      </div>
    </div>
  );
}
