import { APIResponse, User } from '../../../lib/interfaces';
import { get, put } from './api';

export async function getCurrentUser(): Promise<APIResponse<User.User>> {
  const res = await get(`/users/me`, true);
  return res.json();
}

export async function getUser(id: string): Promise<APIResponse<User.User>> {
  const res = await get(`/users/${id}`, true);
  return res.json();
}

export async function changeUserRole(
  id: string,
  role: User.Role,
): Promise<APIResponse<User.User>> {
  const res = await put(`/users/${id}/role?give=${role}`, true);
  return res.json();
}
