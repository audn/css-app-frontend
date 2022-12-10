import { NextSeoProps } from 'next-seo';

export default {
  title: 'css.app',
  description: 'css.app',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.css.app',
    site_name: 'css.app',
    images: [
      {
        url: '/logo.png',
        width: 96,
        height: 96,
        alt: '',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@tweetaudun',
    site: '@tweetaudun',
    cardType: 'summary',
  },
} as NextSeoProps;
