import { ReactNode } from 'react';

function PHeading({ children }: { children: ReactNode }) {
  return <p className={'text-lg text-center leading-8'}>{children}</p>;
}

export default PHeading;
