import { ReactNode } from 'react';
import { User as IUser } from '../../lib/interfaces';
import UserAuthor from './Author';
import UserAvatar from './Avatar';
import DisplayName from './DisplayName';
import UserIdeas from './Ideas';
import Username from './Username';

export const User = {
  EmptyUserObject: (): IUser.User => {
    return {
      role: 'USER',
      verified: false,
      downvotedIdeas: [],
      ideas: [],
      upvotedIdeas: [],
      username: '',
      profile_image_url: '',
      name: '',
      id: '',
    };
  },
  Ideas: ({ ...props }: { user?: IUser.User }) => {
    return <UserIdeas {...props} />;
  },
  Avatar: ({ ...props }: { className?: string; user?: IUser.User }) => {
    return <UserAvatar {...props} />;
  },
  DisplayName: ({ ...props }: { className?: string; user?: IUser.User }) => {
    return <DisplayName {...props} />;
  },
  Username: ({ ...props }: { className?: string; user?: IUser.User }) => {
    return <Username {...props} />;
  },
  Author: ({ ...props }: { children: ReactNode; user?: IUser.User }) => {
    return <UserAuthor {...props} />;
  },
};
