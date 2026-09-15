import { initialMemos } from '../data/memos';
import type { Memo, MemoCategory } from '../types/memo';

const memoStorageKey = 'react-memo-memos';
const memoCategories: MemoCategory[] = ['daily', 'work', 'others'];

function createInitialMemos() {
  return initialMemos.map((memo) => ({ ...memo }));
}

function isMemo(value: unknown): value is Memo {
  if (!value || typeof value !== 'object') return false;
  const memo = value as Record<string, unknown>;

  return (
    typeof memo.id === 'string' &&
    typeof memo.title === 'string' &&
    typeof memo.content === 'string' &&
    memoCategories.includes(memo.category as MemoCategory) &&
    typeof memo.date === 'string' &&
    typeof memo.isPinned === 'boolean'
  );
}

export function loadMemos(): Memo[] {
  try {
    const storedMemos = localStorage.getItem(memoStorageKey);
    if (storedMemos === null) return createInitialMemos();

    const parsedMemos: unknown = JSON.parse(storedMemos);
    return Array.isArray(parsedMemos) && parsedMemos.every(isMemo)
      ? parsedMemos
      : createInitialMemos();
  } catch {
    return createInitialMemos();
  }
}

export function saveMemos(memos: Memo[]) {
  try {
    localStorage.setItem(memoStorageKey, JSON.stringify(memos));
  } catch {
    return;
  }
}
