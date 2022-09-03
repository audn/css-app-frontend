import { AnimatePresence } from 'framer-motion';
import { SkeletonTheme } from 'react-loading-skeleton';
import IdeaCard from '../../../components/IdeaCard';
import Animate from '../../../components/layout/Animate';
import Error from '../../../components/layout/Broadcast/Error';
import { Hydration } from '../../../lib/interfaces';
import { fadeIn } from '../../data/animations';
import SkeletonIdeaCard from './components/Skeleton';

function IdeasHydration({
  data,
  error,
  isLoading,
  refetch,
  isRefetching,
}: Hydration.Ideas) {
  if (!isLoading) {
    return (
      <SkeletonTheme color="#272e39" highlightColor="#38414f">
        <Animate variants={fadeIn} className="grid grid-cols-1 gap-5">
          {[...Array.from(Array(20)).map((x) => <SkeletonIdeaCard />)]}
        </Animate>
      </SkeletonTheme>
    );
  } else if (error) {
    return (
      <Error
        title="Couldn't get data"
        label={`An error occoured while trying to retrieve ideas.`}
        onClick={refetch}
        isLoading={isRefetching}
      />
    );
  } else
    return (
      <AnimatePresence initial={false}>
        <Animate variants={fadeIn} className="grid grid-cols-1 gap-5">
          {data?.map((idea) => (
            <IdeaCard key={idea.id} {...idea} />
          ))}
        </Animate>
      </AnimatePresence>
    );
}

export default IdeasHydration;
