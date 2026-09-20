import type { ApiMemo, MemoPageResponse, MemoRequest } from '../types/memoApi';
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

type CreateMemoOptions = {
  token: string;
  memo: MemoRequest;
};

export function createMemo({ token, memo }: CreateMemoOptions) {
  return request<ApiMemo>('/api/memos', {
    method: 'POST',
    token,
    body: memo,
  });
}

type UpdateMemoOptions = {
  token: string;
  memoId: string;
  memo: MemoRequest;
};

export function updateMemo({ token, memoId, memo }: UpdateMemoOptions) {
  return request<ApiMemo>(`/api/memos/${memoId}`, {
    method: 'PUT',
    token,
    body: memo,
  });
}
