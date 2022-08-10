import { ReactNode } from 'react';

function AlphaHeading({ children }: { children: ReactNode }) {
  return <h1 className={'font-bold text-white text-3xl mb-3'}>{children}</h1>;
}

export default AlphaHeading;