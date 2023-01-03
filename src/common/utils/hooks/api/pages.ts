import { API } from '../../../lib/interfaces';
import { del, get, post, put } from './api';

export async function searchPages(
  data: API.Requests.SearchComponents,
): Promise<API.Response<API.Models.Page[]>> {
  const res = await post('/search/pages', false, data);
  return res.json();
}

export async function getAllPages(): Promise<API.Response<API.Models.Page[]>> {
  const res = await get('/pages', false);
  return res.json();
}

export async function getPageFromId(
  id: string,
): Promise<API.Response<API.Models.Page>> {
  const res = await get(`/pages/${id}`, false);
  return res.json();
}

export async function addPage(
  data: Partial<API.Models.Page>,
): Promise<API.Response<API.Models.Page>> {
  const res = await post('/pages', true, data);
  return res.json();
}

export async function editPage(
  id: string,
  data: Partial<API.Models.Page>,
): Promise<API.Response<API.Models.Page>> {
  const res = await put(`/pages/${id}`, true, data);
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
): Promise<API.Response<API.Models.Page>> {
  const res = await put(`/thumbnail/${id}`, true, data);
  return res.json();
}

export async function setThumbnail(
  id: string,
): Promise<API.Response<API.Models.Page>> {
  const res = await put(`/pages/${id}/thumbnail`, true);
  return res.json();
}

export async function deletePage(
  id: string,
): Promise<API.Response<API.Models.Page>> {
  const res = await del(`/pages/${id}`, true);
  return res.json();
}
