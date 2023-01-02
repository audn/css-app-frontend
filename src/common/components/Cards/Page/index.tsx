import Image from 'next/image';
import { API } from '../../../lib/interfaces';
import Link from '../../layout/Link';

function PageCard({ author, id, title, generatedImage }: API.Models.Component) {
  return (
    <div className="flex flex-col items-start">
      <Link
        className="border border-types-150 shadow-md relative w-full h-[450px]  bg-types-150 rounded-md overflow-hidden group"
        href={`/page/${id}`}
      >
        {generatedImage && (
          <Image src={generatedImage} layout="fill" className="scale-150" />
        )}
        <img
          src="https://land-book-storage.s3.eu-central-1.amazonaws.com/website/41009/24da51d937240e9a-conversion-saas-webflow-template-webflow-io.webp"
          className="group-hover:scale-105 animate"
        />
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

export default PageCard;
