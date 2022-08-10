import { Button as IButton } from '../../lib/interfaces';
import Controller from './components/Controller';
import PrimaryButton from './Primary';
import SecondaryButton from './Secondary';
import TwitterAuth from './TwitterAuth';
import WhiteButton from './White';

export const Button = {
  Primary: ({ ...props }: IButton.Base) => {
    return (
      <Controller {...props}>
        <PrimaryButton {...props} />
      </Controller>
    );
  },
  Secondary: ({ ...props }: IButton.Base) => {
    return (
      <Controller {...props}>
        <SecondaryButton {...props} />
      </Controller>
    );
  },
  TwitterAuth: ({ ...props }: IButton.Base) => {
    return <TwitterAuth {...props} />;
  },
  White: ({ ...props }: IButton.Base) => {
    return (
      <Controller {...props}>
        <WhiteButton {...props} />
      </Controller>
    );
  },
};
