import { Distribution, Hydration } from '../../lib/interfaces';
import CategoryHydration from './Categories';
import ComponentsHydration from './Components';
import LayoutsHydration from './Layouts';

export const Hydrate = {
  Components: ({ ...props }: Hydration.Components) => {
    return <ComponentsHydration {...props} />;
  },
  Layouts: ({ ...props }: Hydration.Components) => {
    return <LayoutsHydration {...props} />;
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
