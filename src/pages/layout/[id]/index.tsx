import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import Link from '../../../common/components/layout/Link';
import PenEditor from '../../../common/components/layout/Pen/Editor';
import Preview from '../../../common/components/layout/Pen/Preview';
import { DefaultLayout } from '../../../common/layouts/Default';
import { API } from '../../../common/lib/interfaces';
import EditModal from '../../../common/pages/pen/components/EditModal';
import InfoTag from '../../../common/pages/pen/components/InfoTag';
import concat from '../../../common/utils/helpers/concat';
import toDate from '../../../common/utils/helpers/toDate';
import { getLayoutFromId } from '../../../common/utils/hooks/api/layouts';

function Layout({ layout }: { layout: API.Models.Layout }) {
  const {
    author,
    // description,
    responsive,
    code,
    animated,
    theme,
    library,
    libraryVersion,
    // createdAt,
    title,
  } = layout;

  //   const router = useRouter();

  const [isEditing, setEdit] = useState<boolean>(false);

  const [view, setView] = useState<'Code' | 'Preview'>('Preview');
  const toggleEdit = () => setEdit(!isEditing);
  const simpleInfo = [
    {
      label: 'Library',
      value: (
        <>
          <img src={`/libraries/${library}.svg`} className="w-5 h-5 mr-2" />{' '}
          {library}@{libraryVersion}
        </>
      ),
      icon: 'fa-regular fa-at',
    },
    {
      label: 'Animated',
      value:
        JSON.stringify(animated) !== 'null' ? (
          <i className="text-green-500 fa-solid fa-check" />
        ) : (
          <i className="text-red-500 fa-solid fa-times" />
        ),
      icon: 'fa-regular fa-circle-play',
    },
    {
      label: 'Responsive',
      value:
        JSON.stringify(responsive) !== 'null' ? (
          <i className="text-green-500 fa-solid fa-check" />
        ) : (
          <i className="text-red-500 fa-solid fa-times" />
        ),
      icon: 'fa-regular fa-up-right-and-down-left-from-center',
    },
    {
      label: 'Theme',
      value: theme || 'Dark',
      icon: 'fa-regular fa-eye',
    },
    {
      label: 'Author',
      value: (
        <>
          <img src={author.avatar} className="w-5 h-5 mr-2 rounded-full" />
          <Link
            href={`/user/${author.id}`}
            className="hover:text-white animate"
          >
            {' '}
            <h3>{author?.username}</h3>
          </Link>
        </>
      ),
      icon: 'fa-regular fa-user',
    },
    {
      label: 'Added',
      value: toDate({
        dateString: String(new Date(layout.createdAt)),
        options: {
          show: { month: 'short', day: '2-digit', year: 'numeric' },
        },
      }),
      icon: 'fa-regular fa-calendar',
    },
  ];

  return (
    <DefaultLayout className="-m-8 -mx-10">
      <NextSeo
        title={title}
        openGraph={{
          url: `https://css.app/component/${layout.id}`,
          images: [
            {
              url: layout.generatedImage!,
              height: 1080,
              width: 1920,
              alt: `${layout.title}`,
              type: 'image/jpeg',
            },
          ],
        }}
        twitter={{
          cardType: 'summary',
        }}
        description={layout.description}
      />{' '}
      <EditModal isOpen={isEditing} onClose={toggleEdit} component={layout} />
      <div className="relative flex">
        <div className="flex flex-col w-full ">
          <div className="grid w-full grid-cols-3 py-5">
            <div></div>
            <div className="flex justify-center">
              <AnimateSharedLayout>
                <div className="z-10 flex items-center px-2 space-x-1 rounded-full h-11 bg-types-150/70">
                  {['Preview', 'Code'].map((x: any) => (
                    <button
                      onClick={() => setView(x)}
                      key={x}
                      className={concat(
                        x === view ? 'text-white' : 'hover:text-white',
                        'relative z-20 flex flex-col justify-center h-8 px-3',
                      )}
                    >
                      {x}
                      {view === x ? (
                        <div className="px-3 -z-10">
                          <motion.div
                            layoutId="underline"
                            className="absolute left-0 z-10 w-full h-8 px-3 text-sm text-white rounded-full bg-types-250 -top-0"
                          />
                        </div>
                      ) : null}
                    </button>
                  ))}
                </div>
              </AnimateSharedLayout>
            </div>
          </div>
          <div className="flex w-full h-full px-10 ">
            <div className="flex items-start justify-center w-full">
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  className="flex items-center justify-center w-full"
                  key={view}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {view === 'Preview' ? (
                    <div className="relative w-full h-screen overflow-hidden rounded-lg">
                      <Preview
                        type="layout"
                        initialCode={code}
                        library={library}
                        version={libraryVersion}
                      />
                    </div>
                  ) : (
                    <div className="w-full overflow-hidden border rounded-xl border-types-150 bg-types-50">
                      <PenEditor
                        templateCode={code}
                        fullHeight={false}
                        initialContent={code}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {view === 'Code' && (
          <div className="sticky top-0 max-w-[350px] h-screen w-full pt-10 right-0 border-l bg-types-100 border-types-150">
            {simpleInfo.map((x) => (
              <InfoTag {...x} />
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default Layout;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = (ctx.params?.id || '') as string;

  const data = await getLayoutFromId(id);
  1;
  if (data.error) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
  return {
    props: { layout: data.payload?.results },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = () =>
  Promise.resolve({ paths: [], fallback: 'blocking' });
