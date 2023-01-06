import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import { useBeforeUnload } from 'react-use';
import { HeaderAddingComponent } from '../common/components/Header/AddingComponent';
import SelectCreateType from '../common/components/Header/SelectType';
import LibraryDropdown from '../common/components/layout/Pen/components/LibraryDropdown';
import PenEditor from '../common/components/layout/Pen/Editor';
import Preview from '../common/components/layout/Pen/Preview';
import { API, IPostSchemas } from '../common/lib/interfaces';
import concat from '../common/utils/helpers/concat';

function NewComponent() {
  const router = useRouter();
  const type = router.query.type as IPostSchemas;
  const [activeTab, setActiveTab] = useState<'HTML' | 'CSS'>('HTML');

  const [isSelectTypeModalOpen, setIsSelectTypeModalOpen] =
    useState<boolean>(false);

  const [data, setData] = useState<Partial<API.Models.Component>>({
    // title: '',
    code:
      type === 'component'
        ? `<!-- 
The results on the right are automatically centered.

Avoid adding elements such as <body> that make it difficult to copy and paste your component.
-->`
        : '',
    responsive: false,
    animated: false,
    library: 'TailwindCSS',
    libraryVersion: '3.2.4',
    theme: 'Light',
  });

  const update = (key: keyof API.Models.Component, value: string | boolean) => {
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

  useEffect(() => {
    if (router.isReady && type !== 'layout' && type !== 'component') {
      if (type !== 'component' && type !== 'layout') {
        setIsSelectTypeModalOpen(true);
      }
    }
  }, [router.isReady]);
  useBeforeUnload(data.code!.length >= 1, '');
  const files = {
    CSS: {
      name: 'style.css',
      language: 'css',
      value: data.css,
    },
    HTML: {
      name: 'index.html',
      language: 'html',
      value: data.code,
    },
  } as any;

  const [fileName, setFileName] = useState('HTML');
  const file = files[fileName];

  function onChange(x: any) {
    if (fileName == 'CSS') {
      update('css', x);
    } else {
      update('code', x);
    }
  }

  return (
    <div className="-mx-10 -my-8">
      {isSelectTypeModalOpen && (
        <SelectCreateType
          isOpen={isSelectTypeModalOpen}
          onClose={() => setIsSelectTypeModalOpen(false)}
        />
      )}
      <NextSeo title={`New ${type}`} />
      <HeaderAddingComponent data={data} update={update} type={type} />
      {/* @ts-ignore */}
      <SplitPane
        split={'vertical'}
        // minSize={size.min}
        maxSize={1500}
        size={size.current}
        onChange={updateCurrentSize}
        className="!relative !h-[fit-content]"
        onDragStarted={() => setResizing(true)}
        onDragFinished={() => setResizing(false)}
        allowResize={true}
        resizerClassName={
          true && size.layout !== 'preview' ? 'Resizer' : 'Resizer-collapsed'
        }
      >
        <div className="border-r border-types-150">
          <div className="flex justify-between w-full px-5 py-2 border-b border-types-150">
            {data.library === 'CSS3' && (
              <div className="flex items-center space-x-2">
                {['HTML', 'CSS'].map((x: any) => (
                  <button
                    onClick={() => (setFileName(x), setActiveTab(x))}
                    className={concat(
                      activeTab === x ? 'text-white' : 'hover:text-white',
                      'text-sm font-semibold animate',
                    )}
                  >
                    {x}
                  </button>
                ))}
              </div>
            )}
            <LibraryDropdown data={data} update={update} />
          </div>
          <PenEditor file={file} onChange={(v) => onChange(v)} />
        </div>
        <Preview
          type={type}
          files={files}
          library={data.library && data?.library.toLowerCase()}
          version={data.libraryVersion}
          className="-z-10"
        />
      </SplitPane>
    </div>
  );
}

export default NewComponent;
