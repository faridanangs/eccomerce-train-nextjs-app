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
  return (
    <div className="bg-black/70 relative flex p-3 w-full justify-between items-center pe-6">
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
      </div>{" "}

    </div>
  );
}
