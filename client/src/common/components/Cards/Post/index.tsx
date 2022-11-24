import { API } from '../../../lib/interfaces';
import Link from '../../layout/Link';

function PostCard({
  animated,
  userId,
  description,
  id,
  library,
  theme,
  title,
  generatedImage,
}: API.Models.Post) {
  return (
    <div className="flex flex-col items-start ">
      <Link
        className="w-full"
        // href={`/${library.toLowerCase()}/${title
        //   .replaceAll(' ', '-')
        //   .toLowerCase()}`}
        href={`/${library.toLowerCase()}/${id}`}
      >
        <div className="w-full h-[235px] bg-types-150 rounded-xl">&nbsp;</div>
      </Link>
      <div className="flex flex-col items-start px-2 py-3">
        <h2 className="text-lg text-white">{title}</h2>
        <div className="flex items-center mt-2">
          <img src={userId.avatar} className="w-6 h-6 mr-2 rounded-full" />
          <Link
            href={`/user/${userId.id}`}
            className="hover:text-white animate"
          >
            <h3>{userId?.username}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
