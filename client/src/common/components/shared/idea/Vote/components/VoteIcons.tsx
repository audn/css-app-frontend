import { ReactNode } from 'react';

function VoteIcons({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center p-1 ml-1 rounded-full animate text-on-100-dark gap-y-1">
      {children}
    </div>
  );
}

export default VoteIcons;
