import Color from 'color-thief-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { DefaultLayout } from '../../common/layouts/Default';
import { API } from '../../common/lib/interfaces';
import { getUser } from '../../common/utils/hooks/api/user';

function UserProfile({ user }: { user: API.Models.User }) {
  return (
    <DefaultLayout className="mt-3 md:mt-5">
      <div className="max-w-3xl mx-auto">
        <div className="overflow-hidden border bg-types-150 border-types-200 rounded-2xl">
          <Color crossOrigin="anonymous" format="hex" src={user.avatar}>
            {({ data }) => {
              return (
                <div
                  className={`h-[200px] w-full`}
                  style={{ backgroundColor: data }}
                />
              );
            }}
          </Color>{' '}
          {/* <Palette
            colorCount={10}
            crossOrigin="anonymous"
            format="hex"
            src={user.avatar}
          >
            {({ data, loading }) => {
              if (!loading)
                return (
                  <div
                    className={`h-[200px] w-full`}
                    style={{ backgroundColor: data[3] }}
                  />
                );
            }}
          </Palette> */}
          <div className="p-8 -mt-20">
            <div className="flex">
              <img
                src={user.avatar}
                className="w-24 h-24 rounded-full ring-8 ring-types-150"
              />
            </div>
            <div className="mt-3">
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-white">
                  {user.displayName}
                </h1>
                <h4 className="text-brand-primary-150">@{user.username}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
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
    props: { user: data },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = () =>
  Promise.resolve({ paths: [], fallback: 'blocking' });
