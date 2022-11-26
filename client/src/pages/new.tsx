import { useCallback, useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import { Form } from '../common/components/Form';
import { HeaderAddingComponent } from '../common/components/Header/AddingComponent';
import PenEditor from '../common/components/Pen/Editor';
import Preview from '../common/components/Pen/Preview';
import { API } from '../common/lib/interfaces';

function NewComponent() {
  const [data, setData] = useState<Partial<API.Models.Post>>({
    title: 'Untitled',
    code: `<!--
  Welcome to Tailwind Play, the official Tailwind CSS playground!

  Everything here works just like it does when you're running Tailwind locally
  with a real build pipeline. You can customize your config file, use features
  like '@apply', or even add third-party plugins.

  Feel free to play with this example if you're just learning, or trash it and
  start from scratch if you know enough to be dangerous. Have fun!
-->
<div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
  <img src="/img/beams.jpg" alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
  <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
  <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
    <div class="mx-auto max-w-md">
      <img src="https://play.tailwindcss.com/img/logo.svg" class="h-6" alt="Tailwind Play" />
      <div class="divide-y divide-gray-300/50">
        <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
          <p>An advanced online playground for Tailwind CSS, including support for things like:</p>
          <ul class="space-y-4">
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="ml-4">
                Customizing your
                <code class="text-sm font-bold text-gray-900">tailwind.config.js</code> file
              </p>
            </li>
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="ml-4">
                Extracting classes with
                <code class="text-sm font-bold text-gray-900">@apply</code>
              </p>
            </li>
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="ml-4">Code completion with instant preview</p>
            </li>
          </ul>
          <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
        </div>
        <div class="pt-8 text-base font-semibold leading-7">
          <p class="text-gray-900">Want to dig deeper into Tailwind?</p>
          <p>
            <a href="https://tailwindcss.com/docs" class="text-sky-500 hover:text-sky-600">Read the docs &rarr;</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  });
  //   const { data: categories, isLoading } = useCategories();

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
          initialContent={data.code}
          onChange={(val) => update('code', val)}
        />
        <Preview code={data.code} />
      </SplitPane>
    </div>
  );
}

export default NewComponent;
