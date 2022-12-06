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
  component,
  active,
  isLoading,
  className,
  onClick,
  open,
  options = { caret: true, position: 'center', toggleOnClick: false },
}: IDropdown) {
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!open) {
      setIsOpen(false);
    }
    return () => setIsOpen(false);
  }, [open]);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(
    listenForOutsideClick({
      listening,
      setListening,
      menuRef,
      setIsOpen,
    }),
  );
  function handleListClick(val: string) {
    if (onClick) {
      onClick(val);
    }
    if (options.toggleOnClick) {
      toggle();
    }
  }
  return (
    <div className="relative z-30" ref={menuRef}>
      <button
        onClick={toggle}
        className={concat(
          className ? className : '',
          options.box
            ? 'bg-types-200/80 px-4 text-sm py-[0.4rem] border hover:bg-types-150 animate shadow !rounded-full border-types-250 hover:bg-types-200/50 focus:ring-2'
            : '',
          'flex items-center font-medium text-on-100 justify-between',
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
          <DropdownWrapper position={options.position}>
            {isLoading ? (
              <div className="flex justify-center">
                <LoadingIcon />
              </div>
            ) : list ? (
              list?.map((item, i) => (
                <ListItem
                  active={active}
                  {...item}
                  key={i}
                  onGlobalClick={handleListClick}
                />
              ))
            ) : (
              component
            )}
          </DropdownWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
