import { Button } from '../../../Buttons';
import Auth from '../../../layout/Auth';
import Link from '../../../layout/Link';

function DesktopMenu() {
  return (
    <div className="items-center hidden space-x-5 sm:flex">
      <Auth.User>
        <></>
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/twitter`}>
          <Button.Secondary trustRoute={true} title="Sign in" />
        </Link>
      </Auth.User>
    </div>
  );
}

export default DesktopMenu;
