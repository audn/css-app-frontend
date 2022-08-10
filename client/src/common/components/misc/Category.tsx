import { Idea } from '../../lib/interfaces';
import concat from '../../utils/helpers/concat';

function Category({
  icon,
  label,
  onClick,
  value,
  activeSort,
}: {
  icon: string;
  label: string;
  value: Idea.SortBy;
  activeSort: Idea.SortBy;
  onClick: (val: Idea.SortBy) => void;
}) {
  return (
    <button
      onClick={() => onClick(value)}
      className={concat(
        activeSort == value
          ? 'bg-indigo-500 bg-opacity-10 text-indigo-500'
          : 'bg-types-100 text-on-100 hover:bg-types-150 hover:text-on-150',
        'flex items-center justify-start px-6 py-2 text-sm font-semibold rounded-xl animate',
      )}
    >
      <span className="mr-2" id={icon}>
        <i className={`fa-solid fa-${icon}`} />
      </span>
      {label}
    </button>
  );
}

export default Category;
