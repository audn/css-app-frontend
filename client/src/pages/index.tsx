import { SyntheticEvent, useEffect, useState } from 'react';
import { Button } from '../common/components/Buttons';
import { Form } from '../common/components/Form';
import Animate from '../common/components/layout/Animate';
import Alpha from '../common/components/layout/headings/Alpha';
import P from '../common/components/layout/headings/P';
import Category from '../common/components/misc/Category';
import { User } from '../common/components/User';
import { DefaultLayout } from '../common/layouts/Default';
import { Idea } from '../common/lib/interfaces';
import { fadeIn } from '../common/utils/data/animations';
import { postIdea } from '../common/utils/hooks/api/ideas';
import { useIdeas } from '../common/utils/hooks/ideas';
import { Hydrate } from '../common/utils/hydration';
import { useAuthState } from '../store/auth';

export default function Home() {
  let [sort, setSort] = useState<Idea.SortBy>('votes');

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

  const { currentUser, isLoggedIn } = useAuthState((s) => ({
    isLoggedIn: s.isLoggedIn,
    currentUser: s.user,
  }));

  let [isPosting, setPosting] = useState<boolean>(false);
  let [message, setMessage] = useState<string>('');
  let [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isLoading) {
      if (data?.payload?.results) {
        setIdeas(data?.payload?.results);
      }
    }
  }, [data]);

  async function onPost(event: SyntheticEvent) {
    event.preventDefault();
    setPosting(true);
    const { error, payload } = await postIdea({ message });
    if (error) {
      setError(error);
    }
    if (payload) {
      setMessage('');
      ideas?.unshift(payload?.results);
      setSort('date');
    }
    setPosting(false);
  }

  return (
    <DefaultLayout>
      {isLoggedIn ? (
        <Animate variants={fadeIn} className="max-w-2xl mx-auto text-left">
          <Alpha>Hey, {currentUser.name}👋</Alpha>
          <div className="flex mt-12">
            <User.Avatar {...currentUser!} />
            <div className="flex flex-col items-end w-full ml-4">
              <Form.Textarea
                value={message}
                onChange={setMessage}
                error={error}
                placeholder="Your idea"
              />
              <Button.Primary
                label="Post idea"
                onClick={onPost}
                disabled={message.length < 10}
                isLoading={isPosting}
              />
            </div>
          </div>
        </Animate>
      ) : (
        <Animate variants={fadeIn} className="flex flex-col items-center ">
          <div className="flex flex-col items-center p-8 px-12 rounded-2xl bg-types-100">
            <Alpha>Let the brainstorming begin!</Alpha>
            <P className="text-lg">
              Do you have an idea of what css.app can be built into?
            </P>
            <Button.TwitterAuth className="flex mt-5" />
          </div>
        </Animate>
      )}
      <div className="max-w-2xl mx-auto mt-16">
        <div className="flex flex-wrap justify-center mb-10 space-x-2">
          <Category
            activeSort={sort}
            onClick={setSort}
            label="Most voted"
            value="votes"
            icon="angle-up"
          />
          <Category
            activeSort={sort}
            onClick={setSort}
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
