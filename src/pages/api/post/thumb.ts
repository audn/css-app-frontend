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
    const update = await axios({
      method: 'put',
      data: { id: '' },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      url: `https://7ec94wkd02.execute-api.us-east-1.amazonaws.com/v0/generate-thumbnails?id=${post.id}`,
    });
    console.log(update);

    return res.json({ payload: update });
  } else return res.json({});
};

export default renderImage;
