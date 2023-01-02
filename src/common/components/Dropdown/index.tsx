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
  wrapperClassName,
  onClick,
  open,
  showLibraryVector,
  options = { caret: true, position: 'center', toggleOnClick: false },
}: IDropdown & { showLibraryVector?: boolean }) {
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
  function handleAnyClick(val: string) {
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
            ? 'bg-types-100 px-3 py-[0.3rem] text-sm border animate shadow rounded-md border-types-150 hover:bg-types-250/50 focus:ring-2'
            : '',
          'flex items-center text-on-100 justify-between',
        )}
      >
        {children}
        {options?.caret && (
          <span
            className={concat(
              options.animateCaret ? (isOpen ? 'rotate-180' : 'rotate-0') : '',
              'flex-shrink-0 ml-1 text-[10px] animate',
            )}
          >
            <i className="fa-solid fa-angle-down" />
          </span>
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <DropdownWrapper
            position={options.position}
            className={wrapperClassName}
          >
            {isLoading ? (
              <div className="flex justify-center">
                <LoadingIcon />
              </div>
            ) : list ? (
              list?.map((item, i) => (
                <ListItem
                  showLibraryVector={showLibraryVector}
                  active={active}
                  //   onAnyClick={options.toggleOnClick}
                  {...item}
                  key={i}
                  onGlobalClick={handleAnyClick}
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
