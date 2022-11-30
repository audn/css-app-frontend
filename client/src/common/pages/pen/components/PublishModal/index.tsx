import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../../../components/Buttons';
import { Form } from '../../../../components/Form';
import Modal from '../../../../components/layout/Modal';
import LoadingIcon from '../../../../components/misc/LoadingIcon';
import { API } from '../../../../lib/interfaces';
import useMainState from '../../../../store/main';
import { addPost } from '../../../../utils/hooks/api/posts';
import { useCategories } from '../../../../utils/hooks/categories';
import View1 from './screens/View1';
import View2 from './screens/View2';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  update: (key: keyof API.Models.Post, value: string | boolean) => void;
  data: Partial<API.Models.Post>;
};
function PublishModal({ isOpen, onClose, update, data }: Props) {
  const state = useMainState();
  const router = useRouter();
  const { data: categories } = useCategories();

  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [view, setView] = useState<'1' | '2'>('1');
  const canGoToStepTwo = () => {
    if (
      data.title &&
      data?.title.trim().length > 5 &&
      data.title !== 'Untitled'
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

  async function publishPen() {
    if (canPost()) {
      setIsPosting(true);

      const posted = await addPost({
        ...data,
        libraryVersion: state.version,
        library: state.library.toLowerCase(),
      });
      if (posted.payload?.results) {
        toast.success('Posted pen');
        router.push(`/${state.library}/${posted.payload.results.id}`);
      } else {
        toast.error('Something failed..');
      }
      setIsPosting(false);
    }
  }

  return (
    <Modal onClose={() => onClose()} open={isOpen}>
      <div className="h-[527.5px] flex justify-between flex-col">
        <Form.Wrapper column={true} className="w-full">
          <h1 className="justify-center text-xl font-bold text-center text-white">
            {view == '1' ? 'Pen Meta' : 'Pen Settings'}
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
        <Button.Wrapper className="flex !flex-wrap">
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
                onClick={publishPen}
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
