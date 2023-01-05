import { API } from '../../../../../lib/interfaces';
import concat from '../../../../../utils/helpers/concat';

const Icon = ({
  active,
  component,
}: {
  active?: boolean;
  component: API.Models.Component;
}) => {
  return (
    <img
      src={`/libraries/${component.library.toLowerCase()}.svg`}
      className={concat(
        active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        'w-5 h-5 mr-2  animate ',
      )}
    />
  );
};

export default Icon;
