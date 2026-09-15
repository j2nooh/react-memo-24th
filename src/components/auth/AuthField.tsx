import { useId } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

type AuthFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'className'> & {
  label: string;
  errorMessage?: string;
};

function AuthField({ label, errorMessage, ...props }: AuthFieldProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        {...props}
        id={inputId}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={errorMessage ? errorId : undefined}
        className="h-14 w-full rounded-xl bg-white-00 px-5 text-field-medium text-gray-04 placeholder:text-gray-02 disabled:cursor-not-allowed disabled:bg-gray-01"
      />
      {errorMessage && (
        <p id={errorId} className="text-body-small text-point">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default AuthField;
