import { useEffect, useState } from 'react';
import { Button } from '../common/components/Buttons';
import Animate from '../common/components/layout/Animate';
import Auth from '../common/components/layout/Auth';
import Bravo from '../common/components/layout/headings/Bravo';
import P from '../common/components/layout/headings/P';
import Category from '../common/components/misc/Category';
import { DefaultLayout } from '../common/layouts/Default';
import { Idea } from '../common/lib/interfaces';
import NewIdea from '../common/pages/home/screens/NewIdea';
import { useHomeState } from '../common/pages/home/store';
import { fadeIn } from '../common/utils/data/animations';
import { useIdeas } from '../common/utils/hooks/ideas';
import { Hydrate } from '../common/utils/hydration';

export default function Home() {
  const { sort } = useHomeState();

  const {
    data,
    isLoading,
    error: fetchError,
    refetch,
    isRefetching,
  } = useIdeas(sort);

  let [ideas, setIdeas] = useState<Idea.Idea[] | undefined>(
    data?.payload?.results,
  );

  useEffect(() => {
    if (!isLoading) {
      if (data?.payload?.results) {
        setIdeas(data?.payload?.results);
      }
    }
  }, [data]);

  return (
    <DefaultLayout>
      <Auth.User>
        <NewIdea />
        <Animate variants={fadeIn} className="flex flex-col items-center ">
          <div className="flex flex-col items-center p-8 px-12 rounded-2xl bg-types-100">
            <Bravo>Let the brainstorming begin!</Bravo>
            <P className="mb-8 text-lg text-on-150">
              Do you have an idea of what css.app can be built into?
            </P>
            <Button.TwitterAuth />
          </div>
        </Animate>
      </Auth.User>

      <div className="max-w-2xl mx-auto mt-16">
        <div className="flex flex-wrap justify-center mb-10 space-x-2">
          <Category
            activeSort={sort}
            onClick={(sort) => useHomeState.setState({ sort })}
            label="Most voted"
            value="votes"
            icon="angle-up"
          />
          <Category
            activeSort={sort}
            onClick={(sort) => useHomeState.setState({ sort })}
            label="Recently added"
            value="date"
            icon="calendar"
          />
        </div>
        <Hydrate.Ideas
          data={ideas}
          error={fetchError}
          isLoading={isLoading}
          refetch={refetch}
          isRefetching={isRefetching}
        />
      </div>
    </DefaultLayout>
  );
}
