import { AnimatePresence } from 'framer-motion';
import IdeaCard from '../../../components/IdeaCard';
import Animate from '../../../components/layout/Animate';
import Error from '../../../components/layout/Broadcast/Error';
import { Idea } from '../../../lib/interfaces';
import { fadeIn } from '../../data/animations';

function IdeasHydration({
  data,
  error,
  isLoading,
}: {
  data?: Idea.Idea[];
  isLoading: boolean;
  error: unknown;
}) {
  if (isLoading) {
    return <>loading..</>;
  } else if (error) {
    return (
      <Error
        title="Couldn't get data"
        label={`An error occoured while trying to retrieve ideas.`}
      />
    );
  } else
    return (
      <AnimatePresence initial={false}>
        <Animate variants={fadeIn} className="grid grid-cols-1 gap-5">
          {data?.map((idea, i) => (
            <IdeaCard {...idea} key={i} />
          ))}
        </Animate>
      </AnimatePresence>
    );
}

export default IdeasHydration;
