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
    aggregation,
    ...props
  }: Hydration.Category & {
    aggregation?: { [key: string]: number }[];
    selectedValues: string[];
    setSelectedValues: (val: string) => void;
  }) => {
    return (
      <CategoryHydration
        {...props}
        aggregation={aggregation}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
      />
    );
  },
};
