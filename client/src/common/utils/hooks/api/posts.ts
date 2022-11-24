import { API } from '../../../lib/interfaces';
import { get } from './api';

export async function getAllPosts(): Promise<API.Response<API.Models.Post[]>> {
  const res = await get('/posts', false);
  return res.json();
}
