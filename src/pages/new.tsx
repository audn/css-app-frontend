import { NextSeo } from 'next-seo';
import { useCallback, useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import { useBeforeUnload } from 'react-use';
import { HeaderAddingComponent } from '../common/components/Header/AddingComponent';
import PenEditor from '../common/components/layout/Pen/Editor';
import Preview from '../common/components/layout/Pen/Preview';
import NotLoggedInModal from '../common/components/layout/shared/NotLoggedIn';
import { API } from '../common/lib/interfaces';
import useAuthState from '../common/store/auth';

function NewComponent() {
  const user = useAuthState((s) => s.user);
  const [data, setData] = useState<Partial<API.Models.Post>>({
    // title: '',
    code: '',
    responsive: false,
    animated: false,
    library: 'TailwindCSS',
    libraryVersion: '3.2.4',
    theme: 'Light',
  });

  const update = (key: keyof API.Models.Post, value: string | boolean) => {
    setData((d) => ({
      ...d,
      [key]: value,
    }));
    if (key === 'code') {
      const html = {
        type: 'html',
        value,
      };
      const iframe = document.querySelector('iframe') as HTMLIFrameElement;
      if (typeof window !== 'undefined' && iframe.contentWindow) {
        iframe.contentWindow.postMessage(html, '*');
      }
    }
  };

  useEffect(() => {
    // this is to "rebuild" the code after user changes library or version
    // not sure how to avoid this, so feel free to make a PR
    if (data.code) {
      setTimeout(() => {
        const html = {
          type: 'html',
          value: data.code,
        };
        const iframe = document.querySelector('iframe') as HTMLIFrameElement;
        if (typeof window !== 'undefined' && iframe.contentWindow) {
          iframe.contentWindow.postMessage(html, '*');
        }
      }, 200);
      //   return () => clearTimeout(render);
    }
  }, [data.library, data.libraryVersion]);

  const isLg = true;

  const [size, setSize] = useState({
    percentage: 0.8,
    min: 320,
    max: 320,
    layout: 'horizontal',
    current: 1000,
  });
  const [resizing, setResizing] = useState(false);
  const HEADER_HEIGHT = 60 - 1;
  const TAB_BAR_HEIGHT = 40;
  const RESIZER_SIZE = 400;

  useEffect(() => {
    if (resizing) {
      document.body.classList.add(
        size.layout === 'vertical' ? 'cursor-ew-resize' : 'cursor-ns-resize',
      );
    } else {
      document.body.classList.remove(
        size.layout === 'vertical' ? 'cursor-ew-resize' : 'cursor-ns-resize',
      );
    }
  }, [resizing]);

  useEffect(() => {
    function updateSize() {
      setSize((size) => {
        const windowSize =
          size.layout === 'horizontal'
            ? document.documentElement.clientHeight - HEADER_HEIGHT
            : document.documentElement.clientWidth;

        if (isLg && size.layout !== 'preview') {
          const min = size.layout === 'vertical' ? 320 : 320 + TAB_BAR_HEIGHT;
          const max =
            size.layout === 'vertical'
              ? windowSize - min - RESIZER_SIZE
              : windowSize - 320 - RESIZER_SIZE;

          return {
            ...size,
            min,
            max,
            current: Math.max(
              Math.min(Math.round(windowSize * size.percentage)),
              min,
            ),
          };
        }

        const newSize =
          (isLg && size.layout !== 'preview') ||
          (!isLg && size.layout === 'editor')
            ? windowSize
            : 0;

        return {
          ...size,
          current: newSize,
          min: newSize,
          max: newSize,
        };
      });
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [setSize, size.layout]);

  const updateCurrentSize = useCallback((newSize: number) => {
    setSize((size) => {
      const windowSize =
        size.layout === 'vertical'
          ? document.documentElement.clientWidth
          : document.documentElement.clientHeight - 80;
      const percentage = newSize / windowSize;
      return {
        ...size,
        current: newSize,
        percentage:
          percentage === 1 || percentage === 0 ? size.percentage : percentage,
      };
    });
  }, []);
  useBeforeUnload(data.code.length >= 1, 'd');
  return (
    <div>
      {!user.id && <NotLoggedInModal />}
      <NextSeo title={`New component`} />{' '}
      <HeaderAddingComponent data={data} update={update} />
      {/* @ts-ignore */}
      <SplitPane
        split={'vertical'}
        // minSize={size.min}
        maxSize={1500}
        size={size.current}
        onChange={updateCurrentSize}
        className="!relative !h-[fit-content]"
        paneStyle={{ marginTop: -1 }}
        onDragStarted={() => setResizing(true)}
        onDragFinished={() => setResizing(false)}
        allowResize={true}
        resizerClassName={
          true && size.layout !== 'preview' ? 'Resizer' : 'Resizer-collapsed'
        }
      >
        <PenEditor
          initialContent={data.code}
          onChange={(val) => update('code', val)}
        />
        <Preview
          library={data.library && data?.library.toLowerCase()}
          version={data.libraryVersion}
          className="-z-10"
        />
      </SplitPane>
    </div>
  );
}

export default NewComponent;
