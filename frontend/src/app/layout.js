'use client'
import { Finlandica } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
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

const finlandica = Finlandica({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const data = userData()
  const pathname = usePathname()
  const renderHeader = () => {
    if (typeof window !== 'undefined') {
      if (pathname.includes('/admin')) {
        return <AdminHeader />
        // } else if (data.userRole == 'seller' || pathname.includes('/sell') || pathname.includes('/seller') || pathname.includes('/updateprompt')) {
      } else if (pathname.includes('/master-dashboard') && data.userRole === null) {
        return null
      }
      else if (data.userRole == 'seller') {
        return <SellerHeader />
      } else {
        if (data.userRole == 'admin') {
          return <AdminHeader />
        } else {
          return <Header />
        }
      }
    }

    return <Header />

  }

  const renderFooter = () => {
    if (typeof window !== 'undefined') {
      if (pathname.includes('/master-dashboard')) {
        return null
      }
      else {
        return <Footer />
      }
    }
  }
  return (
    <html lang="en">
      <Providers>
        <body className={finlandica.className} style={{ display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'space-between', overflowX: 'hidden' }}>

          {/* condition header rendering */}
          {renderHeader()}
          <MobileNavbar />
          <Cart />
          <ScrollToTop />
          {children}
          {renderFooter()}
        </body>
      </Providers>
    </html>
  )
}
