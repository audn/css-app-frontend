import { API } from '../../../lib/interfaces';
import { del, get, post, put } from './api';

export async function searchLayouts(
  data: API.Requests.SearchComponents,
): Promise<API.Response<API.Models.Layout[]>> {
  const res = await post('/search/layouts', false, data);
  return res.json();
}

export async function getAllLayouts(): Promise<
  API.Response<API.Models.Layout[]>
> {
  const res = await get('/layouts', false);
  return res.json();
}

export async function getLayoutFromId(
  id: string,
): Promise<API.Response<API.Models.Layout>> {
  const res = await get(`/layouts/${id}`, false);
  return res.json();
}

export async function addLayout(
  data: Partial<API.Models.Layout>,
): Promise<API.Response<API.Models.Layout>> {
  const res = await post('/layouts', true, data);
  return res.json();
}

export async function editLayout(
  id: string,
  data: Partial<API.Models.Layout>,
): Promise<API.Response<API.Models.Layout>> {
  const res = await put(`/layouts/${id}`, true, data);
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
): Promise<API.Response<API.Models.Layout>> {
  const res = await put(`/thumbnail/${id}`, true, data);
  return res.json();
}

export async function setThumbnail(
  id: string,
): Promise<API.Response<API.Models.Layout>> {
  const res = await put(`/layouts/${id}/thumbnail`, true);
  return res.json();
}

export async function deleteLayout(
  id: string,
): Promise<API.Response<API.Models.Layout>> {
  const res = await del(`/layouts/${id}`, true);
  return res.json();
}
