import { useRouter } from 'next/router';
import useFilterState from '../../../store/filter';
import { useLibraries } from '../../../utils/hooks/libraries';
import Dropdown from '../../Dropdown';

function LibrarySelector({
  className,
  wrapperClassName,
}: {
  className?: string;
  wrapperClassName?: string;
}) {
  const router = useRouter();
  const { data, isLoading } = useLibraries();

  const library = useFilterState((s) => s.library);

  const setLibrary = (val: string) => {
    useFilterState.setState({
      library: val,
    });
    router.push(`/components/${val.toLowerCase()}`, undefined, {
      shallow: true,
    });
  };
  return (
    <Dropdown
      className={className}
      wrapperClassName={wrapperClassName}
      active={library}
      options={{
        animateCaret: true,
        toggleOnClick: true,
      }}
      isLoading={isLoading}
      list={data?.payload?.results}
      showLibraryVector={true}
      onClick={setLibrary}
    >
      <div className="flex items-center border border-types-150 rounded-xl">
        <div className="flex items-center justify-center w-10 h-10 bg-types-125 rounded-l-xl">
          <img src={`/libraries/${library}.svg`} className="w-6 h-6" />
        </div>
        <div className="px-3 font-normal">
          {library}
          <i className="ml-2 text-sm fa-regular fa-angle-down " />
        </div>
      </div>
    </Dropdown>
  );
}

export default LibrarySelector;
