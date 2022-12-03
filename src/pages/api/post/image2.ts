import { NextApiResponse } from 'next';
import nodeHtmlToImage from 'node-html-to-image';
import { editPost, getPostFromId } from '../../../common/utils/hooks/api/posts';

export const renderImage = async (
  req: { query: { id: string } },
  res: NextApiResponse,
) => {
  const data = await getPostFromId(req.query.id);
  const post = data.payload?.results;

  const getLink = () => {
    if (post?.library === 'tailwindcss') {
      switch (post.libraryVersion) {
        case '3.2.4':
          return "<script src='https://cdn.tailwindcss.com/3.2.4'></script>";
        case '2.2.19':
          return "<link rel='stylesheet' href='https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css' />";
        case '1.9.6':
          return "<link rel='stylesheet' href='https://unpkg.com/tailwindcss@1.9.6/dist/tailwind.min.css' />";
      }
    }
  };
  const image = await nodeHtmlToImage({
    html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
               ${getLink()}
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
  if (post) {
    const newData = (({ author, authorId, ...o }) => o)(post);
    const b64 = Buffer.from(image as any).toString('base64');
    const mimeType = 'image/png';

    await editPost(post!.id, {
      ...newData,
      generatedImage: `data:${mimeType};base64,${b64}`,
    });

    res.send(`<img src="data:${mimeType};base64,${b64}" />`);
  }
};

export default renderImage;
