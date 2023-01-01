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
          ? 'bg-brand-primary-150/80 text-white '
          : 'bg-types-100 text-white/80',
        'px-3 py-[0.3rem] text-[15px] rounded-md font-medium flex items-center',
      )}
    >
      {label}
      <div className="ml-2 text-sm text-white/60"> {count}</div>
    </button>
  );
}

export default CategoryCard;
