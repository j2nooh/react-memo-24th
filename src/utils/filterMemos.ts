import type { Memo, MemoCategory } from '../types/memo';

export function filterMemos(memos: Memo[], keyword: string, category: MemoCategory | '') {
  const normalizedKeyword = keyword.trim().toLowerCase();

  return memos.filter((memo) => {
    const matchesCategory = category === '' || memo.category === category;
    const searchableText = `${memo.title} ${memo.content}`.toLowerCase();

    return matchesCategory && searchableText.includes(normalizedKeyword);
  });
}
