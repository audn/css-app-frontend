import concat from '../../../../../utils/helpers/concat';

const Icon = ({ active }: { active: boolean }) => {
  return (
    <div
      className={concat(
        active ? 'bg-types-100' : '',
        'w-4 h-4 mr-2 border rounded-full border-types-250 group-hover:bg-types-100 animate',
      )}
    ></div>
  );
};

export default Icon;
