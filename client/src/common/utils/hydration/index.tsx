import { Idea } from '../../lib/interfaces';
import IdeasHydration from './Ideas';

export const Hydrate = {
  Ideas: ({
    ...props
  }: {
    data?: Idea.Idea[];
    isLoading: boolean;
    error: unknown;
  }) => {
    return <IdeasHydration {...props} />;
  },
};
