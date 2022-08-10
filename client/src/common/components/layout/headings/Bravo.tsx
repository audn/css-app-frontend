import { ReactNode } from 'react';

function Bravo({ children }: { children: ReactNode }) {
  return <h2 className={'font-bold text-white text-2xl mb-3'}>{children}</h2>;
}

export default Bravo;
