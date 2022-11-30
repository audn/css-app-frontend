import { ReactNode } from 'react';
import Banner from '../components/layout/Banner';
import H1 from '../components/layout/headings/H1';
import H3 from '../components/layout/headings/H3';

type Props = {
  children: ReactNode;
  h1: string | ReactNode;
  h3: string;
};
export const FadedLayout = ({ h1, h3, children }: Props) => {
  return (
    <>
      <div className="flex items-center h-auto p-5 bg-gradient-to-t from-types-150 to-types-body pt-12 pb-72 max-h-[300px] flex-col">
        <Banner
          text={
            <>
              This site is currently under construction.&nbsp;
              <a
                href="https://discord.gg/YA39qjzwNy"
                target={'_blank'}
                className="border-b text-brand-primary-150 border-brand-primary-150 hover:text-opacity-80 hover:border-opacity-80"
              >
                Join our Discord
              </a>
            </>
          }
        />
        <div className="flex flex-col items-center max-w-4xl text-center">
          <H1 className="text-white">{h1}</H1>
          <H3 className="mt-3 !font-medium">{h3}</H3>
        </div>
      </div>
      <div className="container flex flex-col">
        <main className={'flex-1 w-full'}>{children}</main>
      </div>
    </>
  );
};
//
