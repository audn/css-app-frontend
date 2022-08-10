import { ReactNode } from 'react';

function Charlie({ children }: { children: ReactNode }) {
  return (
    <h3 className={'text-xl font-bold text-center leading-8'}>{children}</h3>
  );
}

export default Charlie;
