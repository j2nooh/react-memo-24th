import type { MemoPageResponse } from '../types/memoApi';
import { request } from './client';

type GetMemosOptions = {
  token: string;
  page?: number;
  size?: number;
};

export function getMemos({ token, page = 0, size = 10 }: GetMemosOptions) {
  return request<MemoPageResponse>(`/api/memos?page=${page}&size=${size}`, {
    token,
  });
}
