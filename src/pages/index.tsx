import { NextSeo } from 'next-seo';
import Banner from '../common/components/layout/Banner';
import { DefaultLayout } from '../common/layouts/Default';

export default function Home() {
  return (
    <DefaultLayout>
      <NextSeo />

      <div className="flex flex-col">
        <h1 className="mb-10 text-2xl font-semibold text-white">Home</h1>
        {/* <div className="max-w-sm p-4 border rounded-md bg-types-100 border-types-150">
          Hi
        </div> */}
        <Banner
          text={
            <>
              This site is still under construction.{' '}
              <a
                className="border-b hover:opacity-50 animate text-brand-primary-100 border-brand-primary-100"
                href="https://discord.gg/YA39qjzwNy"
                target={'_blank'}
              >
                Join our Discord
              </a>
            </>
          }
        />
      </div>
    </DefaultLayout>
  );
}
