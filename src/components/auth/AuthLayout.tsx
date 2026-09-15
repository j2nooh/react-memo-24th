import type { PropsWithChildren } from 'react';

// 로그인과 회원가입 화면이 공통으로 사용하는 인증 페이지 레이아웃입니다.
function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-blue-01 px-4 py-10">
      <div className="w-full max-w-[560px]">{children}</div>
    </main>
  );
}

export default AuthLayout;
