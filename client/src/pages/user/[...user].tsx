import { GetStaticPaths, GetStaticProps } from 'next';
import { Button } from '../../common/components/Buttons';
import Bravo from '../../common/components/layout/headings/Bravo';
import { User } from '../../common/components/User';
import { DefaultLayout } from '../../common/layouts/Default';
import { User as IUser } from '../../common/lib/interfaces';
import { getUser } from '../../common/utils/hooks/api/user';

function UserProfile({ user }: { user: IUser.User }) {
  return (
    <DefaultLayout title={`${user.name}`}>
      <div className="flex space-x-2">
        <Button.Secondary
          className="flex mb-8 text-on-100"
          label="Back"
          route="/"
          icon="fa-regular fa-arrow-left"
        />
      </div>
      <div className="flex items-center justify-between">
        <User.Author user={user}>
          <User.Avatar user={user} className="mr-3" />
          <div className="flex flex-col">
            <Bravo className="!mb-0">
              <User.DisplayName user={user} />
            </Bravo>
            <User.Username user={user} className="text-on-100" />
          </div>
        </User.Author>
      </div>
      <div className="mt-5">
        <User.Ideas user={user} />
      </div>
    </DefaultLayout>
  );
}

export default UserProfile;

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
    props: { user: (data.payload?.results as any)[0] },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = () =>
  Promise.resolve({ paths: [], fallback: 'blocking' });
