import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IDropdown } from '../../lib/interfaces';
import concat from '../../utils/helpers/concat';
import listenForOutsideClick from '../../utils/helpers/listenForOutsideClick';
import LoadingIcon from '../misc/LoadingIcon';
import DropdownWrapper from './components/DropdownWrapper';
import ListItem from './components/ListItem';

function Dropdown({
  children,
  list,
  active,
  isLoading,
  className,
  onClick,
  options = { caret: true, position: 'center' },
}: IDropdown) {
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(
    listenForOutsideClick({
      listening,
      setListening,
      menuRef,
      setIsOpen,
    }),
  );
  return (
    <div ref={menuRef} onClick={toggle} className="relative z-50">
      <button
        className={concat(
          className ? className : '',
          options.box
            ? 'bg-types-200/80 px-4 text-sm py-[0.5rem] rounded-lg bordder hover:bg-types-150 animate shadow border-types-250 hover:bg-types-200/50 focus:ring-2'
            : '',
          'flex items-center font-medium text-white/90 justify-between',
        )}
      >
        {children}
        {options?.caret && (
          <span
            className={concat(
              options.animateCaret ? (isOpen ? 'rotate-180' : 'rotate-0') : '',
              'flex-shrink-0 ml-1 text-xs animate',
            )}
          >
            <i className="fa-solid fa-angle-down" />
          </span>
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <DropdownWrapper>
            {isLoading ? (
              <div className="flex justify-center">
                <LoadingIcon />
              </div>
            ) : (
              list?.map((item, i) => (
                <ListItem active={active} {...item} key={i} onClick={onClick} />
              ))
            )}
          </DropdownWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
