// 'use client'
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./Redux/Provider";
import MobileNavbar from "./Components/MobileNavbar/MobileNavbar";
import Cart from "./Components/Cart/Cart";
import ScrollToTop from "./Components/(liteComponents)/ScrollToTop/ScrollToTop";
import CalendarComp from "./Components/CalendarComp/CalendarComp";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import RootFileData from "./utilities/RootFileData";
import Head from "next/head";

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

export const metadata = {
  title: {
    default: 'Dollarprompt'
  },
  meta: {
    'googleverify': 'hellasffasfo'
  }

}
export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        <meta name="googlekey" content="adfassf" />
      </Head>
      <Providers>
        <body className={`${inter.variable} ${lato.variable}`} style={{ display: 'flex', height: '100vh', flexDirection: 'column', justifyContent: 'space-between', overflowX: 'hidden' }}>
          <MobileNavbar />
          <Cart />
          <div style={{ display: 'none' }}> <CalendarComp /></div>
          <ScrollToTop />

          {/* this root file contain header and footer also  */}
          <RootFileData children={children} />

        </body>
      </Providers>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_ID} />

    </html>
  )
}
