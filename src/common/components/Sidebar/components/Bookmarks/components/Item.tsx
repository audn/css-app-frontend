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
        active ? 'text-white/60' : 'hover:text-white',
        'flex items-center group animate',
      )}
    >
      <Icon active={active} />
      {component?.title}
      {/* <div className="">{component?.category}</div> */}
    </Link>
  );
}

export default Item;
