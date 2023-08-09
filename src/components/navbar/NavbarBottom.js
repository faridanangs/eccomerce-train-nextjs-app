"use client";
import {
  getDataProducts,
  productsEntity,
} from "@/redux/sliceComponent/productSlice";
import Image from "next/image";
import Link from "next/link";
import { Profiler, useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

// data category
const Category = [
  {
    id: 1,
    title: "Smartphones",
  },
  {
    id: 2,
    title: "Laptops",
  },
  {
    id: 3,
    title: "Fragrances",
  },
  {
    id: 4,
    title: "Skincare",
  },
  {
    id: 5,
    title: "home-decoration",
  },
];

// Ini saya panggil di navbar main
export default function NavbarBottom() {
  // useState
  const [showSearch, setShowSearch] = useState(false);
  const [outputSearch, setOutputSearch] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  // data product redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataProducts());
  }, [dispatch]);
  const products = useSelector(productsEntity.selectAll);

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
    <div className="bg-black/70 relative flex p-3 w-full justify-between items-center pe-6">
      {showSearch ? (
        ""
      ) : (
        <div className="dropdown dropdown-bottom">
          <label tabIndex={0} className="text-white flex gap-2 items-center">
            <BiSolidCategory className="text-2xl" />
            Category
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] hover:cursor-pointer mt-4 menu p-1 shadow bg-base-100 rounded-md w-52"
          >
            {Category.map((val) => (
              <li key={val.id}>
                <Link href={`/category/${val.title.toLowerCase()}`}>
                  {val.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center relative justify-end h-6 w-full">
        {showSearch ? (
          <input
            type="text"
            onChange={(s) => setOutputSearch(s.target.value)}
            className="px-2 outline-none border-none w-48"
          />
        ) : (
          ""
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 ${
            showSearch ? "bg-black" : ""
          } px-2 absolute right-0 top-0 z-[10] text-white cursor-pointer hover:shadow-md`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => {
            setOutputSearch("");
            setShowSearch(!showSearch);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {dataFilter.length > 0 && (
        <div className="absolute top-12 mx-auto right-0 left-0 flex flex-col gap-1 p-2 px-4 h-[40vh] overflow-y-auto bg-black/80 text-black z-[20] ">
          {dataFilter.length > 0
            ? dataFilter.map((val) => (
                <Link
                  href={`/detail/${val.title}/${val.description}/${val.id}`}
                  onClick={() => {
                    setShowSearch(false);
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
                      className="max-h-[40px] min-h-[40px] object-contain bg-black"
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
    </div>
  );
}
