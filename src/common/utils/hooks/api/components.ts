import { API } from '../../../lib/interfaces';
import { del, get, post, put } from './api';

export async function searchComponents(
  data: API.Requests.SearchComponents,
): Promise<API.Response<API.Models.Component[]>> {
  const res = await post('/search/components', false, data);
  return res.json();
}

export async function getAllComponents(): Promise<
  API.Response<API.Models.Component[]>
> {
  const res = await get('/components', false);
  return res.json();
}

export async function getComponentFromId(
  id: string,
): Promise<API.Response<API.Models.Component>> {
  const res = await get(`/components/${id}`, false);
  return res.json();
}

export async function addComponent(
  data: Partial<API.Models.Component>,
): Promise<API.Response<API.Models.Component>> {
  const res = await post('/components', true, data);
  return res.json();
}

export async function editComponent(
  id: string,
  data: Partial<API.Models.Component>,
): Promise<API.Response<API.Models.Component>> {
  const res = await put(`/components/${id}`, true, data);
  return res.json();
}

export async function uploadThumbnail(
  id: string,
  type: 'layout' | 'component',
  data: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
  },
): Promise<API.Response<API.Models.Component>> {
  const res = await put(`/thumbnail/${id}?type=${type}`, true, data);
  return res.json();
}

export async function setThumbnail(
  id: string,
): Promise<API.Response<API.Models.Component>> {
  const res = await put(`/components/${id}/thumbnail`, true);
  return res.json();
}

export async function deleteComponent(
  id: string,
): Promise<API.Response<API.Models.Component>> {
  const res = await del(`/components/${id}`, true);
  return res.json();
}
