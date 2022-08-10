import { ReactNode } from 'react';

function BravoHeading({ children }: { children: ReactNode }) {
  return <h1 className={'font-bold text-white text-3xl mb-3'}>{children}</h1>;
}

export default BravoHeading;
