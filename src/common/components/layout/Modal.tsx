import { AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';
import {
  fadeIn,
  fadeInFromBottomAndOutBottom,
  scaleIn,
} from '../../utils/data/animations';
import concat from '../../utils/helpers/concat';
import handleScrollbarChange from '../../utils/helpers/scrollbarModal';
import Animate from './Animate';

type Props = {
  onClose?: () => void;
  open: boolean;
  children: ReactNode;
  className?: string;
  options?: {
    mobile?: { position?: 'bottom' | 'center'; height?: 'full' | 'auto' };
  };
};
function Modal({ onClose, className, children, open, options }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getExtraClassNames = () => {
    let settings = [];
    if (options?.mobile?.height == 'auto') {
      settings.push('h-auto');
    } else if (options?.mobile?.height == 'full') {
      settings.push('h-[-webkit-fill-available] sm:h-auto ');
    }

    if (options?.mobile?.position == 'bottom') {
      settings.push('border-t sm:border rounded-t-xl sm:rounded-lg');
    } else if (options?.mobile?.position == 'center') {
      settings.push('border rounded-lg');
    }
    return settings.join('');
  };
  useEffect(() => {
    handleScrollbarChange(open);
  }, [open, containerRef.current]);

  const getAnimation =
    typeof window !== 'undefined' && window.innerWidth < 640
      ? fadeInFromBottomAndOutBottom
      : scaleIn;
  return (
    <AnimatePresence>
      {open && (
        <div
          className={concat(
            options?.mobile?.position == 'center'
              ? 'items-center'
              : 'items-end',
            'fixed inset-0 z-50 flex justify-center sm:items-center',
          )}
          ref={containerRef}
        >
          <Animate
            variants={fadeIn}
            className="absolute inset-0 bg-opacity-70 bg-types-100 backdrop-blur-sm"
            onClick={() =>
              onClose ? onClose : () => console.log('cant close')
            }
          >
            &nbsp;
          </Animate>
          <Animate
            variants={getAnimation}
            ref={ref}
            className={concat(
              getExtraClassNames(),
              className ? className : '',
              'border-types-250 max-h-[800px] overflow-scroll scrollbar-none z-50 w-full max-w-md p-6 bg-types-200',
            )}
          >
            {children}
          </Animate>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
