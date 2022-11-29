import { AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';
import { fadeIn, scaleIn } from '../../utils/data/animations';
import handleScrollbarChange from '../../utils/helpers/scrollbarModal';
import Animate from './Animate';

type Props = {
  onClose: () => void;
  open: boolean;
  children: ReactNode;
};
function Modal({ onClose, children, open }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleScrollbarChange(open);
  }, [open, containerRef.current]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center "
          ref={containerRef}
        >
          <Animate
            variants={fadeIn}
            className="absolute inset-0 bg-opacity-80 bg-types-body"
            onClick={() => onClose()}
          >
            &nbsp;
          </Animate>
          <Animate
            variants={scaleIn}
            ref={ref}
            className="max-h-[800px] overflow-scroll scrollbar-none z-50 w-full max-w-md p-6 rounded-lg bg-types-200"
          >
            {children}
          </Animate>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
