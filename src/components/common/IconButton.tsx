import type { ComponentPropsWithoutRef } from 'react';

type IconButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'aria-label'> & {
  label: string;
  icon: string;
};

function IconButton({ label, icon, className = '', type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      aria-label={label}
      className={`flex shrink-0 items-center justify-center rounded-full transition-transform duration-150 hover:scale-105 active:scale-95 disabled:cursor-default disabled:hover:scale-100 ${className}`}
    >
      <img src={icon} alt="" aria-hidden="true" className="size-8" />
    </button>
  );
}

export default IconButton;
