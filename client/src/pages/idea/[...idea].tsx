import { GetStaticPaths, GetStaticProps } from 'next';
import router from 'next/router';
import { Button } from '../../common/components/Buttons';
import IdeaCard from '../../common/components/IdeaCard';
import { DefaultLayout } from '../../common/layouts/Default';
import { Idea as IIDea } from '../../common/lib/interfaces';
import { getSpecificIdea } from '../../common/utils/hooks/api/ideas';

function Idea({ idea }: { idea: IIDea.Idea }) {
  return (
    <DefaultLayout title={`${idea.user?.username}'s idea`}>
      <div className="flex flex-col max-w-2xl mx-auto mt-16">
        <div className="flex">
          <Button.Secondary
            className="mb-8 text-on-100"
            label="Back"
            onClick={() => router.back()}
            icon="fa-regular fa-arrow-left"
          />
        </div>
        <IdeaCard {...idea} />{' '}
      </div>
    </DefaultLayout>
  );
}

export default Idea;

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(ctx.params);

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
