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
  return (
    <html lang="en">
      <body className={nunito.className}>
        <RegisterModel />
        <LoginModal />
        <RentModal />
        <SearchModal/>
        <ToasterProvider />
        <Navbar currentUser={currentUser}/>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
