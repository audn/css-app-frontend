import { AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { IListItem } from '../../lib/interfaces';
import { fadeInFromBottomAndOutBottom } from '../../utils/data/animations';
import listenForOutsideClick from '../../utils/helpers/listenForOutsideClick';
import Animate from '../layout/Animate';
import ListItem from './components/ListItem';

type Props = {
  children: ReactNode;
  list: IListItem[];
};
function Dropdown({ children, list }: Props) {
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
    <div ref={menuRef} onClick={toggle} className="relative">
      <button>{children}</button>
      <AnimatePresence>
        {isOpen && (
          <Animate
            variants={fadeInFromBottomAndOutBottom}
            className="absolute right-0 top-12"
          >
            <ul className="p-2 space-y-1 rounded-lg whitespace-nowrap text-on-100 bg-types-100">
              {list.map((item, i) => (
                <ListItem {...item} key={i} />
              ))}
            </ul>
          </Animate>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
