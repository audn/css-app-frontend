import { Hydration } from '../../lib/interfaces';
import IdeasHydration from './Ideas';

export const Hydrate = {
  Ideas: ({ ...props }: Hydration.Ideas) => {
    return <IdeasHydration {...props} />;
  },
};
