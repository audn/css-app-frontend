import { ReactNode } from 'react';
import { Button as IButton } from '../../lib/interfaces';
import { ButtonWrapper } from './components/ButtonWrapper';
import PrimaryButton from './Primary';
import SecondaryButton from './Secondary';
import WhiteButton from './White';

export const Button = {
  Wrapper: ({ ...props }: { className?: string; children: ReactNode }) => {
    return <ButtonWrapper {...props} />;
  },
  Primary: ({ ...props }: IButton.Base) => {
    return <PrimaryButton {...props} />;
  },

  White: ({ ...props }: IButton.Base) => {
    return <WhiteButton {...props} />;
  },
  Secondary: ({ ...props }: IButton.Base) => {
    return <SecondaryButton {...props} />;
  },
};
