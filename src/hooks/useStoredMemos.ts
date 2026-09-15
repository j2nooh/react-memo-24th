import { useEffect, useState } from 'react';
import type { Memo } from '../types/memo';
import { loadMemos, saveMemos } from '../utils/memoStorage';

export function useStoredMemos() {
  const [memos, setMemos] = useState<Memo[]>(loadMemos);

  useEffect(() => {
    saveMemos(memos);
  }, [memos]);

  return [memos, setMemos] as const;
}
