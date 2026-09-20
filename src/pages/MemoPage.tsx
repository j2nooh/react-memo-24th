import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionModal from '../components/common/ActionModal';
import MemoDetailModal from '../components/memo/MemoDetailModal';
import MemoEditor from '../components/memo/MemoEditor';
import MemoList from '../components/memo/MemoList';
import MemoToolbar from '../components/memo/MemoToolbar';
import { useApiMemos } from '../hooks/useApiMemos';
import type { Memo, MemoCategory, MemoDraft } from '../types/memo';
import { filterMemos } from '../utils/filterMemos';

function MemoPage() {
  const navigate = useNavigate();
  const { memos, setMemos, isLoading, errorMessage, loadMemos, saveMemo, editMemo } = useApiMemos();
  const [isCreating, setIsCreating] = useState(false);
  const [editingMemoId, setEditingMemoId] = useState<Memo['id'] | null>(null);
  const [selectedMemoId, setSelectedMemoId] = useState<Memo['id'] | null>(null);
  const [isDeleteComplete, setIsDeleteComplete] = useState(false);
  const selectedMemo = memos.find((memo) => memo.id === selectedMemoId);
  const editingMemo = memos.find((memo) => memo.id === editingMemoId);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<MemoCategory | ''>('');
  const visibleMemos = filterMemos(memos, keyword, category);
  const pinnedMemos = visibleMemos.filter((memo) => memo.isPinned);
  const unpinnedMemos = visibleMemos.filter((memo) => !memo.isPinned);
  const isFiltered = memos.length > 0 && (keyword.trim() !== '' || category !== '');

  function handleOpenCreate() {
    setIsCreating(true);
  }

  function handleTogglePin(memoId: Memo['id']) {
    setMemos((previousMemos) =>
      previousMemos.map((memo) =>
        memo.id === memoId ? { ...memo, isPinned: !memo.isPinned } : memo,
      ),
    );
  }

  async function handleCreateMemo(draft: MemoDraft) {
    await saveMemo(draft);
    setKeyword('');
    setCategory('');
  }

  async function handleUpdateMemo(draft: MemoDraft) {
    if (!editingMemo) return;
    await editMemo(editingMemo, draft);
    setEditingMemoId(null);
  }

  function handleDeleteMemo(memoId: Memo['id']) {
    setMemos((previousMemos) => previousMemos.filter((memo) => memo.id !== memoId));
    setSelectedMemoId(null);
    setIsDeleteComplete(true);
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col gap-[52px] px-[clamp(32px,calc((100%_-_1200px)/2),120px)] pt-[72px] pb-14 max-[900px]:px-8 max-[900px]:pt-12 max-sm:gap-8 max-sm:px-4 max-sm:pt-6 max-sm:pb-8">
      <MemoToolbar
        keyword={keyword}
        category={category}
        onKeywordChange={setKeyword}
        onCategoryChange={setCategory}
        onCreate={handleOpenCreate}
        onProfile={() => navigate('/mypage')}
      />
      <section aria-labelledby="memo-list-title" className="flex w-full flex-1 flex-col gap-5">
        <h2 id="memo-list-title" className="sr-only">
          메모 목록
        </h2>
        <p role="status" aria-atomic="true" className="sr-only">
          {isFiltered ? `검색 결과 ${visibleMemos.length}개` : `전체 메모 ${visibleMemos.length}개`}
        </p>
        {isLoading && (
          <div role="status" className="flex min-h-[420px] items-center justify-center text-body-medium text-gray-04">
            메모를 불러오는 중입니다.
          </div>
        )}
        {!isLoading && errorMessage && (
          <div className="flex min-h-[420px] flex-col items-center justify-center gap-5 text-center">
            <p role="alert" className="text-body-medium text-point">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={() => void loadMemos()}
              className="h-12 rounded-xl bg-blue-05 px-6 text-action-small font-bold text-white-00 transition-colors hover:bg-blue-06"
            >
              다시 시도
            </button>
          </div>
        )}
        {!isLoading && !errorMessage && pinnedMemos.length > 0 && (
          <MemoList
            memos={pinnedMemos}
            label="고정된 메모"
            onTogglePin={handleTogglePin}
            onSelect={setSelectedMemoId}
            onCreate={handleOpenCreate}
          />
        )}
        {!isLoading && !errorMessage && unpinnedMemos.length > 0 && (
          <MemoList
            memos={unpinnedMemos}
            label="고정되지 않은 메모"
            onTogglePin={handleTogglePin}
            onSelect={setSelectedMemoId}
            onCreate={handleOpenCreate}
          />
        )}
        {!isLoading && !errorMessage && visibleMemos.length === 0 && (
          <MemoList
            memos={visibleMemos}
            isFiltered={isFiltered}
            onTogglePin={handleTogglePin}
            onSelect={setSelectedMemoId}
            onCreate={handleOpenCreate}
          />
        )}
      </section>
      {selectedMemo && !editingMemo && (
        <MemoDetailModal
          memo={selectedMemo}
          onClose={() => setSelectedMemoId(null)}
          onEdit={() => setEditingMemoId(selectedMemo.id)}
          onDelete={() => handleDeleteMemo(selectedMemo.id)}
        />
      )}
      {isCreating && <MemoEditor onSave={handleCreateMemo} onCancel={() => setIsCreating(false)} />}
      {editingMemo && (
        <MemoEditor
          memo={editingMemo}
          onSave={handleUpdateMemo}
          onCancel={() => setEditingMemoId(null)}
        />
      )}
      {isDeleteComplete && (
        <ActionModal
          title="해당 메모가 삭제되었습니다"
          description="삭제된 메모는 휴지통에서 확인 가능합니다."
          confirmLabel="확인"
          onConfirm={() => setIsDeleteComplete(false)}
        />
      )}
    </main>
  );
}

export default MemoPage;
