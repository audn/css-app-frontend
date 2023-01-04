import { NextSeo } from 'next-seo';
import { DefaultLayout } from '../common/layouts/Default';

export default function Home() {
  return (
    <DefaultLayout>
      <NextSeo />

      <div className="flex flex-col">
        <h1 className="mb-10 text-2xl font-semibold text-white">Components</h1>
        welcome
      </div>
    </DefaultLayout>
  );
}
