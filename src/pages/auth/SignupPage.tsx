import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ApiError } from '../../api/client';
import { signup } from '../../api/auth';
import AuthField from '../../components/auth/AuthField';
import AuthLayout from '../../components/auth/AuthLayout';
import { getRequestErrorMessage } from '../../utils/getRequestErrorMessage';

type SignupForm = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

type SignupErrors = Partial<Record<keyof SignupForm, string>>;

type SignupServerErrors = {
  email?: string;
  password?: string;
  form?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSignupErrors({ email, password, passwordConfirmation }: SignupForm): SignupErrors {
  const errors: SignupErrors = {};

  if (!emailPattern.test(email)) {
    errors.email = '이메일 형식이 올바르지 않습니다.';
  }

  if (password.length < 8) {
    errors.password = '비밀번호는 8자 이상이어야 합니다.';
  }

  if (password !== passwordConfirmation) {
    errors.passwordConfirmation = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
}

function getSignupServerErrors(error: unknown): SignupServerErrors {
  const message = getRequestErrorMessage(error);

  if (error instanceof ApiError && message.includes('이메일')) {
    return { email: message };
  }

  if (error instanceof ApiError && message.includes('비밀번호')) {
    return { password: message };
  }

  return { form: message };
}

function SignupPage() {
  const [form, setForm] = useState<SignupForm>({
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [serverErrors, setServerErrors] = useState<SignupServerErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const errors = hasSubmitted ? getSignupErrors(form) : {};
  const canSubmit = Object.values(form).every((value) => value !== '');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);

    const validationErrors = getSignupErrors(form);

    if (Object.keys(validationErrors).length > 0 || isSubmitting) return;

    setIsSubmitting(true);
    setServerErrors({});

    try {
      await signup({ email: form.email, password: form.password });
      navigate('/login', { replace: true });
    } catch (error) {
      setServerErrors(getSignupServerErrors(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <h1 className="sr-only">회원가입</h1>

      <form
        className="flex flex-col gap-10"
        noValidate
        aria-busy={isSubmitting}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <AuthField
            label="이메일"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="이메일을 입력하세요"
            value={form.email}
            disabled={isSubmitting}
            errorMessage={errors.email ?? serverErrors.email}
            onChange={(event) => {
              setForm({ ...form, email: event.target.value });
              setServerErrors({});
            }}
          />
          <AuthField
            label="비밀번호"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 입력하세요"
            value={form.password}
            disabled={isSubmitting}
            errorMessage={errors.password ?? serverErrors.password}
            onChange={(event) => {
              setForm({ ...form, password: event.target.value });
              setServerErrors({});
            }}
          />
          <AuthField
            label="비밀번호 확인"
            name="passwordConfirmation"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 다시 입력하세요"
            value={form.passwordConfirmation}
            errorMessage={errors.passwordConfirmation}
            disabled={isSubmitting}
            onChange={(event) => {
              setForm({ ...form, passwordConfirmation: event.target.value });
              setServerErrors({});
            }}
          />
          {serverErrors.form && (
            <p role="alert" className="text-body-small text-point">
              {serverErrors.form}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-7 self-stretch">
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="h-14 w-full rounded-xl bg-blue-05 px-5 text-action-medium font-extrabold text-white-00 transition-colors hover:bg-blue-06 disabled:cursor-not-allowed disabled:bg-blue-03 disabled:text-gray-01"
          >
            {isSubmitting ? '회원가입 중...' : '회원가입'}
          </button>

          <p className="text-body-small text-gray-03">
            이미 계정이 있으신가요?
            <Link className="ml-1 font-semibold text-blue-05 hover:text-blue-06" to="/login">
              로그인
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

export default SignupPage;
