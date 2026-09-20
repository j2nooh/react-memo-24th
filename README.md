# React Memo

1주차에 Vanilla JavaScript로 만든 메모 앱을 2주차에 React로 전환하고,
3주차에는 로그인, 회원가입과 API 연동을 추가하는 프로젝트입니다.

- [1주차 Vanilla Memo](https://github.com/j2nooh/vanilla-memo-24th)
- [2주차 과제 안내](docs/assignment-week2.md)
- [3주차 과제 안내](docs/assignment-week3.md)

## 사용한 기술 스택

| 구분 | 기술 |
| --- | --- |
| UI 라이브러리 | React, React DOM |
| 언어 | TypeScript |
| 개발 서버 및 빌드 | Vite |
| 스타일 | Tailwind CSS |
| 상태 관리 | React Hooks, Zustand |
| 라우팅 | React Router |
| 코드 검사 | ESLint |
| 코드 포맷 | Prettier |

## 구현 기능

### 2주차: React 전환

1주차 Memo 기능을 React로 전환하며, 상태 관리는 전역 상태관리 라이브러리 없이 React Hooks로 구현합니다.

- [x] 개발 환경 설정 (Vite, React, TypeScript, Tailwind CSS, ESLint, Prettier)
- [x] Figma 기준 디자인 시스템 및 기본 레이아웃 구성
- [x] 메모 목록 및 재사용 가능한 카드 컴포넌트 구현
- [x] 메모 검색 및 태그 필터 구현
- [x] 메모 고정 및 고정 목록 분리
- [x] 메모 상세 조회 및 모달 구현
- [x] 메모 작성 및 수정 기능 구현
- [x] 작성 취소 확인 및 완료 안내 구현
- [x] 메모 삭제 및 삭제 확인, 메모가 없는 화면 구현
- [x] localStorage를 통한 메모 저장 및 복원
- [x] 반응형 레이아웃 및 인터랙션 스타일 보완
- [x] 메모 앱 favicon 적용

### 3주차: 인증 및 API 연동

- [x] Zustand 및 React Router 설정
- [x] Figma 기준 로그인 화면 및 입력 상태 구현
- [x] 회원가입 화면 및 입력값 검증 구현
- [x] 공통 API 요청 함수 및 인증 상태 저장소 구성
- [x] 로그인 API 연동 및 상태별 UI 처리
- [x] 회원가입 API 연동 및 상태별 UI 처리
- [x] 인증된 메모 페이지 접근 제어
- [x] 인증 화면 반응형 레이아웃 및 접근성 검증
- [x] 마이페이지 UI 및 메모 화면 진입 경로 구현
- [x] 로그아웃 및 브라우저 인증 정보 삭제
- [x] 메모 목록 API 조회 및 로딩, 오류 상태 처리
- [x] 인증 만료 시 인증 정보 삭제 및 로그인 화면 이동
- [x] 서버 태그, 고정 상태 조회 및 표시
- [x] 메모 작성 API 연동
- [x] 메모 수정 API 연동
- [x] 메모 고정 상태 API 연동
- [ ] 메모 삭제 API 연동

## 파일 구조

레포 루트 기준의 주요 파일입니다.

```text
react-memo-24th/
├── docs/
│   ├── assignment-week2.md         # 2주차 과제 안내글
│   └── assignment-week3.md         # 3주차 과제 안내글
├── public/                         # 경로로 직접 제공하는 정적 파일
├── src/
│   ├── api/
│   │   ├── auth.ts                 # 로그인, 회원가입 API 요청
│   │   ├── client.ts               # 공통 요청, 응답 및 오류 처리
│   │   └── memos.ts                # 메모 목록 조회, 작성 API 요청
│   ├── assets/
│   │   ├── fonts/                  # Pretendard 폰트
│   │   └── icons/                  # SVG 아이콘
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthField.tsx     # 인증 폼의 입력 필드와 오류 안내
│   │   │   └── AuthLayout.tsx    # 로그인, 회원가입 공통 화면 배치
│   │   ├── common/
│   │   │   ├── ActionModal.tsx    # 확인 및 완료 안내 모달
│   │   │   ├── IconButton.tsx     # 공용 아이콘 버튼 (공통 UI)
│   │   │   └── Modal.tsx          # 모달 표시, 닫기 및 배경 스크롤 제어
│   │   └── memo/
│   │       ├── MemoCard.tsx       # 카테고리별 메모 카드 UI
│   │       ├── MemoEditor.tsx     # 메모 작성/수정 입력 및 폼 검증
│   │       ├── MemoCategorySelect.tsx # 메모의 필수 태그 선택
│   │       ├── MemoDetailModal.tsx # 메모 상세 내용과 수정, 삭제 처리
│   │       ├── MemoList.tsx       # 메모 목록 및 검색, 메모 빈 화면
│   │       ├── MemoToolbar.tsx    # 검색 영역과 상단 버튼 배치
│   │       ├── MemoSearchBar.tsx  # 검색어 입력 및 지우기
│   │       └── MemoTagFilter.tsx  # 태그 선택 및 메뉴 열림 상태
│   ├── hooks/
│   │   ├── useApiMemos.ts        # 서버 메모 목록 조회, 작성 상태와 재시도
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx      # 로그인 페이지
│   │   │   └── SignupPage.tsx     # 회원가입 페이지
│   │   └── MemoPage.tsx           # 메모 상태 관리, 조회/작성/수정/삭제 처리
│   │   └── MyPage.tsx              # 로그인 이메일을 표시하는 마이페이지
│   ├── routes/
│   │   ├── AppRouter.tsx          # 로그인, 회원가입, 메모, 마이페이지 경로
│   │   └── ProtectedRoute.tsx     # 인증되지 않은 메모 페이지 접근 제한
│   ├── stores/
│   │   └── authStore.ts            # access token과 이메일 전역 상태
│   ├── styles/
│   │   ├── memoCategoryStyles.ts  # 카드와 상세 모달의 카테고리별 스타일
│   │   └── theme.css              # 색상 및 타이포그래피 토큰
│   ├── types/
│   │   ├── api.ts                 # 공통 API 응답 타입
│   │   ├── auth.ts                # 인증 API 요청과 응답 타입
│   │   ├── memoApi.ts             # 서버 메모 API 응답 타입
│   │   └── memo.ts                # 메모 및 카테고리 타입
│   ├── utils/
│   │   ├── getRequestErrorMessage.ts # API, 네트워크 오류 메시지 정리
│   │   ├── getTodayDate.ts       # 로컬 시간 기준 오늘 날짜
│   │   ├── mapApiMemoToMemo.ts   # 서버 카테고리, 메모를 카드 UI 데이터로 변환
│   │   └── filterMemos.ts        # 검색어와 태그 조건으로 메모 필터링
│   ├── App.tsx                    # 페이지 연결
│   ├── index.css                  # Tailwind, 폰트 및 전역 스타일
│   └── main.tsx                   # React 앱 진입점
├── index.html           # React 앱을 표시할 HTML 문서
├── .env.example          # API 기본 주소 환경 변수 예시
├── package.json         # 의존성 및 실행 명령
├── vercel.json          # 배포 환경의 SPA 경로 재작성 설정
├── vite.config.ts       # Vite 및 플러그인 설정
└── eslint.config.js     # 코드 검사 규칙
```

## 실행 방법

레포 루트에서 실행합니다.

```bash
npm ci
cp .env.example .env
npm run dev
```

실행 후 터미널에 표시된 로컬 주소로 접속합니다.

| 명령 | 용도 |
| --- | --- |
| `npm run build` | 타입 검사 및 배포용 빌드 |
| `npm run lint` | 코드 규칙 검사 |
| `npm run format` | 코드 포맷 적용 |
| `npm run format:check` | 코드 포맷 검사 |
