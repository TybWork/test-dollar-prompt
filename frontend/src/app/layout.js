'use client'
import { Finlandica, Inter, Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./Redux/Provider";
import MobileNavbar from "./Components/MobileNavbar/MobileNavbar";
import Cart from "./Components/Cart/Cart";
import { usePathname } from "next/navigation";
import AdminHeader from "./Components/AdminHeader/AdminHeader";
import { userData } from "./utilities/userData";
import SellerHeader from "./Components/SellerHeader/SellerHeader";
import ScrollToTop from "./Components/(liteComponents)/ScrollToTop/ScrollToTop";
import { getTokenFunction } from "./utilities/getTokenFunction";
import { jwtDecode } from "jwt-decode";
import CalendarComp from "./Components/CalendarComp/CalendarComp";
import NewFooter from "./Components/(updatedDesignComp)/NewFooter/NewFooter";
import GuestHeader from "./Components/(updatedDesignComp)/GuestHeader/GuestHeader";
import BuyerHeader from "./Components/(Headers)/BuyerHeader/BuyerHeader";
import SellPromptComp from "./Components/(Dashbords)/SellPromptComp/SellPromptComp";
import { useEffect, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: '--primaryFont',
  weight: ['100', '300', '400', '700', '900']
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--secondryFont',
  weight: ['100', '300', '400', '700', '900']
})

export default function RootLayout({ children }) {
  const data = userData()
  const pathname = usePathname()

  // Start the timeout only if the user is NOT on the login or signup page
  useEffect(() => {
    if (pathname === '/login' || pathname === '/signup') {
      return;
    } else {
      setTimeout(() => {
        localStorage.removeItem('redirectTo');
      }, 3000); // 30 seconds timeout
    }
  }, [pathname]);

  const renderHeader = () => {
    if (typeof window !== 'undefined') {

      if (pathname.includes('/admin')) {
        return <AdminHeader />
        // } else if (data.userRole == 'seller' || pathname.includes('/sell') || pathname.includes('/seller') || pathname.includes('/updateprompt')) {
      }
      else if (pathname.includes('/master-dashboard') && data.userRole === null) {
        return null
      }
      else if (data.userRole == 'user') {
        return <BuyerHeader />
      }
      else if (data.userRole == 'seller') {
        return <BuyerHeader />
      }
      else {
        if (data.userRole == 'admin') {
          return <AdminHeader />
        } else {
          // return <Header />
          return <GuestHeader />
          // return <BuyerHeader />
        }
      }
    }
    return <GuestHeader />

  }

  const renderFooter = () => {
    if (typeof window !== 'undefined') {
      if (pathname.includes('/master-dashboard')) {
        return null
      }
      else {
        return <NewFooter />
      }
    }
  }

  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.variable} ${lato.variable}`} style={{ display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'space-between', overflowX: 'hidden' }}>

          {/* condition header rendering */}
          {renderHeader()}
          <MobileNavbar />
          <Cart />
          <div style={{ display: 'none' }}> <CalendarComp /></div>
          <ScrollToTop />
          {children}
          {renderFooter()}
        </body>
      </Providers>
    </html>
  )
}
