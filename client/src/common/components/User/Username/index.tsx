import { User } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';

function Username({
  className,
  user,
}: {
  className?: string;
  user?: User.User;
}) {
  return (
    <h5 className={concat(className ? className : '', '')}>
      @{user?.username}
    </h5>
  );
}

export default Username;
