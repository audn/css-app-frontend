import { useCallback, useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import { Form } from '../common/components/Form';
import PenEditor from '../common/components/Pen/Editor';
import Preview from '../common/components/Pen/Preview';
import { DefaultLayout } from '../common/layouts/Default';
import { API } from '../common/lib/interfaces';

function NewComponent() {
  const [data, setData] = useState<Partial<API.Models.Post>>({});

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
  const [activePane, setActivePane] = useState('editor');
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
          (!isLg && activePane === 'editor')
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

  const [html, setHtml] = useState<string>(`<div class="p-4">
   <div class="alert alert-warning" role="alert">
      Bootstrap 5 CSS injected
   </div>

   <div class="card">
      <div class="card-body">
         <h5 class="card-title">Special title treatment</h5>
         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
         <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
   </div>
</div>`);
  return (
    <DefaultLayout>
      <Form.Wrapper column={true}>
        <Form.Input
          label="Title"
          value={data.title}
          onChange={(val: string) => update('title', val)}
          id="title"
          placeholder="ss"
        />
        <Form.Textarea
          label="Description"
          value={data.description}
          onChange={(val: string) => update('description', val)}
          id="description"
          placeholder="ss"
        />
        <div className="relative h-screen">
          {/* @ts-ignore */}
          <SplitPane
            split={'vertical'}
            // minSize={size.min}
            maxSize={1500}
            size={size.current}
            onChange={updateCurrentSize}
            paneStyle={{ marginTop: -1 }}
            pane1Style={{ display: 'flex', flexDirection: 'column' }}
            onDragStarted={() => setResizing(true)}
            onDragFinished={() => setResizing(false)}
            allowResize={true}
            resizerClassName={
              true && size.layout !== 'preview'
                ? 'Resizer'
                : 'Resizer-collapsed'
            }
          >
            <div className="flex flex-auto">
              <PenEditor initialContent={html} onChange={setHtml} />
            </div>
            <div className="absolute inset-0 w-full h-full">
              <Preview code={html} />
            </div>
          </SplitPane>
        </div>
      </Form.Wrapper>
    </DefaultLayout>
  );
}

export default NewComponent;
