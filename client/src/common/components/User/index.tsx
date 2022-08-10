import { ReactNode } from 'react';
import UserAuthor from './Author';
import UserAvatar from './Avatar';

export const User = {
  EmptyUserObject: () => {
    return {
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
  Author: ({ ...props }: { children: ReactNode; route: string }) => {
    return <UserAuthor {...props} />;
  },
};
