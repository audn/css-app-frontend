import { ReactNode } from 'react';
import { dropdown } from '../../../utils/data/animations';
import concat from '../../../utils/helpers/concat';
import Animate from '../../layout/Animate';

function DropdownWrapper({
  children,
  position,
}: {
  children: ReactNode;
  position?: 'start' | 'center' | 'end';
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
        'absolute border rounded-lg shadow-lg top-10 bg-types-200 border-types-250 w-[200px] dropdown ',
      )}
    >
      <ul className="max-w-[200px] p-2 space-y-1 overflow-y-auto max-h-96 scrollbar-content">
        {children}
      </ul>
    </Animate>
  );
}

export default DropdownWrapper;
