import Head from 'next/head';

import { ISeoTags } from '../lib/interfaces';

const SeoTags = ({
  title,
  defaultTitle = 'css.app',
  desc = 'Do you have an idea of what css.app can be built into?',
  url = 'https://css.app',
  image = 'https://opengraph.githubassets.com/b11463c912f553b952cfbc8594fef5f545f2ff2b6589a92a30448363c3edddcc/audn/css.app',
}: ISeoTags) => {
  const metaTitle = title ? title + ' | css.app' : defaultTitle;
  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={desc} />
      <meta property="image" content={image} />
      <meta property="og:type" content="Guide" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={desc} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@tweetaudun" />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@tweetaudun" />
    </Head>
  );
};

export default SeoTags;
