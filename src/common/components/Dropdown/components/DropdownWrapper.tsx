import { ReactNode } from 'react';
import { dropdown } from '../../../utils/data/animations';
import concat from '../../../utils/helpers/concat';
import Animate from '../../layout/Animate';

function DropdownWrapper({
  children,
  position,
  className,
}: {
  children: ReactNode;
  position?: 'start' | 'center' | 'end';
  className?: string;
}) {
  const getPosition = () => {
    switch (position) {
      case 'center':
        return 'inset-x-0';
      case 'end':
        return 'right-0';
      case 'start':
        return 'left-0';
    }
  };
  return (
    <Animate
      variants={dropdown}
      className={concat(
        getPosition(),
        className ? className : '',
        'absolute  max-w-[200px] rounded-lg shadow-lg top-10 bg-types-150 w-[200px] dropdown max-h-96 ',
      )}
    >
      <ul className="w-full p-2 space-y-1 overflow-y-auto scrollbar-content">
        {children}
      </ul>
    </Animate>
  );
}

export default DropdownWrapper;
