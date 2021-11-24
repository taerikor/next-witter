import type { AppProps } from "next/app";

import Head from "next/head";
import Wrapper from "../store/configureStore";

import "../styles/globals.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nextwitter</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default Wrapper.withRedux(MyApp);
