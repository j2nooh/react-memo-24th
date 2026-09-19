import { useCallback, useEffect, useState } from 'react';
import { getMemos } from '../api/memos';
import { useAuthStore } from '../stores/authStore';
import type { Memo } from '../types/memo';
import { getRequestErrorMessage } from '../utils/getRequestErrorMessage';
import { mapApiMemoToMemo } from '../utils/mapApiMemoToMemo';

export function useApiMemos() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadCount, setReloadCount] = useState(0);

  const loadMemos = useCallback(() => {
    setIsLoading(true);
    setErrorMessage('');
    setReloadCount((previousCount) => previousCount + 1);
  }, []);

  useEffect(() => {
    if (accessToken === null) return;
    const token: string = accessToken;

    let isActive = true;

    async function fetchMemos() {
      try {
        const response = await getMemos({ token, size: 100 });
        if (isActive) setMemos(response.content.map(mapApiMemoToMemo));
      } catch (error) {
        if (isActive) setErrorMessage(getRequestErrorMessage(error));
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    void fetchMemos();

    return () => {
      isActive = false;
    };
  }, [accessToken, reloadCount]);

  return { memos, setMemos, isLoading, errorMessage, loadMemos };
}
