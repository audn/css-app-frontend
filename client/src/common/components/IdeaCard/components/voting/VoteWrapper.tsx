import { ReactNode } from 'react';

function VoteWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex-col items-center hidden p-1 ml-1 rounded-full animate sm:flex text-on-100-dark -gap-y-1">
      {children}
    </div>
  );
}

export default VoteWrapper;
