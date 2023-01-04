export const fadeIn = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const fadeInFromLeftAndOutLeft = {
  initial: { x: -10, opacity: 0 },
  enter: { x: 0, opacity: 1 },
  exit: {
    x: -10,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const fadeInFromRightAndOutRight = {
  initial: { x: 10, opacity: 0 },
  enter: { x: 0, opacity: 1 },
  exit: {
    x: 10,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const fadeInFromBottomAndOutBottom = {
  initial: { translateY: 30, x: 0, opacity: 1 },
  enter: { translateY: 0, opacity: 1 },
  exit: {
    translateY: 25,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};
export const dropdown = {
  initial: { y: -10, x: 0, opacity: 0 },
  enter: { y: 0, opacity: 1, transition: { duration: 0.1 } },
  exit: {
    y: -5,
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  enter: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};
