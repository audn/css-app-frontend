import { API } from '../../../../../lib/interfaces';
import concat from '../../../../../utils/helpers/concat';
import Link from '../../../../layout/Link';
import Icon from './Icon';

function Item({
  component,
  active,
}: {
  component: API.Models.Component;
  active: boolean;
}) {
  return (
    <Link
      href={`/component/${component!.id}`}
      className={concat(
        active ? 'text-white' : 'hover:text-white',
        'flex items-center group animate flex-row-reverse',
      )}
    >
      <Icon active={active} component={component} />
      <div className="flex items-center w-full">
        <div
          className={concat(
            active ? 'bg-types-100' : '',
            'w-4 h-4 mr-2 border rounded-full border-types-250 group-hover:bg-types-100 animate',
          )}
        ></div>
        {component?.title}
      </div>
      {/* <div className="">{component?.category}</div> */}
    </Link>
  );
}

export default Item;
