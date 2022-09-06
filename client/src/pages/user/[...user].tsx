import { GetStaticPaths, GetStaticProps } from 'next';
import { Button } from '../../common/components/Buttons';
import { DefaultLayout } from '../../common/layouts/Default';
import { User as IUser } from '../../common/lib/interfaces';
import { getUser } from '../../common/utils/hooks/api/user';

function User({ user }: { user: IUser.User }) {
  return (
    <DefaultLayout title={`${user.name}`} className="py-5 sm:py-20">
      <div className="flex flex-col max-w-2xl mx-auto ">
        <div className="flex space-x-2">
          <Button.Secondary
            className="flex mb-8 text-on-100"
            label="Back"
            route="/"
            icon="fa-regular fa-arrow-left"
          />
        </div>
        <div className="flex items-center justify-between">hey</div>
      </div>
    </DefaultLayout>
  );
}

export default User;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const user = (ctx.params?.user || '') as string;

  const data = await getUser(user);

  if (!data) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
  return {
    props: { user: data.payload?.results },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = () =>
  Promise.resolve({ paths: [], fallback: 'blocking' });
