import { Merriweather_Sans } from "next/font/google";
import { BiUser, BiLockAlt } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import Link from "next/link";

const MerriweatherSans = Merriweather_Sans({
  weight: ["500"],
  display: "swap",
  subsets: ["latin"],
});

export default function SignUp() {
  return (
    <section>
      <div>
        {/* Image content */}
        <div></div>

        {/* Text content */}
        <div className="h-[100vh] py-6 w-full flex flex-col px-6">

            {/* Icon Logo */}
          <div className="flex flex-col items-center justify-center mb-10">
            <BiUser className="text-[60px]" />
            <h1 className="text-xl font-bold -mt-2">Sign Up</h1>
          </div>

          {/* Form Text */}
          <form className="flex flex-col justify-center gap-4">
            <label className="flex items-center gap-3 border-b border-black/90 pb-1">
              <BiUser className="text-lg" />
              <input
                required
                type="text"
                placeholder="No telpon atau Email"
                className="w-[90%] border-none outline-none bg-transparent"
              />
            </label>
            <label className="flex items-center gap-3 border-b border-black/90 pb-1">
              <BiLockAlt className="text-lg" />
              <input
                required
                type="password"
                placeholder="Password"
                className="w-[90%] border-none outline-none bg-transparent"
              />
            </label>

            <button className="bg-black/70 text-white p-2 text-sm">
              DAFTAR
            </button>
          </form>

          {/* content Lanjutan */}
          <div>
            <div className="flex justify-center gap-4 items-center my-5">
              <h1 className="w-20 h-[2px] bg-black/40" />
              <h1 className={`${MerriweatherSans.className} text-black/40`}>
                atau
              </h1>
              <h1 className="w-20 h-[2px] bg-black/40" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center border gap-1 px-6 border-black/60 py-1">
                <FcGoogle className="text-3xl font-bold" />
                <h1 className={`${MerriweatherSans.className}`}>Google</h1>
              </div>
              <div className="flex items-center border gap-1 px-6 border-black/60 py-1">
                <AiFillFacebook className="text-3xl font-bold" />
                <h1 className={`${MerriweatherSans.className}`}>Facebook</h1>
              </div>
            </div>
          </div>
          <div
            className={`${MerriweatherSans.className} text-sm flex gap-1 items-center justify-center mt-4`}
          >
            <h1>Sudah punya akun? </h1>
            <Link href='/login' className="link link-error">Masuk</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
