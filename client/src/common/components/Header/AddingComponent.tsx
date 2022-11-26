import { Button } from '../Buttons';
import LibrarySelector from './components/LibrarySelector';

export const HeaderAddingComponent = () => {
  return (
    <header className="z-50 flex items-start justify-between p-6 border-b border-b-types-200">
      <div className="flex flex-col">
        <div className="flex items-center">
          <h1 className="text-lg font-medium text-white ">Untitled</h1>
          <button className="flex items-center justify-center ml-2 rounded-full w-7 h-7 bg-types-200">
            <i className="text-sm fa-solid fa-pen" />
          </button>
        </div>
        <div className="flex items-center mt-3 text-sm">
          <i className="mr-2 fa-solid fa-info-circle" /> Draft saved just now
        </div>{' '}
      </div>{' '}
      <div className="flex space-x-2">
        <LibrarySelector />
        <Button.Secondary
          title="Save"
          icon={'fa-regular fa-cloud text-sm'}
          route="/new"
        />
        <Button.Secondary
          title="Settings"
          icon={'fa-regular fa-cog text-sm'}
          route="/new"
        />
      </div>
    </header>
  );
};
