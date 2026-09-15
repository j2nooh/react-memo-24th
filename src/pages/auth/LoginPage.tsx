import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthField from '../../components/auth/AuthField';
import AuthLayout from '../../components/auth/AuthLayout';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = email.trim() !== '' && password !== '';

  return (
    <AuthLayout>
      <h1 className="sr-only">로그인</h1>

      <form className="flex flex-col gap-10" onSubmit={(event) => event.preventDefault()}>
        <div className="flex flex-col gap-4">
          <AuthField
            label="아이디"
            name="email"
            type="text"
            autoComplete="username"
            placeholder="아이디를 입력하세요"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <AuthField
            label="비밀번호"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="flex flex-col items-center gap-7 self-stretch">
          <button
            type="submit"
            disabled={!canSubmit}
            className="h-14 w-full rounded-xl bg-blue-05 px-5 text-action-medium font-extrabold text-white-00 transition-colors hover:bg-blue-06 disabled:cursor-not-allowed disabled:bg-blue-03 disabled:text-gray-01"
          >
            로그인
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
    </AuthLayout>
  );
}

export default LoginPage;
