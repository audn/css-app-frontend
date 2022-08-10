import { ReactNode } from 'react';
import AlphaHeading from './Alpha';
import BravoHeading from './Bravo';
import PHeading from './P';

export const Alpha = ({ ...props }: { children: ReactNode }) => {
  return <AlphaHeading {...props} />;
};
export const Bravo = ({ ...props }: { children: ReactNode }) => {
  return <BravoHeading {...props} />;
};
export const P = ({ ...props }: { children: ReactNode }) => {
  return <PHeading {...props} />;
};
