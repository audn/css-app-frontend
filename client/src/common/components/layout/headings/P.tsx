import { ReactNode } from 'react';
import concat from '../../../utils/helpers/concat';

function P({
  children,
  className,
}: {
  children: ReactNode | ReactNode[];
  className?: string;
}) {
  if (Array.isArray(children)) {
    return (
      <div
        className={concat(
          className ? className : '',
          'text-base leading-8 whitespace-pre-line break-word w-full',
        )}
      >
        {children.map((x, i) => (
          <span className="block mt-5 first:mt-0" key={`paragraph_${i}`}>
            {x}
          </span>
        ))}
      </div>
    );
  } else
    return (
      <span
        className={concat(
          className ? className : '',
          'text-base leading-8 whitespace-pre-line break-word w-full',
        )}
      >
        {children}
      </span>
    );
}

export default P;
