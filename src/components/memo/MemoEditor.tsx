import { useId, useRef, useState, type FormEvent } from 'react';
import backIcon from '../../assets/icons/back.svg';
import barIcon from '../../assets/icons/bar.svg';
import type { Memo, MemoCategory, MemoDraft } from '../../types/memo';
import { getTodayDate } from '../../utils/getTodayDate';
import ActionModal from '../common/ActionModal';
import Modal from '../common/Modal';
import MemoCategorySelect from './MemoCategorySelect';

type MemoEditorProps = {
  memo?: Memo;
  onSave: (draft: MemoDraft) => void;
  onCancel: () => void;
};

const editorColors = {
  daily: 'bg-blue-04',
  work: 'bg-blue-06',
  others: 'bg-gray-02',
};

type ExitAction = 'back' | 'cancel';

function MemoEditor({ memo, onSave, onCancel }: MemoEditorProps) {
  const headingId = useId();
  const titleRef = useRef<HTMLInputElement>(null);
  const isEditing = memo !== undefined;
  const [title, setTitle] = useState(memo?.title ?? '');
  const [content, setContent] = useState(memo?.content ?? '');
  const [category, setCategory] = useState<MemoCategory | ''>(memo?.category ?? '');
  const [date, setDate] = useState(memo?.date ?? getTodayDate);
  const [exitAction, setExitAction] = useState<ExitAction | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const canSubmit = title.trim() !== '' && content.trim() !== '' && category !== '' && date !== '';

  function requestClose(action: ExitAction) {
    if (isEditing) {
      onCancel();
      return;
    }
    setExitAction(action);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || !category) return;
    onSave({ title: title.trim(), content: content.trim(), category, date });
    if (!isEditing) setIsComplete(true);
  }

  return (
    <Modal
      labelledBy={headingId}
      initialFocusRef={titleRef}
      onClose={() => requestClose('back')}
      className="h-dvh max-h-none w-full max-w-none overflow-y-auto bg-white-00 p-0"
    >
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col items-center justify-center px-40 py-[82px] max-[900px]:px-8 max-sm:px-4 max-sm:pt-20 max-sm:pb-6"
      >
        <h2 id={headingId} className="sr-only">
          {isEditing ? '메모 수정' : '메모 작성'}
        </h2>
        <button
          type="button"
          onClick={() => requestClose('back')}
          aria-label={isEditing ? '메모 상세로 돌아가기' : '메모 목록으로 돌아가기'}
          className="absolute top-[82px] left-40 flex size-8 items-center justify-center max-[900px]:left-8 max-sm:top-6 max-sm:left-4"
        >
          <img src={backIcon} alt="" className="h-7 w-[14px]" />
        </button>
        <section
          aria-label="메모 입력"
          className={`flex h-[clamp(420px,calc(100dvh-252px),600px)] w-full max-w-[600px] flex-col gap-8 rounded-3xl px-10 pt-11 pb-10 shadow-[0_4px_4px_rgb(0_0_0/25%)] max-sm:gap-6 max-sm:px-6 max-sm:pt-8 max-sm:pb-6 ${category ? `${editorColors[category]} text-white-00` : 'bg-blue-01 text-blue-04'}`}
        >
          <input
            ref={titleRef}
            aria-label="메모 제목"
            required
            maxLength={40}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목을 입력하세요..."
            className="w-full min-w-0 bg-transparent text-heading-large font-bold placeholder:text-current placeholder:opacity-70 max-sm:text-heading-medium"
          />
          <div className="flex shrink-0 flex-wrap items-center gap-6 max-sm:gap-3">
            <MemoCategorySelect value={category} onChange={setCategory} />
            <img
              src={barIcon}
              alt=""
              className="h-[52px] w-[3px] max-[360px]:hidden"
            />
            <input
              aria-label="메모 날짜"
              type="date"
              required
              min="0001-01-01"
              max="9999-12-31"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-[152px] min-w-0 bg-transparent text-heading-small font-bold text-white-00 scheme-dark max-sm:w-[138px] max-sm:text-body-medium max-[360px]:w-[112px] max-[360px]:text-body-small"
            />
          </div>
          <textarea
            aria-label="메모 본문"
            required
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="본문을 입력하세요..."
            className="min-h-0 w-full flex-1 resize-none bg-transparent text-body-large font-medium placeholder:text-current placeholder:opacity-70 max-sm:text-body-medium"
          />
        </section>
        <div className="mt-8 flex w-full max-w-[600px] gap-4 max-sm:gap-3">
          <button
            type="button"
            onClick={() => requestClose('cancel')}
            className="h-14 flex-1 rounded-[18px] bg-memo-star text-action-small font-bold text-gray-03 transition-colors hover:bg-gray-02"
          >
            작성 취소
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="h-14 flex-1 rounded-[18px] bg-blue-05 text-action-small font-bold text-white-00 transition-colors hover:bg-blue-06 disabled:cursor-not-allowed disabled:bg-memo-daily disabled:hover:bg-memo-daily"
          >
            {isEditing ? '수정 완료' : '작성 완료'}
          </button>
        </div>
      </form>
      {exitAction && (
        <ActionModal
          title={
            exitAction === 'back' ? '이전으로 돌아가시겠습니까?' : '메모 작성을 그만 두시겠습니까?'
          }
          description="작성중이던 메모는 저장되지 않습니다."
          cancelLabel="계속 작성하기"
          confirmLabel={exitAction === 'back' ? '돌아가기' : '작성 취소하기'}
          onCancel={() => setExitAction(null)}
          onConfirm={onCancel}
        />
      )}
      {isComplete && (
        <ActionModal
          title="작성이 완료되었습니다"
          description="메인 화면에서 작성한 메모를 확인할 수 있습니다."
          confirmLabel="확인"
          onConfirm={onCancel}
        />
      )}
    </Modal>
  );
}

export default MemoEditor;
