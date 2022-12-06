import Color from 'color-thief-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import TimeAgo from 'react-timeago';
import { DefaultLayout } from '../../common/layouts/Default';
import { API } from '../../common/lib/interfaces';
import { getUser } from '../../common/utils/hooks/api/user';

function UserProfile({ user }: { user: API.Models.User }) {
  return (
    <DefaultLayout className="mt-3 md:mt-5">
      <NextSeo
        title={`${user.displayName ? user.displayName : user.username}`}
      />
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
          </Color>
          <div className="p-6">
            <div className="flex justify-between">
              <img
                src={user.avatar}
                className="w-24 h-24 -mt-20 rounded-full ring-8 ring-types-150"
              />
              <button className="flex items-center justify-center w-10 h-10 text-xl rounded-full text-on-50 hover:bg-types-200 hover:text-white animate">
                <i className="fa-solid fa-ellipsis-vertical" />
              </button>
            </div>
            <div className="-mt-2">
              <div className="flex flex-col">
                <div>
                  <h1 className="text-xl font-semibold text-white">
                    {user.displayName}
                  </h1>
                  <h4 className="mt-1 text-brand-primary-150">
                    @{user.username}
                  </h4>
                </div>
                <div className="mt-5 space-y-2">
                  <div>
                    <span className="font-medium">
                      {user.posts?.length || 0}
                    </span>{' '}
                    components
                  </div>
                  <div>
                    Member since{' '}
                    <span className="font-medium">
                      <TimeAgo date={user.createdAt} />
                    </span>
                  </div>
                </div>
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
