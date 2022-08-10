import { ReactNode } from 'react';

function Delta({ children }: { children: ReactNode }) {
  return (
    <h4 className={'text-lg font-semibold text-center leading-8'}>
      {children}
    </h4>
  );
}

export default Delta;
