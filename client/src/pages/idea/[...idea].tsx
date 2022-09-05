import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../common/components/Buttons';
import Auth from '../../common/components/layout/Auth';
import Bravo from '../../common/components/layout/headings/Bravo';
import Charlie from '../../common/components/layout/headings/Charlie';
import P from '../../common/components/layout/headings/P';
import IdeaVote from '../../common/components/shared/idea/Vote';
import { User } from '../../common/components/User';
import { DefaultLayout } from '../../common/layouts/Default';
import { Idea as IIDea } from '../../common/lib/interfaces';
import {
  deleteIdea,
  getSpecificIdea,
} from '../../common/utils/hooks/api/ideas';
import LikedBy from './components/LikedBy';

function Idea({ idea }: { idea: IIDea.Idea }) {
  const router = useRouter();
  const [warn, setWarn] = useState<boolean>(false);

  async function handleDeleteIdea() {
    if (!warn) {
      setWarn(true);
    } else {
      const msg = toast.loading('Deleting idea...');
      const { error } = await deleteIdea(idea.id);

      if (!error) {
        toast.success('Deleted!', { id: msg });
        router.push('/');
      } else {
        toast.error('Failed to delete idea.', { id: msg });
      }
    }
  }
  return (
    <DefaultLayout
      title={`${idea.user?.username}'s idea`}
      className="py-5 sm:py-20"
    >
      <div className="flex flex-col max-w-2xl mx-auto ">
        <div className="flex space-x-2">
          <Button.Secondary
            className="flex mb-8 text-on-100"
            label="Back"
            route="/"
            icon="fa-regular fa-arrow-left"
          />
          <Auth.Admin>
            <Button.Secondary
              danger={warn}
              className={'flex mb-8 text-on-100'}
              label={warn ? 'Are you sure?' : 'Delete'}
              onClick={handleDeleteIdea}
              icon="fa-regular fa-trash-alt"
            />
          </Auth.Admin>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User.Avatar user={idea.user} className="mr-3" />
            <div className="flex flex-col">
              <Bravo className="!mb-0">
                <User.DisplayName user={idea.user} />
              </Bravo>
              <User.Username user={idea.user} className="text-on-100" />
            </div>
          </div>
          <IdeaVote idea={idea} />
        </div>
        <P className="px-4 py-3 mt-5 bg-types-100 rounded-xl">{idea.message}</P>
        {idea.upvotes && idea?.upvotes.length >= 1 && (
          <div className="flex flex-col px-4 py-3 mt-5 gap-y-3 bg-types-100 rounded-xl">
            <Charlie className="!text-base">Upvoted by</Charlie>
            {idea.upvotes?.map((user) => (
              <LikedBy {...user} key={user.user.id} />
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default Idea;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const idea = (ctx.params?.idea || '') as string;

  const data = await getSpecificIdea(idea);

  if (!data) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
  return {
    props: { idea: data.payload?.results },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = () =>
  Promise.resolve({ paths: [], fallback: 'blocking' });
