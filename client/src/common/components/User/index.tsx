import { ReactNode } from 'react';
import { User as IUser } from '../../lib/interfaces';
import UserAuthor from './Author';
import UserAvatar from './Avatar';

export const User = {
  EmptyUserObject: (): IUser.User => {
    return {
      role: 'USER',
      verified: false,

      username: '',
      profile_image_url: '',
      name: '',
      id: '',
    };
  },
  Avatar: ({ ...props }: { className?: string; [x: string]: any }) => {
    return <UserAvatar {...props} />;
  },
  Author: ({ ...props }: { children: ReactNode; user?: IUser.User }) => {
    return <UserAuthor {...props} />;
  },
};
