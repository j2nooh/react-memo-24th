# 2주차 과제: React Memo

<br>

# 서론

안녕하세요 🙌🏻 24기 프론트엔드 운영진 **구민교**입니다.

다들 1주차 미션인 Vanilla Memo를 만드시느라 수고 많으셨습니다! 1주차 미션을 통해 Vanilla JS로 메모 서비스를 구현하면서 React를 사용하지 않을 때의 불편함을 어느 정도 느껴보셨을 것이라 생각합니다.

그리하여 이번 미션은, 1주차 스터디 미션으로 주어진 Memo 서비스를 **React**로 리팩토링하는 것입니다❗️

기존에 React를 어느 정도 사용해보신 분들께는 더 효율적인 컴포넌트 구조와 디자인 패턴을 고민해보는 주차가 될 것이고, 아직 React를 깊게 접해보지 못한 분들께는 기존 애플리케이션을 React로 포팅하는 과정을 통해 왜 React가 등장하게 되었는지, 그리고 컴포넌트 기반 개발 방식이 Vanilla JS와 어떤 차이가 있는지 체감해보는 주차가 될 것이라 생각합니다.

이번 미션에서는 단순히 화면을 그대로 옮기는 것에 그치지 않고, **어떤 기준으로 컴포넌트를 나누고 어떻게 재사용할 수 있을지** 충분히 고민해보시기 바랍니다. 같은 화면이라도 다양한 컴포넌트 구조가 나올 수 있는 만큼, 본인이 생각하기에 가장 효율적인 방식으로 구현해보시면 좋겠습니다.

또한 이번 과제에서는 React 프로젝트 생성 시 **Vite 사용이 필수입니다.** 과제를 진행하면서 Vite를 활용한 프로젝트 환경 세팅과 함께 React의 기본적인 프로젝트 구조에도 자연스럽게 익숙해져 보세요.

과제를 진행하다가 막히는 부분이 있더라도, 우선은 스스로 공부하고 찾아보며 해결해보는 과정을 권장드립니다. 다만 미션과 관련해 운영진의 도움이 필요하다면, 언제든 프론트엔드 카카오톡방에 질문 남겨주세요!

<br>

# 과제

## 🎯 목표

- React의 기초를 이해합니다.
- React를 통한 어플리케이션 상태 관리 방법을 이해합니다.
- React Hooks에 대한 기초를 이해합니다.
- React의 컴포넌트 기반 개발 방식을 이해하고, UI를 적절한 단위로 분리하여 구현합니다.
- Vite를 통한 React 프로젝트 개발환경 구축을 익힙니다.
- Tailwind CSS를 활용한 유틸리티 클래스 기반 스타일링 방식을 익힙니다.

## 📅 기한

- 2026년 9월 16일 수요일 14:00까지

## 💬 Review Questions

- Virtual DOM은 무엇이고, 이를 사용함으로써 얻는 이점은 무엇인가요?
- React에서 컴포넌트를 분리하는 기준은 무엇이며, 컴포넌트 분리를 통해 얻을 수 있는 이점은 무엇인가요?
- React 컴포넌트의 생명주기에 대해서 설명해주세요.

## 💡 필수 요건

- 1주차에 Vanilla JS로 구현했던 Memo 서비스를 React로 전환합니다.
- 피그마에 제공된 UI를 기준으로 필요한 컴포넌트를 모두 구현합니다.
- Tailwind CSS를 사용합니다.
- React Hooks만을 사용하여 상태를 관리합니다. (전역 상태관리 라이브러리 사용 XX)
- Vite를 활용하여 React 프로젝트 환경 구축을 진행합니다.

## ✅ 선택 요건

- 기존 Memo 서비스에 여러분들이 추가하고 싶은 기능과 디자인을 자유롭게 추가해보세요.
- TypeScript를 활용하여 프로젝트를 진행해보세요.
- 시간이 된다면 다음 주차에 이어서 구현할 메모 작성 완료 부분의 UI를 미리 구현해보세요! 미리 구현해두면 여러분의 추석 연휴를 지킬 수 있습니다 🍂

<br>

# 링크 및 참고자료

- [React Docs 주요 개념](https://react.dev/learn)
- [React Docs Hooks](https://react.dev/reference/react)
- [React useEffect 완벽 가이드](https://overreacted.io/ko/a-complete-guide-to-useeffect/)
- [컴포넌트 네이밍을 위한 자바스크립트 네이밍 컨벤션](https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%ED%83%80%EC%9D%BC-%EA%B0%80%EC%9D%B4%EB%93%9C-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%BB%A8%EB%B2%A4%EC%85%98-%ED%8E%B8)
- [useState, useEffect Hooks](https://velog.io/@velopert/react-hooks#1-usestate)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs/installation/using-vite)
- [VSCode Prettier 설정](https://velog.io/@gangk_99/VS-Code-Prettier-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
- [Create React App (CRA) 지원 종료 공식 문서](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)
- [Create React App 지원 종료 관련 OKKY 커뮤니티 게시글](https://okky.kr/articles/1527414)
- [CRA 대신 Vite로 React 프로젝트 시작하기](https://www.daleseo.com/vite-react/)
- [Vite 실무 적용기 - 설명 + 프로젝트 설정](https://blog.hectodata.co.kr/bonjour-vite/)
