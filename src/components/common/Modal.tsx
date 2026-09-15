import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: ReactNode;
  labelledBy: string;
  className?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onClose: () => void;
};

function Modal({ children, labelledBy, className = '', initialFocusRef, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    dialog.showModal();
    initialFocusRef?.current?.focus();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [initialFocusRef]);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      className={`m-auto border-0 backdrop:bg-blue-07/50 ${className}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          onClose(); // 클릭 좌표가 모달의 위, 아래, 왼, 오른쪽 경계 중 하나라도 벗어나면 모달을 닫도록 한다.
        }
      }}
    >
      {children}
    </dialog>,
    document.body,
  );
}

export default Modal;
