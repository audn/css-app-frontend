import { ReactNode } from 'react';

function VoteWrapper({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex items-center">{children}</div>
    </div>
  );
}

export default VoteWrapper;
