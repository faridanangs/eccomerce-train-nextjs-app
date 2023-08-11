"use client";
import { Merriweather_Sans } from "next/font/google";
import Link from "next/link";
import { BiSolidCategory } from "react-icons/bi";
import { TfiHelpAlt } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";

// Font
const MerriweatherSans = Merriweather_Sans({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
});

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
    <div className="bg-black/70 relative lg:px-8 flex p-3 w-full justify-between items-center pe-6">
      <div className="dropdown dropdown-bottom ">
        <label
          tabIndex={0}
          className="text-white cursor-pointer flex gap-2 items-center"
        >
          <BiSolidCategory className="text-2xl md:text-3xl" />
          <p className="md:text-xl">Kategory</p>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] hover:cursor-pointer mt-4 menu p-1 shadow bg-base-100 rounded-md w-52"
        >
          {Category.map((val) => (
            <li key={val.id}>
              <Link href={`/category/${val.title.toLowerCase()}`} className="lg:text-lg">
                {val.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>{" "}
      <div
        className={`flex gap-1 gap-3 text-white ${MerriweatherSans.className}`}
      >
        <div className="flex items-center cursor-pointer gap-0 md:gap-1">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="md:h-8 md:w-8 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-sm md:badge-md badge-warning indicator-item">
                1
              </span>
            </div>
          </button>
          <h1 className="text-xs md:text-lg -ml-1">Notifikasi</h1>
        </div>
        <div className="flex items-center cursor-pointer gap-1 md:gap-2">
          <TfiHelpAlt className="md:text-2xl text-lg" />
          <h1 className="text-xs md:text-lg">Bantuan</h1>
        </div>
      </div>
    </div>
  );
}
