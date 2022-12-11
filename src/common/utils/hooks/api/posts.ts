import { API } from '../../../lib/interfaces';
import { del, get, post, put } from './api';

export async function searchPosts(
  data: API.Requests.SearchPosts,
): Promise<API.Response<API.Models.Post[]>> {
  const res = await post('/search', false, data);
  return res.json();
}

export async function getAllPosts(): Promise<API.Response<API.Models.Post[]>> {
  const res = await get('/posts', false);
  return res.json();
}

export async function getPostFromId(
  id: string,
): Promise<API.Response<API.Models.Post>> {
  const res = await get(`/posts/${id}`, false);
  return res.json();
}

export async function addPost(
  data: Partial<API.Models.Post>,
): Promise<API.Response<API.Models.Post>> {
  const res = await post('/posts', true, data);
  return res.json();
}

export async function editPost(
  id: string,
  data: Partial<API.Models.Post>,
): Promise<API.Response<API.Models.Post>> {
  const res = await put(`/posts/${id}`, true, data);
  return res.json();
}

export async function uploadThumbnail(
  id: string,
  data: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
  },
): Promise<API.Response<API.Models.Post>> {
  const res = await put(`/thumbnail/${id}`, true, data);
  return res.json();
}

export async function setThumbnail(
  id: string,
): Promise<API.Response<API.Models.Post>> {
  const res = await put(`/posts/${id}/thumbnail`, true);
  return res.json();
}

export async function deletePost(
  id: string,
): Promise<API.Response<API.Models.Post>> {
  const res = await del(`/posts/${id}`, true);
  return res.json();
}
