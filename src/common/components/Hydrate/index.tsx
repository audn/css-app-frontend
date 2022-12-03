import { Hydration } from '../../lib/interfaces';
import PostsHydration from './Posts';

export const Hydrate = {
  Posts: ({ ...props }: Hydration.Posts) => {
    return <PostsHydration {...props} />;
  },
};
