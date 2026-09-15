import { useId, useRef } from 'react';
import closeIcon from '../../assets/icons/close.svg';
import searchIcon from '../../assets/icons/search.svg';
import type { MemoCategory } from '../../types/memo';
import MemoTagFilter from './MemoTagFilter';

export type MemoSearchBarProps = {
  keyword: string;
  category: MemoCategory | '';
  onKeywordChange: (keyword: string) => void;
  onCategoryChange: (category: MemoCategory | '') => void;
};

function MemoSearchBar({
  keyword,
  category,
  onKeywordChange,
  onCategoryChange,
}: MemoSearchBarProps) {
  const searchId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      role="search"
      aria-label="메모 검색"
      onSubmit={(event) => {
        event.preventDefault();
        inputRef.current?.focus();
      }}
      className="flex h-20 min-w-0 flex-1 items-center gap-3 rounded-[28px] bg-white-00 p-4 max-sm:order-2 max-sm:h-16 max-sm:basis-full max-sm:p-3"
    >
      <MemoTagFilter category={category} onCategoryChange={onCategoryChange} />
      <label htmlFor={searchId} className="sr-only">
        메모 검색어
      </label>
      <div className="relative min-w-0 flex-1">
        <input
          ref={inputRef}
          id={searchId}
          type="search"
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          placeholder="원하는 메모를 검색하세요"
          className={`w-full min-w-0 rounded-sm bg-transparent text-field-medium text-black-00 placeholder:text-gray-02 [&::-webkit-search-cancel-button]:appearance-none ${keyword ? 'pr-8' : ''}`}
        />
        {keyword && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => {
              onKeywordChange('');
              inputRef.current?.focus();
            }}
            className="absolute top-1/2 right-0 flex size-6 -translate-y-1/2 items-center justify-center rounded-sm"
          >
            <img src={closeIcon} alt="" aria-hidden="true" className="size-5" />
          </button>
        )}
      </div>
      <button
        type="submit"
        aria-label="메모 검색"
        className="flex size-12 shrink-0 items-center justify-center rounded-full max-sm:size-10"
      >
        <img src={searchIcon} alt="" aria-hidden="true" className="size-[38.911px] max-sm:size-8" />
      </button>
    </form>
  );
}

export default MemoSearchBar;
