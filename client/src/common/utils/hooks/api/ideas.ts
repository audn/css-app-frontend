import { Idea } from '../../../lib/interfaces';
import { APIResponse } from './../../../lib/interfaces';
import { del, get, post, put } from './api';

export async function postIdea(
  body: Idea.NewIdea,
): Promise<APIResponse<Idea.Idea>> {
  const res = await post(`/ideas`, true, body);

  return res.json();
}

export async function getSpecificIdea(
  id: string,
): Promise<APIResponse<Idea.Idea[]>> {
  const res = await get(`/ideas/${id}`, false);

  return res.json();
}

export async function getIdeas(
  sort: Idea.SortBy,
): Promise<APIResponse<Idea.Idea[]>> {
  const res = await get(`/ideas?sort=${sort}`, false);

  return res.json();
}

export async function getUserIdeas(
  id: string,
): Promise<APIResponse<Idea.Idea[]>> {
  const res = await get(`/users/${id}/ideas`, true);

  return res.json();
}

export async function upvoteIdea(id: string): Promise<APIResponse<Idea.Idea>> {
  const res = await put(`/ideas/${id}`, true);

  return res.json();
}

export async function deleteIdea(id: string): Promise<APIResponse<any>> {
  const res = await del(`/ideas/${id}`, true);

  return res.json();
}
