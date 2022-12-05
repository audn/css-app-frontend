import { ReactNode } from 'react';

function Banner({ text }: { text: string | ReactNode }) {
  return (
    <div className="flex justify-center mb-10 -mt-10">
      <div className="flex items-center gap-4 px-4 py-3 rounded-lg md:gap-2 bg-types-200">
        <div className="flex-none w-3 h-3 bg-orange-500 rounded-full"></div>
        <p className="text-white/80">{text}</p>
      </div>
    </div>
  );
}

export default Banner;
