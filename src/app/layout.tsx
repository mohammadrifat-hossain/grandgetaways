import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import RegisterModel from "@/components/modals/RegisterModel";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import { Suspense } from "react";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GrandGetaways",
  description: "GrandGetaways project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()
  const loadingSpinner = (
    <div className="w-full flex items-center justify-center">
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
    </div>
);
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Suspense fallback={loadingSpinner}>
          <RegisterModel />
          <LoginModal />
          <RentModal />
          <SearchModal/>
          <ToasterProvider />
          <Navbar currentUser={currentUser}/>
          <div className="pb-20 pt-28">
            {children}
          </div>
        </Suspense>
      </body>
    </html>
  );
}
