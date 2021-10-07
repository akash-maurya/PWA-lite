import '../styles/globals.css'
import Head from "next/head";
import { useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {

   useEffect(() => {
     console.log("helo");
     if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register('/sw.js')
        .then(()=>{
          console.log("service worker are registered!!");
        })
        .catch((error)=>{
          console.log(error);
        })
     }
   }, []);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
