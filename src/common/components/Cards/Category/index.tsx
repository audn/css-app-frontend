import { API } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';

function CategoryCard({
  selectedValues = [],
  label,
  value,
  setSelectedValues,

  count,
}: API.Models.Category & {
  count?: number;
  selectedValues: string[];
  setSelectedValues: (val: string) => void;
}) {
  function handleClick() {
    if (count! >= 1) {
      setSelectedValues(value);
    }
  }
  return (
    <button
      disabled={count! < 1}
      onClick={handleClick}
      className={concat(
        count! < 1
          ? 'opacity-50 cursor-not-allowed'
          : selectedValues.includes(value)
          ? 'text-white bg-types-150 group'
          : 'text-white/60 hover:text-white bg-types-150/50 group',
        'px-2 py-[0.25rem] rounded-md flex items-center animate ',
      )}
    >
      {label}
      <div
        className={concat(
          selectedValues.includes(value)
            ? 'text-white/50'
            : 'text-white/30 group-hover:text-white/50',
          'ml-1 font-medium animate',
        )}
      >
        {count}
      </div>
    </button>
  );
}

export default CategoryCard;
