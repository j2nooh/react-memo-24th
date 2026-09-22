import starIcon from '../../assets/icons/star.svg';
import { memoCategoryStyles } from '../../styles/memoCategoryStyles';
import type { Memo } from '../../types/memo';

type MemoCardProps = {
  memo: Memo;
  isPinning?: boolean;
  isOpening?: boolean;
  onTogglePin: (memoId: Memo['id']) => void | Promise<void>;
  onSelect: (memoId: Memo['id']) => void | Promise<void>;
};

function MemoCard({
  memo,
  isPinning = false,
  isOpening = false,
  onTogglePin,
  onSelect,
}: MemoCardProps) {
  const category = memoCategoryStyles[memo.category];
  const starMask = `url("${starIcon}")`;

  return (
    <article
      className={`relative flex h-[285px] w-full flex-col gap-5 overflow-hidden rounded-[20px] pt-[25px] pr-[34px] pb-9 pl-[21px] text-white-00 transition-transform duration-200 hover:-translate-y-1 ${category.card}`}
    >
      <header className="flex shrink-0 items-center gap-3">
        <h3 className="min-w-0 flex-1 text-heading-small font-bold" title={memo.title}>
          <button
            type="button"
            onClick={() => void onSelect(memo.id)}
            disabled={isOpening}
            aria-haspopup="dialog"
            className="block w-full text-left after:absolute after:inset-0 after:rounded-[20px] disabled:cursor-wait"
          >
            <span className="block truncate">{memo.title}</span>
          </button>
        </h3>
        <button
          type="button"
          onClick={() => onTogglePin(memo.id)}
          disabled={isPinning}
          aria-label={memo.isPinned ? '메모 고정 해제' : '메모 고정'}
          aria-pressed={memo.isPinned}
          className="relative z-10 size-7 shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span
            aria-hidden="true"
            className={`block size-full mask-contain mask-center mask-no-repeat ${memo.isPinned ? 'bg-point' : 'bg-memo-star'}`}
            style={{ maskImage: starMask, WebkitMaskImage: starMask }}
          />
        </button>
      </header>
      <p className="line-clamp-6 min-h-0 flex-1 text-body-small wrap-anywhere whitespace-pre-line">
        {memo.content}
      </p>
      <footer
        className={`mt-auto flex shrink-0 items-center justify-between gap-3 text-body-small font-semibold ${category.footer}`}
      >
        <span>{category.label}</span>
        <time dateTime={memo.date}>{memo.date.replaceAll('-', '.')}</time>
      </footer>
    </article>
  );
}

export default MemoCard;
