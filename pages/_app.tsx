import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <>
    <Head>
      <title>Web Music Player</title>
      <meta name="description" content="Site for listening music" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </>;
}

export default MyApp;
