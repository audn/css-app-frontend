import { AnimatePresence } from 'framer-motion';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Hydration } from '../../../lib/interfaces';
import { fadeIn } from '../../../utils/data/animations';
import CategoryCard from '../../Cards/Category';
import HydrationError from '../../layout/Alerts/HydrationError';
import Animate from '../../layout/Animate';

function CategoryHydration({
  data,
  error,
  isLoading,
  refetch,
  isRefetching,
  selectedValues,
  setSelectedValues,
  distribution,
}: Hydration.Category & {
  distribution?: { [key: string]: number };
  selectedValues: string[];
  setSelectedValues: (val: string) => void;
}) {
  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#272e39" highlightColor="#38414f">
        <div className="flex flex-col items-center p-4 mx-auto rounded-md">
          loading categories
        </div>
      </SkeletonTheme>
    );
  } else if (error) {
    return (
      <HydrationError
        title="Couldn't get data"
        label={`An error occoured while trying to retrieve categories.`}
        onClick={refetch}
        isLoading={isRefetching}
      />
    );
  } else if (data?.payload && data?.payload?.count! >= 1) {
    console.log(distribution);

    return (
      <AnimatePresence initial={false}>
        <Animate variants={fadeIn} className="flex flex-wrap gap-2">
          {data.payload.results
            .sort((a, b) =>
              distribution
                ? Number(distribution[b.value]) - Number(distribution[a.value])
                : 0,
            )
            .map((category) => (
              <CategoryCard
                count={distribution ? distribution[category.value] : 0}
                {...category}
                key={category.value}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
              />
            ))}
        </Animate>
      </AnimatePresence>
    );
  } else {
    return <></>;
  }
}

export default CategoryHydration;
