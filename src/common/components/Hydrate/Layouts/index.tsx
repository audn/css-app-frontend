import { AnimatePresence } from 'framer-motion';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Hydration } from '../../../lib/interfaces';
import { fadeIn } from '../../../utils/data/animations';
import LayoutCard from '../../Cards/Layout';
import HydrationError from '../../layout/Alerts/HydrationError';
import NothingToHydrate from '../../layout/Alerts/NothingToHydrate';
import Animate from '../../layout/Animate';

function LayoutsHydration({
  data,
  error,
  isLoading,
  refetch,
  isRefetching,
  onClearFilters,
}: Hydration.Layouts) {
  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#272e39" highlightColor="#38414f">
        <div className="flex flex-col items-center p-4 mx-auto rounded-md">
          loading layouts
        </div>
      </SkeletonTheme>
    );
  } else if (error) {
    return (
      <HydrationError
        title="Couldn't get data"
        label={`An error occoured while trying to retrieve layouts.`}
        onClick={refetch}
        isLoading={isRefetching}
      />
    );
  } else if (data) {
    return (
      <AnimatePresence initial={false}>
        <Animate
          variants={fadeIn}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {data.map((page) => (
            <LayoutCard {...page} key={page.id} />
          ))}
        </Animate>
      </AnimatePresence>
    );
  } else {
    return (
      <NothingToHydrate onClick={onClearFilters} isLoading={isRefetching} />
    );
  }
}

export default LayoutsHydration;
