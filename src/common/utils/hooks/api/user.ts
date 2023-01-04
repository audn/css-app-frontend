import { API } from '../../../lib/interfaces';
import { get, post, put } from './api';

export async function getCurrentUser(): Promise<API.Response<API.Models.User>> {
  const res = await get('/users/me', true);
  return res.json();
}

export async function getUser(
  id: string,
): Promise<API.Response<API.Models.User>> {
  const res = await get(`/users/${id}`, true);
  return res.json();
}

export async function editUser(
  id: string,
  data: API.Models.User,
): Promise<API.Response<API.Models.User>> {
  const res = await put(`/users/${id}`, true, data);
  return res.json();
}

export async function signOutUser(): Promise<API.Response> {
  const res = await post('/auth/logout', true);
  return res.json();
}
