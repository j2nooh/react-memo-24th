import { useEffect, useId, useRef, useState } from 'react';
import arrowIcon from '../../assets/icons/tag-arrow.svg';
import { memoCategoryStyles } from '../../styles/memoCategoryStyles';
import type { MemoCategory } from '../../types/memo';

type MemoCategorySelectProps = {
  value: MemoCategory | '';
  onChange: (category: MemoCategory) => void;
};

const categories: MemoCategory[] = ['daily', 'work', 'others'];

function MemoCategorySelect({ value, onChange }: MemoCategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const selected = value ? memoCategoryStyles[value] : null;

  useEffect(() => {
    if (!isOpen) return;
    function handleOutsideClick(event: PointerEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
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
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label={`메모 태그 선택: ${selected?.label ?? '미선택'} (필수)`}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((previous) => !previous)}
        className={`flex h-9 w-[116px] items-center justify-center gap-2 rounded-full px-3 text-action-small font-extrabold transition-transform duration-150 active:scale-95 ${selected ? `bg-white-00 ${selected.tag}` : 'bg-blue-02 text-blue-07'}`}
      >
        {selected && <span aria-hidden="true" className="size-5 rounded-full bg-current" />}
        {selected?.label ?? '태그 선택'}
        {!selected && <img src={arrowIcon} alt="" className="h-4 w-[13px]" />}
      </button>
      <div
        id={menuId}
        role="group"
        aria-label="메모 태그"
        hidden={!isOpen}
        className="absolute top-[calc(100%+8px)] left-0 z-10 flex w-[116px] flex-col gap-1 rounded-xl bg-white-00 p-2 shadow-lg"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={category === value}
            className="rounded-lg p-2 text-left text-body-medium text-blue-07 transition-colors hover:bg-blue-01"
            onClick={() => {
              onChange(category);
              setIsOpen(false);
              buttonRef.current?.focus();
            }}
          >
            {memoCategoryStyles[category].label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MemoCategorySelect;
