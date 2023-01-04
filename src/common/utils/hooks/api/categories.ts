import { API } from '../../../lib/interfaces';
import { IPostSchemas } from './../../../lib/interfaces';
import { del, get, post, put } from './api';

export async function getCategories(
  type?: IPostSchemas,
): Promise<API.Response<API.Models.Category[]>> {
  const res = await get(`/categories?type=${type}`, false);
  return res.json();
}

export async function editCategory(
  id: string,
  data: API.Models.Category,
  type: IPostSchemas,
): Promise<API.Response<API.Models.Category>> {
  const res = await put(`/categories/${id}?type=${type}`, false, data);
  return res.json();
}

export async function createCategory(
  id: string,
  data: API.Models.Category,
  type: IPostSchemas,
): Promise<API.Response<API.Models.Category>> {
  const res = await post(`/categories/${id}?type=${type}`, false, data);
  return res.json();
}

export async function deleteCategory(
  id: string,
  type: IPostSchemas,
): Promise<API.Response<API.Models.Category>> {
  const res = await del(`/categories/${id}?type=${type}`, false);
  return res.json();
}
