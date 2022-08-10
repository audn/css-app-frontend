import { Button as IButton } from '../../lib/interfaces';
import PrimaryButton from './Primary';
import TwitterAuth from './TwitterAuth';

export const Button = {
  Primary: ({ ...props }: IButton.Base) => {
    return <PrimaryButton {...props} />;
  },
  TwitterAuth: ({ ...props }: IButton.Base) => {
    return <TwitterAuth {...props} />;
  },
};
