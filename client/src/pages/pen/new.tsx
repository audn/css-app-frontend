import { useCallback, useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import { Form } from '../../common/components/Form';
import { HeaderAddingComponent } from '../../common/components/Header/AddingComponent';
import { defaultPenData } from '../../common/components/Pen/data';
import PenEditor from '../../common/components/Pen/Editor';
import Preview from '../../common/components/Pen/Preview';
import { API } from '../../common/lib/interfaces';
import useMainState from '../../common/store/main';

function NewComponent() {
  const { library } = useMainState((s) => ({
    library: s.library,
  }));

  const [data, setData] = useState<Partial<API.Models.Post>>({
    title: 'Untitled',
    code: defaultPenData.find((x) => x.label === library)?.value,
  });
  //   const { data: categories, isLoading } = useCategories();

  useEffect(() => {
    if (library) {
      update(
        'code',
        defaultPenData.find((x) => x.label === library)?.value ?? '',
      );
    }
  }, [library]);

  const update = (key: keyof API.Models.Post, value: string | boolean) => {
    setData((d) => ({
      ...d,
      [key]: value,
    }));
  };

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

  return (
    <div>
      <HeaderAddingComponent
        data={data}
        update={update}
        // onSetting={() => console.log('s')}
      />
      <Form.Wrapper column={true}>
        {/* <div className="pt-4 pb-6">
          <h1 className="text-lg font-semibold">Untitled</h1>
        </div> */}
        {/* <Form.Input
          label="Title"
          value={data.title}
          onChange={(val: string) => update('title', val)}
          id="title"
          placeholder="ss"
        />{' '}
        <Form.Textarea
          label="Description"
          value={data.description}
          onChange={(val: string) => update('description', val)}
          id="description"
          placeholder="ss"
        />
        <div className="flex flex-wrap space-x-2">
          {categories?.payload?.results.map((x) => (
            <button
              onClick={() => update('category', x.value)}
              className="px-3 py-1 rounded-md bg-types-200"
            >
              {x.label}
            </button>
          ))}
        </div> */}
      </Form.Wrapper>
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
          templateCode={
            defaultPenData.find((x) => x.label === library)?.value ?? ''
          }
          initialContent={data.code}
          onChange={(val) => update('code', val)}
        />
        <Preview code={data.code} />
      </SplitPane>
    </div>
  );
}

export default NewComponent;