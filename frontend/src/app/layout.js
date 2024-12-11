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
  verification: {
    'google': 'sACVgSyawT8fUnDMokEIaj-pIMMN__hEGAeYh7ApIfc'
  }

}
export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        {/* Google Analytics Script (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5MHLD5JDND"></script>

        {/* Inline Google Analytics Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = 'https://www.googletagmanager.com/gtag/js?id=G-5MHLD5JDND';
                script.async = false;  // Make sure it loads synchronously for verification
                document.head.appendChild(script);

                script.onload = function() {
                  window.dataLayer = window.dataLayer || [];
                  function gtag() { dataLayer.push(arguments); }
                  gtag('js', new Date());
                  gtag('config', 'G-5MHLD5JDND', { page_path: window.location.pathname });
                }
              })();
            `
          }}
        />
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
