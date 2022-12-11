import axios from 'axios';
import { NextApiResponse } from 'next';
import { getPostFromId } from '../../../common/utils/hooks/api/posts';

export const renderImage = async (
  req: { query: { id: string } },
  res: NextApiResponse,
) => {
  const data = await getPostFromId(req.query.id);
  const post = data.payload?.results;

  if (post && post.generatedImage == null) {
    return await axios({
      method: 'put',
      data: { id: '' },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      url: `https://7ec94wkd02.execute-api.us-east-1.amazonaws.com/v0/generate-thumbnails?id=${post.id}`,
    })
      .then(async ({ data }) => {
        const buffer = data.data;
        if (typeof buffer !== 'undefined') {
          const image = {
            buffer,
            encoding: '7bit',
            fieldname: 'thumbnail',
            mimetype: 'image/png',
            originalname: post.id + '.png',
          };
          return res.json(image);
        } else return res.status(400);
      })
      .catch((e) => {
        if (e) {
          console.log(e);
          return res.json({ error: 'true', message: e });
        }
      });
  } else return res.json({});
};

export default renderImage;
