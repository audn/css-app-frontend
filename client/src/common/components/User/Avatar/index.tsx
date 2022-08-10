import concat from '../../../utils/helpers/concat';

function UserAvatar({
  className,
  ...user
}: {
  className?: string;
  [x: string]: any;
}) {
  return (
    <img
      src={user.profile_image_url}
      className={concat(className ? className : '', 'w-12 h-12 rounded-full')}
    />
  );
}

export default UserAvatar;
