import { API } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';

function CategoryCard({
  selectedValues = [],
  label,
  value,
  setSelectedValues,
}: API.Models.Category & {
  selectedValues: string[];
  setSelectedValues: (val: string) => void;
}) {
  return (
    <button
      onClick={() => setSelectedValues(value)}
      className={concat(
        selectedValues.includes(value)
          ? 'bg-brand-primary-150/80 text-white '
          : 'bg-types-250/70 text-white/80',
        'px-3 py-[0.3rem] text-[15px] rounded-md font-medium',
      )}
    >
      {label}
    </button>
  );
}

export default CategoryCard;
