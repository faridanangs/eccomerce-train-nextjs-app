import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Belenje",
    default: 'Belenje'
  },
  description: "Mari Belanja di Tebelnje",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black/10`}>
        <Providers>
          <Navbar/>
          {children}
          {/* <Footer/> */}
        </Providers>
      </body>
    </html>
  );
}
