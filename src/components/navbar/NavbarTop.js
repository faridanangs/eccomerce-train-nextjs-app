"use client";
import Image from "next/image";
import { Lilita_One, Merriweather_Sans } from "next/font/google";
import Link from "next/link";
import { useSelector } from "react-redux";

const MerriweatherSans = Merriweather_Sans({
  weight: ["600"],
  display: "swap",
  subsets: ["latin"],
  style: ["italic"],
});

// Ini saya panggil di navbar main
export default function NavbarTop() {
  const { cart } = useSelector((state) => state.products);
  return (
    <main className="w-full sticky top-0 z-[1000000]">
      <div className="navbar bg-black/60 backdrop-blur-lg border-white/30 border-b">
        <div className="flex-1 text-white">
          <Link
            rel="preloaded"
            href="/"
            className={`btn btn-ghost normal-case text-2xl ${MerriweatherSans.className}`}
          >
            Tebelenje
          </Link>
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
    </main>
  );
}
