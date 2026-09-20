import { useId, useState } from 'react';
import barIcon from '../../assets/icons/bar.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import exitIcon from '../../assets/icons/exit.svg';
import modifyIcon from '../../assets/icons/modify.svg';
import { memoCategoryStyles } from '../../styles/memoCategoryStyles';
import type { Memo } from '../../types/memo';
import ActionModal from '../common/ActionModal';
import IconButton from '../common/IconButton';
import Modal from '../common/Modal';

type MemoDetailModalProps = {
  memo: Memo;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void | Promise<void>;
};

function MemoDetailModal({ memo, onClose, onEdit, onDelete }: MemoDetailModalProps) {
  const titleId = useId();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const category = memoCategoryStyles[memo.category];

  async function handleDelete() {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Modal
      labelledBy={titleId}
      onClose={onClose}
      className={`h-[min(556px,calc(100dvh-32px))] max-h-none w-[min(556px,calc(100vw-32px))] max-w-none overflow-y-auto rounded-3xl px-11 py-10 text-white-00 shadow-[0_4px_4px_rgb(0_0_0/25%)] max-sm:px-6 max-sm:py-7 ${category.card}`}
    >
      <article className="flex min-h-full flex-col">
        <header className="flex shrink-0 items-start justify-between gap-8">
          <h2
            id={titleId}
            className="min-w-0 text-heading-large font-bold wrap-anywhere whitespace-pre-wrap"
          >
            {memo.title}
          </h2>
          <IconButton label="상세 메모 닫기" icon={exitIcon} onClick={onClose} className="size-8" />
        </header>
        <div className="mt-8 flex shrink-0 items-center gap-6 max-sm:mt-6 max-sm:gap-4">
          <span
            className={`flex h-9 w-[116px] shrink-0 items-center justify-between rounded-[28px] bg-white-00 py-1 pr-6 pl-3 text-action-small font-extrabold ${category.tag}`}
          >
            <span aria-hidden="true" className="size-5 rounded-full bg-current" />
            {category.label}
          </span>
          <img src={barIcon} alt="" className="h-[52px] w-[3px] shrink-0" />
          <time
            dateTime={memo.date}
            className="text-heading-small font-bold max-sm:text-body-medium"
          >
            {memo.date.replaceAll('-', '.')}
          </time>
        </div>
        <p className="mt-8 flex-1 text-body-large font-medium wrap-anywhere whitespace-pre-wrap max-sm:mt-6">
          {memo.content}
        </p>
        <footer className="flex shrink-0 justify-end gap-3 p-1">
          <IconButton
            label="메모 수정"
            icon={modifyIcon}
            onClick={onEdit}
            className="size-8 p-px"
          />
          <IconButton
            label="메모 삭제"
            icon={deleteIcon}
            onClick={() => setIsDeleteConfirmOpen(true)}
            className="size-8 p-px"
          />
        </footer>
      </article>
      {isDeleteConfirmOpen && (
        <ActionModal
          title="메모를 삭제 하시겠습니까?"
          description="삭제된 메모는 복구할 수 없습니다."
          cancelLabel="취소"
          confirmLabel="삭제"
          onCancel={() => setIsDeleteConfirmOpen(false)}
          onConfirm={() => void handleDelete()}
          isConfirming={isDeleting}
        />
      )}
    </Modal>
  );
}

export default MemoDetailModal;
