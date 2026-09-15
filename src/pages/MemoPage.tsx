import { useState } from 'react';
import ActionModal from '../components/common/ActionModal';
import MemoDetailModal from '../components/memo/MemoDetailModal';
import MemoEditor from '../components/memo/MemoEditor';
import MemoList from '../components/memo/MemoList';
import MemoToolbar from '../components/memo/MemoToolbar';
import { useStoredMemos } from '../hooks/useStoredMemos';
import type { Memo, MemoCategory, MemoDraft } from '../types/memo';
import { filterMemos } from '../utils/filterMemos';

function MemoPage() {
  const [memos, setMemos] = useStoredMemos();
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

  function handleCreateMemo(draft: MemoDraft) {
    const newMemo: Memo = { ...draft, id: crypto.randomUUID(), isPinned: false };
    setMemos((previousMemos) => [newMemo, ...previousMemos]);
    setKeyword('');
    setCategory('');
  }

  function handleUpdateMemo(draft: MemoDraft) {
    if (!editingMemoId) return;
    setMemos((previousMemos) =>
      previousMemos.map((memo) => (memo.id === editingMemoId ? { ...memo, ...draft } : memo)),
    );
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
      />
      <section aria-labelledby="memo-list-title" className="flex w-full flex-1 flex-col gap-5">
        <h2 id="memo-list-title" className="sr-only">
          메모 목록
        </h2>
        <p role="status" aria-atomic="true" className="sr-only">
          {isFiltered ? `검색 결과 ${visibleMemos.length}개` : `전체 메모 ${visibleMemos.length}개`}
        </p>
        {pinnedMemos.length > 0 && (
          <MemoList
            memos={pinnedMemos}
            label="고정된 메모"
            onTogglePin={handleTogglePin}
            onSelect={setSelectedMemoId}
            onCreate={handleOpenCreate}
          />
        )}
        {unpinnedMemos.length > 0 && (
          <MemoList
            memos={unpinnedMemos}
            label="고정되지 않은 메모"
            onTogglePin={handleTogglePin}
            onSelect={setSelectedMemoId}
            onCreate={handleOpenCreate}
          />
        )}
        {visibleMemos.length === 0 && (
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
