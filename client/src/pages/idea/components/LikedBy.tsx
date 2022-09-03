import { User } from '../../../common/components/User';
import { User as IUser } from '../../../common/lib/interfaces';

function LikedBy({ user }: { user: IUser.User }) {
  return (
    <div className="flex gap-x-1 sm:gap-x-2 items-center text-[13px] sm:text-[15px]">
      <User.Author user={user}>
        <User.Avatar user={user} className="!w-6 !h-6 sm:!w-7 sm:!h-7" />
      </User.Author>
      <User.DisplayName user={user} />
      <User.Username user={user} />
    </div>
  );
}

export default LikedBy;
