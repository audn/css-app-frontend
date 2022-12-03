import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Script
            src="https://kit.fontawesome.com/84c3028184.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
          <meta name="application-TileColor" content="#4d7fff" />
          <meta name="theme-color" content="#4d7fff" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />{' '}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          /> */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Poppins+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
