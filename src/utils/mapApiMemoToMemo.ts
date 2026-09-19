import type { ApiMemo } from '../types/memoApi';
import type { Memo } from '../types/memo';

export function mapApiMemoToMemo(memo: ApiMemo): Memo {
  return {
    id: String(memo.id),
    title: memo.title,
    content: memo.content,
    category: 'others',
    date: memo.createdAt.slice(0, 10),
    isPinned: false,
  };
}
