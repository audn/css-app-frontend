import { Hydration } from '../../lib/interfaces';
import CategoryHydration from './Categories';
import PostsHydration from './Posts';

export const Hydrate = {
  Posts: ({ ...props }: Hydration.Posts) => {
    return <PostsHydration {...props} />;
  },
  Categories: ({
    selectedValues,
    setSelectedValues,
    ...props
  }: Hydration.Category & {
    selectedValues: string[];
    setSelectedValues: (val: string) => void;
  }) => {
    return (
      <CategoryHydration
        {...props}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
      />
    );
  },
};
