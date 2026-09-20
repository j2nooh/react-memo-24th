import plusIcon from '../../assets/icons/plus.svg';
import searchIcon from '../../assets/icons/search.svg';
import type { Memo } from '../../types/memo';
import MemoCard from './MemoCard';

type MemoListProps = {
  memos: Memo[];
  isFiltered?: boolean;
  label?: string;
  pinningMemoId?: Memo['id'] | null;
  onTogglePin: (memoId: Memo['id']) => void | Promise<void>;
  onSelect: (memoId: Memo['id']) => void;
  onCreate: () => void;
};

function MemoList({
  memos,
  isFiltered = false,
  label = '작성된 메모',
  pinningMemoId,
  onTogglePin,
  onSelect,
  onCreate,
}: MemoListProps) {
  if (memos.length === 0) {
    if (isFiltered) {
      return (
        <div className="flex min-h-[420px] flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed border-blue-07 px-6 py-12 text-center text-blue-07">
          <span
            aria-hidden="true"
            className="flex size-24 items-center justify-center rounded-full bg-blue-07"
          >
            <span
              className="size-[38.911px] bg-blue-01 mask-contain mask-center mask-no-repeat"
              style={{ maskImage: `url("${searchIcon}")`, WebkitMaskImage: `url("${searchIcon}")` }}
            />
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="text-body-small font-normal">검색 결과가 없습니다</h3>
            <p className="text-body-small text-gray-03">다른 검색어로 다시 시도해보세요</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex min-h-[min(710px,calc(100dvh-238px))] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-blue-02 px-6 py-12 text-center text-blue-02 max-sm:min-h-[420px]">
        <div className="flex flex-col items-center gap-7">
          <button
            type="button"
            onClick={onCreate}
            aria-label="새 메모 작성"
            className="flex size-[120px] items-center justify-center rounded-full bg-blue-02 transition-transform duration-150 hover:scale-105 active:scale-95 max-sm:size-24"
          >
            <span
              aria-hidden="true"
              className="size-8 bg-gray-01 mask-contain mask-center mask-no-repeat"
              style={{ maskImage: `url("${plusIcon}")`, WebkitMaskImage: `url("${plusIcon}")` }}
            />
          </button>
          <h3 className="text-heading-medium font-semibold max-sm:text-heading-small">
            새로운 메모를 작성해보세요!
          </h3>
        </div>
      </div>
    );
  }

  return (
    <ul aria-label={label} className="flex flex-wrap gap-5">
      {memos.map((memo) => (
        <li key={memo.id} className="w-[285px] max-w-full">
          <MemoCard
            memo={memo}
            isPinning={memo.id === pinningMemoId}
            onTogglePin={onTogglePin}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  );
}

export default MemoList;
