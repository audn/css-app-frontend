import { API } from '../../../lib/interfaces';
import { del, get, post, put } from './api';

export async function getLibraries(): Promise<
  API.Response<API.Models.Library>
> {
  const res = await get(`/library/`, false);
  return res.json();
}

export async function editLibrary(
  id: string,
  data: API.Models.Library,
): Promise<API.Response<API.Models.Library>> {
  const res = await put(`/library/${id}`, false, data);
  return res.json();
}

export async function createLibrary(
  id: string,
  data: API.Models.Library,
): Promise<API.Response<API.Models.Library>> {
  const res = await post(`/library/${id}`, false, data);
  return res.json();
}

export async function deleteLibrary(
  id: string,
): Promise<API.Response<API.Models.Library>> {
  const res = await del(`/library/${id}`, false);
  return res.json();
}
