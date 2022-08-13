import { useEffect } from 'react';
import Auth from '../common/components/layout/Auth';
import Category from '../common/components/misc/Category';
import { DefaultLayout } from '../common/layouts/Default';
import Login from '../common/pages/home/screens/Login';
import NewIdea from '../common/pages/home/screens/NewIdea';
import { useHomeState } from '../common/pages/home/store';
import { useIdeas } from '../common/utils/hooks/ideas';
import { Hydrate } from '../common/utils/hydration';

export default function Home() {
  const { sort, ideas } = useHomeState();

  const {
    data,
    isLoading,
    error: fetchError,
    refetch,
    isRefetching,
  } = useIdeas(sort);

  useEffect(() => {
    if (!isLoading) {
      if (data?.payload?.results) {
        useHomeState.setState({
          ideas: data?.payload?.results,
        });
      }
    }
  }, [data]);

  return (
    <DefaultLayout>
      <Auth.User>
        <NewIdea />
        <Login />
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
