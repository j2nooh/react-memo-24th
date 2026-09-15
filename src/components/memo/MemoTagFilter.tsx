import { useEffect, useId, useRef, useState } from 'react';
import tagArrowIcon from '../../assets/icons/tag-arrow.svg';
import type { MemoCategory } from '../../types/memo';

const categoryOptions: { value: MemoCategory | ''; label: string; color: string }[] = [
  { value: '', label: '전체', color: 'text-blue-07' },
  { value: 'daily', label: 'Daily', color: 'text-blue-04' },
  { value: 'work', label: 'Work', color: 'text-blue-06' },
  { value: 'others', label: 'Others', color: 'text-gray-03' },
];

type MemoTagFilterProps = {
  category: MemoCategory | '';
  onCategoryChange: (category: MemoCategory | '') => void;
};

function MemoTagFilter({ category, onCategoryChange }: MemoTagFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectedOption = categoryOptions.find((option) => option.value === category)!;

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsidePointer(event: PointerEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handleOutsidePointer);
    return () => document.removeEventListener('pointerdown', handleOutsidePointer);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          event.preventDefault();
          event.stopPropagation();
          setIsOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`태그 선택: ${selectedOption.label}`}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
        className={`flex h-9 w-[116px] items-center justify-center gap-2.5 rounded-full bg-blue-01 px-3 py-1.5 text-action-small font-extrabold transition-transform duration-150 active:scale-95 ${selectedOption.color}`}
      >
        {category ? (
          <>
            <span aria-hidden="true" className="size-5 shrink-0 rounded-full bg-current" />
            {selectedOption.label}
          </>
        ) : (
          <>
            태그 선택
            <img src={tagArrowIcon} alt="" aria-hidden="true" className="h-4 w-[13px]" />
          </>
        )}
      </button>
      <div
        id={menuId}
        role="group"
        aria-label="메모 태그"
        hidden={!isOpen}
        className="absolute top-[calc(100%+8px)] left-0 z-10 flex min-w-[116px] flex-col gap-1 rounded-2xl bg-white-00 p-2 shadow-[0_8px_24px_rgb(0_27_81/16%)]"
      >
        {categoryOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={category === option.value}
            onClick={() => {
              onCategoryChange(option.value);
              setIsOpen(false);
              triggerRef.current?.focus();
            }}
            className={`rounded-lg px-2 py-2 text-left text-body-medium text-blue-07 transition-colors hover:bg-blue-01 ${category === option.value ? 'bg-blue-01 font-semibold' : ''}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MemoTagFilter;
