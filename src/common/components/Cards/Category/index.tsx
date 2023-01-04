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
        count! < 1 ? 'opacity-50' : '',
        selectedValues.includes(value)
          ? 'text-white '
          : 'text-white/60 hover:text-white',
        'text-[15px] rounded-md flex items-center animate group',
      )}
    >
      {label}
      <div
        className={concat(
          selectedValues.includes(value)
            ? 'text-white/50'
            : 'text-white/30 group-hover:text-white/50',
          'ml-1 text-sm animate',
        )}
      >
        {' '}
        {count}
      </div>
    </button>
  );
}

export default CategoryCard;
