import { AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';

type Props = {
  onClose: () => void;
  open: boolean;
  children: ReactNode;
};
function Modal({ onClose, children, open }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflowY = open ? 'hidden' : 'auto';
    if (containerRef.current) {
      containerRef.current.style.overflowY = open ? 'auto' : 'hidden';
    }
  }, [open, containerRef.current]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center "
          ref={containerRef}
        >
          <div
            className="absolute inset-0 bg-opacity-80 bg-types-body"
            onClick={onClose}
          >
            &nbsp;
          </div>
          <div
            ref={ref}
            className="z-50 w-full max-w-sm p-6 rounded-lg bg-types-200"
          >
            {children}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
