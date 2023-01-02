import { Distribution, Hydration } from '../../lib/interfaces';
import CategoryHydration from './Categories';
import ComponentsHydration from './Components';

export const Hydrate = {
  Components: ({ ...props }: Hydration.Components) => {
    return <ComponentsHydration {...props} />;
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
