import type { ApiMemo, ApiMemoCategory } from '../types/memoApi';
import type { Memo, MemoCategory } from '../types/memo';

const memoCategoryByApiCategory: Record<ApiMemoCategory, MemoCategory> = {
  DAILY: 'daily',
  WORK: 'work',
  OTHER: 'others',
};

const apiCategoryByMemoCategory: Record<MemoCategory, ApiMemoCategory> = {
  daily: 'DAILY',
  work: 'WORK',
  others: 'OTHER',
};

export function mapMemoCategoryToApi(category: MemoCategory): ApiMemoCategory {
  return apiCategoryByMemoCategory[category];
}

export function mapApiMemoToMemo(memo: ApiMemo): Memo {
  return {
    id: String(memo.id),
    title: memo.title,
    content: memo.content,
    category: memoCategoryByApiCategory[memo.category],
    date: memo.date,
    isPinned: memo.isPinned,
  };
}
