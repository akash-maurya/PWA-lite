import '../styles/globals.css'
import Head from "next/head";
import { useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import Script from 'next/script';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {


  useEffect(() => {
   
    if('serviceWorker' in navigator){
       navigator.serviceWorker.register("/sw.js")
       .then(function(registration){
         console.log("service worker registration successful with scope "+ registration.scope);
       }
       ,
       function(err){
         console.log("Failed to register service worker" , err) ;
       }
       
       )
       
    }
  }, [])

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
       
      </Head>
      <Script src = '/idb.js'></Script>
      <Script src = '/utility.js'></Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
