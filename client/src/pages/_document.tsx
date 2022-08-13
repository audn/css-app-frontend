import Document, { Head, Html, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../common/utils/data/analytics';

export default class extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-TileColor" content="#4d7fff" />
          <meta name="theme-color" content="#4d7fff" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());
    		  gtag('config', '${GA_TRACKING_ID}');
        	`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
