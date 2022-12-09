import { API } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';

function CategoryCard({
  selectedValues = [],
  label,
  value,
  setSelectedValues,
  _count,
}: API.Models.Category & {
  selectedValues: string[];
  setSelectedValues: (val: string) => void;
}) {
  function handleClick() {
    if (_count?.posts! >= 1) {
      setSelectedValues(value);
    }
  }
  return (
    <button
      disabled={_count?.posts! < 1}
      onClick={handleClick}
      className={concat(
        _count?.posts! < 1 ? 'opacity-50' : '',
        selectedValues.includes(value)
          ? 'bg-brand-primary-150/80 text-white '
          : 'bg-types-250/70 text-white/80',
        'px-3 py-[0.3rem] text-[15px] rounded-md font-medium flex items-center',
      )}
    >
      {label}
      <div className="ml-2 text-sm text-white/60"> {_count?.posts}</div>
    </button>
  );
}

export default CategoryCard;
