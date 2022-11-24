import { API } from '../../../lib/interfaces';
import { get, post, put } from './api';

export async function getCurrentUser(): Promise<API.Response<API.Models.User>> {
  const res = await get('/users/me', true);
  return res.json();
}

export async function editUserPreferences(
  data: API.UserPreferences,
): Promise<API.Response<API.Models.User>> {
  const res = await put(`/users/me/preferences`, true, data);
  return res.json();
}

export async function signOutUser(): Promise<API.Response> {
  const res = await post('/auth/logout', true);
  return res.json();
}
