import { NextApiResponse } from 'next';
import nodeHtmlToImage from 'node-html-to-image';
import { getPostFromId } from '../../../common/utils/hooks/api/posts';

export const previewImage = async (
  req: { query: { id: string } },
  res: NextApiResponse,
) => {
  const data = await getPostFromId(req.query.id);
  const post = data.payload?.results;

  const postCss = post?.libraryRelations?.versions.find(
    (x) => x.value === post?.libraryVersion,
  )?.src;

  const image = await nodeHtmlToImage({
    html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
               ${postCss}
                </head>
                <body>
                <style>
                    body {
                    width: 1280px;
                    height: 720px;
                    }
                </style>
                   ${post?.code}
                </body>
                </html>`,
  });
  // });

  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image, 'binary');
};

export default previewImage;
