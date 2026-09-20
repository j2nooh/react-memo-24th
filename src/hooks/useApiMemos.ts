import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMemo, getMemos, updateMemo } from '../api/memos';
import { ApiError } from '../api/client';
import { useAuthStore } from '../stores/authStore';
import type { Memo, MemoDraft } from '../types/memo';
import { getRequestErrorMessage } from '../utils/getRequestErrorMessage';
import { mapApiMemoToMemo, mapMemoCategoryToApi } from '../utils/mapApiMemoToMemo';

export function useApiMemos() {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadCount, setReloadCount] = useState(0);

  const handleUnauthorized = useCallback(() => {
    clearAuth();
    useAuthStore.persist.clearStorage();
    navigate('/login', { replace: true });
  }, [clearAuth, navigate]);

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
        if (error instanceof ApiError && error.status === 401) {
          handleUnauthorized();
          return;
        }

        if (isActive) setErrorMessage(getRequestErrorMessage(error));
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    void fetchMemos();

    return () => {
      isActive = false;
    };
  }, [accessToken, handleUnauthorized, reloadCount]);

  const saveMemo = useCallback(
    async (draft: MemoDraft) => {
      if (accessToken === null) return;

      try {
        const apiMemo = await createMemo({
          token: accessToken,
          memo: {
            title: draft.title,
            content: draft.content,
            category: mapMemoCategoryToApi(draft.category),
            isPinned: false,
          },
        });
        const memo = mapApiMemoToMemo(apiMemo);

        setMemos((previousMemos) => [memo, ...previousMemos]);
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          handleUnauthorized();
        }

        throw error;
      }
    },
    [accessToken, handleUnauthorized],
  );

  const editMemo = useCallback(
    async (memo: Memo, draft: MemoDraft) => {
      if (accessToken === null) return;

      try {
        const apiMemo = await updateMemo({
          token: accessToken,
          memoId: memo.id,
          memo: {
            title: draft.title,
            content: draft.content,
            category: mapMemoCategoryToApi(draft.category),
            isPinned: memo.isPinned,
          },
        });
        const updatedMemo = mapApiMemoToMemo(apiMemo);

        setMemos((previousMemos) =>
          previousMemos.map((previousMemo) =>
            previousMemo.id === memo.id ? updatedMemo : previousMemo,
          ),
        );
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          handleUnauthorized();
        }

        throw error;
      }
    },
    [accessToken, handleUnauthorized],
  );

  return { memos, setMemos, isLoading, errorMessage, loadMemos, saveMemo, editMemo };
}
