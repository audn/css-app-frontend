import { GetStaticPaths, GetStaticProps } from 'next';
import { API } from '../../common/lib/interfaces';
import { getUser } from '../../common/utils/hooks/api/user';

function UserProfile({ user }: { user: API.Response<API.Models.User> }) {
  return <div>hi {user.payload?.results.username}</div>;
}

export default UserProfile;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = (ctx.params?.id || '') as string;

  const data = await (await getUser(id)).payload?.results;

  if (!data) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
  return {
    props: { post: data },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = () =>
  Promise.resolve({ paths: [], fallback: 'blocking' });
