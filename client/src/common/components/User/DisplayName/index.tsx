import { User } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';

function DisplayName({
  className,
  user,
}: {
  className?: string;
  user?: User.User;
}) {
  return (
    <h3
      className={concat(className ? className : '', 'font-semibold text-white')}
    >
      {user?.name}
    </h3>
  );
}

export default DisplayName;
