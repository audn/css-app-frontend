import { Distribution, Hydration } from '../../lib/interfaces';
import CategoryHydration from './Categories';
import PostsHydration from './Posts';

export const Hydrate = {
  Posts: ({ ...props }: Hydration.Posts) => {
    return <PostsHydration {...props} />;
  },
  Categories: ({
    selectedValues,
    setSelectedValues,
    distribution,
    ...props
  }: Hydration.Category & {
    distribution?: Distribution;
    selectedValues: string[];
    setSelectedValues: (val: string) => void;
  }) => {
    return (
      <CategoryHydration
        {...props}
        distribution={distribution}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
      />
    );
  },
};
