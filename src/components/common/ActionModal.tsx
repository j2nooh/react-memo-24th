import { useEffect, useId, useRef } from 'react';

type ActionModalProps = {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  cancelLabel?: string;
  onCancel?: () => void;
};

function ActionModal({
  title,
  description,
  confirmLabel,
  onConfirm,
  cancelLabel,
  onCancel,
}: ActionModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const closeModal = onCancel ?? onConfirm;

  useEffect(() => {
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    const initialFocus = cancelButtonRef.current ?? confirmButtonRef.current;
    initialFocus?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closeModal();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;
      const buttons = Array.from(dialog.querySelectorAll<HTMLButtonElement>('button'));
      const firstButton = buttons[0];
      const lastButton = buttons.at(-1);
      if (!firstButton || !lastButton) return;

      if (event.shiftKey && document.activeElement === firstButton) {
        event.preventDefault();
        lastButton.focus();
      } else if (!event.shiftKey && document.activeElement === lastButton) {
        event.preventDefault();
        firstButton.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [closeModal]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-07/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="flex h-[min(240px,calc(100dvh-32px))] w-full max-w-[480px] flex-col items-center justify-between overflow-y-auto rounded-3xl bg-white-00 px-8 pt-12 pb-6 shadow-[0_8px_24px_rgb(0_0_0/25%)]"
      >
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 id={titleId} className="text-heading-medium font-semibold text-blue-07">
            {title}
          </h2>
          <p id={descriptionId} className="text-body-small text-gray-04">
            {description}
          </p>
        </div>
        <div className="flex w-full gap-3">
          {cancelLabel && onCancel && (
            <button
              ref={cancelButtonRef}
              type="button"
              onClick={onCancel}
              className="h-14 flex-1 rounded-xl bg-gray-01 px-6 text-action-small font-bold text-gray-03 transition-colors hover:bg-gray-02"
            >
              {cancelLabel}
            </button>
          )}
          <button
            ref={confirmButtonRef}
            type="button"
            onClick={onConfirm}
            className="h-14 flex-1 rounded-xl bg-blue-05 px-6 text-action-small font-bold text-white-00 transition-colors hover:bg-blue-06"
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ActionModal;
