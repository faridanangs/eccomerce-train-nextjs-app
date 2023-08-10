"use client";
import Image from "next/image";
import { Merriweather_Sans } from "next/font/google";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDataProducts, productsEntity } from "@/redux/sliceComponent/productSlice";
import { BiSearch } from "react-icons/bi";

const MerriweatherSans = Merriweather_Sans({
  weight: ["600"],
  display: "swap",
  subsets: ["latin"],
  style: ["italic"],
});

// Ini saya panggil di navbar main
export default function NavbarTop() {
  const { cart } = useSelector((state) => state.products);
  const [outputSearch, setOutputSearch] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  // data product redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataProducts());
  }, [dispatch]);
  const products = useSelector(productsEntity.selectAll);

  // filter search user
  useEffect(() => {
    const productsFilter = products.filter((val) => {
      if (outputSearch !== "") {
        for (const i in val) {
          if (
            val[i] &&
            typeof val[i] === "string" &&
            val[i].toLowerCase().includes(outputSearch.toLowerCase())
          ) {
            return true;
          }
        }
      }
      return false;
    });
    setDataFilter(productsFilter);
  }, [outputSearch, products]);
  return (
    <main className="w-full sticky top-0 z-[1000000]">
      <div className="navbar justify-between  bg-black/60 backdrop-blur-lg border-white/30 border-b-1">
        
        {/* search */}
          <div className="flex justify-start items-center w-48 relative h-6">
            <input
              type="text"
              onChange={(s) => setOutputSearch(s.target.value)}
              className="px-2 py-1 rounded-md placeholder:text-white outline-none border-none w-48 text-white bg-white/50"
              value={outputSearch}
              placeholder="Cari Product"
            />
            <BiSearch className="absolute right-1 top-0 text-white text-2xl"/>
          </div>


        <div className="flex-none">
          {/* Cart Icon */}
          <Link href="/cart">
            <div className="dropdown dropdown-end text-white ">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cart.length}
                  </span>
                </div>
              </label>
            </div>
          </Link>

          {/* Profile Icon */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  alt="image profil"
                  width={40}
                  height={40}
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Dashboard</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {dataFilter.length > 0 && (
        <div className="absolute top-16 mx-auto right-0 left-0 flex flex-col gap-1 p-2 px-4 h-[40vh] overflow-y-auto bg-black/60 text-black z-[20] ">
          {dataFilter.length > 0
            ? dataFilter.map((val) => (
                <Link
                  href={`/detail/${val.title}/${val.description}/${val.id}`}
                  onClick={() => {
                    setOutputSearch("");
                  }}
                  key={val.id}
                >
                  <div className="flex bg-white/60 p-2 gap-3 items-center">
                    <Image
                      src={val.thumbnail}
                      width={40}
                      height={40}
                      alt={val.title}
                      priority
                      quality={100}
                      className="max-h-[40px] min-h-[40px] object-contain bg-black/60"
                    />
                    <div className="link">
                      <h1>
                        {val.title.length > 10
                          ? val.title.slice(0, 15).toUpperCase() + "..."
                          : val.title}
                      </h1>
                      <p>
                        {val.description.length > 10
                          ? val.description.slice(0, 30).toLowerCase() + "..."
                          : val.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : ""}
        </div>
      )}
    </main>
  );
}
