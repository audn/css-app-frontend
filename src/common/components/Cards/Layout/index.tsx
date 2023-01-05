import { API } from '../../../lib/interfaces';
import Link from '../../layout/Link';

function LayoutCard({ author, id, title, generatedImage }: API.Models.Layout) {
  return (
    <div className="flex flex-col items-start">
      <Link
        className="border border-types-150 shadow-md relative w-full min-h-[450px] max-h-[450px]  bg-types-150 rounded-md overflow-hidden group"
        href={`/layout/${id}`}
      >
        {/* {generatedImage && (
          <Image
            src={generatedImage}
            layout="fill"
            className="items-start scale-150 "
          />
        )} */}
        <img src={generatedImage} />
      </Link>
      <div className="flex flex-col items-start w-full px-2 py-3">
        <h2 className="text-base text-white">{title}</h2>
        <div className="flex items-center mt-1 text-sm">
          <img src={author.avatar} className="w-6 h-6 mr-2 rounded-full" />
          <Link
            href={`/user/${author.id}`}
            className="hover:text-white animate"
          >
            <h3>{author?.username}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LayoutCard;
