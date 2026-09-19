import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../../api/auth';
import { ApiError } from '../../api/client';
import AuthField from '../../components/auth/AuthField';
import AuthLayout from '../../components/auth/AuthLayout';
import ActionModal from '../../components/common/ActionModal';
import { useAuthStore } from '../../stores/authStore';
import { getRequestErrorMessage } from '../../utils/getRequestErrorMessage';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const canSubmit = email.trim() !== '' && password !== '';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const { accessToken } = await login({ email, password });

      setAuth({ accessToken, email });
      navigate('/memos', { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(getRequestErrorMessage(error));
      } else {
        setIsNetworkError(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <h1 className="sr-only">로그인</h1>

      <form
        className="flex flex-col gap-10"
        noValidate
        aria-busy={isSubmitting}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <AuthField
            label="아이디"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="아이디를 입력하세요"
            value={email}
            disabled={isSubmitting}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage('');
            }}
          />
          <AuthField
            label="비밀번호"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            disabled={isSubmitting}
            errorMessage={errorMessage}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrorMessage('');
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-7 self-stretch">
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="h-14 w-full rounded-xl bg-blue-05 px-5 text-action-medium font-extrabold text-white-00 transition-colors hover:bg-blue-06 disabled:cursor-not-allowed disabled:bg-blue-03 disabled:text-gray-01"
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>

          <nav
            aria-label="회원 정보 관리 추가 기능"
            className="flex h-[21.5px] items-center justify-center gap-4 whitespace-nowrap min-[375px]:gap-8 text-body-small text-gray-03"
          >
            <Link className="hover:text-blue-06" to="/signup">
              회원가입
            </Link>
            <span aria-hidden="true" className="h-[21.5px] w-px bg-gray-03" />
            <span>아이디 찾기</span>
            <span aria-hidden="true" className="h-[21.5px] w-px bg-gray-03" />
            <span>비밀번호 찾기</span>
          </nav>
        </div>
      </form>
      {isNetworkError && (
        <ActionModal
          title="네트워크 연결이 불안정합니다"
          description="네트워크 상태를 확인해주세요"
          confirmLabel="확인"
          onConfirm={() => setIsNetworkError(false)}
        />
      )}
    </AuthLayout>
  );
}

export default LoginPage;
