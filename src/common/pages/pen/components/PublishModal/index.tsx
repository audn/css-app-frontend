import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../../../components/Buttons';
import { Form } from '../../../../components/Form';
import Modal from '../../../../components/layout/Modal';
import LoadingIcon from '../../../../components/misc/LoadingIcon';
import { API, IPostSchemas } from '../../../../lib/interfaces';
import { addComponent } from '../../../../utils/hooks/api/components';
import { useCategories } from '../../../../utils/hooks/categories';
import useGenerateThumbnail from '../../../../utils/useGenerateThumbnail';
import View1 from './screens/View1';
import View2 from './screens/View2';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  update: (key: keyof API.Models.Component, value: string | boolean) => void;
  data: Partial<API.Models.Component>;
  type: IPostSchemas;
};
function PublishModal({ isOpen, onClose, update, data, type }: Props) {
  const router = useRouter();
  const { data: categories } = useCategories(type);

  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [view, setView] = useState<'1' | '2'>('1');
  const canGoToStepTwo = () => {
    if (
      data.title &&
      data?.title.trim().length > 5 &&
      data.title !== 'Untitled' &&
      data.category
    ) {
      return true;
    }
  };
  const canPost = () => {
    return (
      Boolean(data.theme !== null && typeof data.theme !== 'undefined') &&
      canGoToStepTwo()
    );
  };

  async function publish() {
    if (canPost()) {
      const toaster = toast.loading('Working...');
      setIsPosting(true);
      const posted =
        // type === 'component'
        //       ?
        await addComponent({
          ...data,
          library: data.library!.toLowerCase(),
        });
      //   : await addLayout({
      //       ...data,
      //       library: data.library!.toLowerCase(),
      //     });
      if (posted.payload?.results) {
        await useGenerateThumbnail(type, posted.payload.results.id);
        toast.success('Success!', { id: toaster });
        router.push(`/${type}/${posted.payload.results.id}`);
      } else {
        toast.error(`Failed to post ${type}`, { id: toaster });
      }
      setIsPosting(false);
    }
  }

  return (
    <Modal onClose={() => onClose()} open={isOpen}>
      <div className="flex flex-col justify-between h-full transition-all duration-100 ease-out">
        <Form.Wrapper column={true} className="w-full">
          <h1 className="justify-center text-xl font-bold text-center text-white">
            {view == '1' ? `New ${type}` : 'Settings'}
          </h1>{' '}
          <AnimatePresence exitBeforeEnter>
            {view == '1' ? (
              <motion.div
                key="1"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <View1 data={data} update={update} categories={categories} />
              </motion.div>
            ) : (
              <motion.div
                key="2"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <View2 data={data} update={update} />
              </motion.div>
            )}
          </AnimatePresence>
        </Form.Wrapper>
        <Button.Wrapper className="flex !flex-wrap mt-10">
          {view === '2' ? (
            <div className="flex w-full gap-5">
              <Button.Secondary
                onClick={() => setView('1')}
                className="bg-types-250 !py-[0.7em] flex-1"
                title={`Back`}
                disabled={isPosting}
              />
              <Button.Primary
                className="flex-1"
                onClick={publish}
                title={
                  isPosting ? (
                    <div className="flex justify-center">
                      <LoadingIcon />
                    </div>
                  ) : (
                    `Publish`
                  )
                }
                disabled={!canPost()}
              />
            </div>
          ) : (
            <Button.Primary
              className="flex-1"
              onClick={() => setView('2')}
              title={`Next (${view}/2)`}
              disabled={!canGoToStepTwo()}
            />
          )}
        </Button.Wrapper>
      </div>
    </Modal>
  );
}

export default PublishModal;
