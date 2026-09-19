import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/icons/back.svg';
import deleteIcon from '../assets/icons/delete.svg';
import modifyIcon from '../assets/icons/modify.svg';
import profileIcon from '../assets/icons/profile.svg';
import tagManageIcon from '../assets/icons/tag-manage.svg';
import { useAuthStore } from '../stores/authStore';

function MyPage() {
  const navigate = useNavigate();
  const email = useAuthStore((state) => state.email);
  const nickname = email?.split('@')[0] ?? '닉네임';

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[1440px] bg-blue-01 px-[clamp(32px,calc((100%_-_1200px)/2),120px)] pt-[72px] pb-14 max-[900px]:px-8 max-[900px]:pt-12 max-sm:px-4 max-sm:pt-6">
      <header className="flex items-center">
        <button
          type="button"
          onClick={() => navigate('/memos')}
          aria-label="메모 목록으로 돌아가기"
          className="flex size-12 items-center justify-center rounded-full transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          <img src={backIcon} alt="" aria-hidden="true" className="h-6 w-auto" />
        </button>
      </header>

      <section aria-labelledby="profile-title" className="mx-auto mt-[78px] w-full max-w-[480px] max-sm:mt-14">
        <div className="flex items-center gap-6 max-sm:gap-4">
          <div className="flex size-[120px] shrink-0 items-center justify-center rounded-full bg-white-00 max-sm:size-24">
            <img src={profileIcon} alt="" aria-hidden="true" className="size-16 max-sm:size-14" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h1 id="profile-title" className="truncate text-heading-large font-bold text-blue-07 max-sm:text-heading-medium">
                {nickname}
              </h1>
              <span
                aria-hidden="true"
                className="size-[27px] shrink-0 bg-blue-07 mask-contain mask-center mask-no-repeat max-sm:size-5"
                style={{
                  maskImage: `url("${modifyIcon}")`,
                  WebkitMaskImage: `url("${modifyIcon}")`,
                }}
              />
            </div>
            <p className="mt-2 break-all text-body-large text-gray-04 max-sm:text-body-medium">{email}</p>
          </div>
        </div>
      </section>

      <section aria-label="프로필 메뉴" className="mx-auto mt-11 w-full max-w-[480px]">
        <ul className="space-y-4">
          <li className="flex h-14 items-center gap-4 rounded-xl bg-white-00 px-4 shadow-[0_4px_4px_rgb(0_0_0/25%)]">
            <img src={tagManageIcon} alt="" aria-hidden="true" className="size-6" />
            <span className="text-body-small font-bold text-blue-07">태그 관리</span>
          </li>
          <li className="flex h-14 items-center gap-4 rounded-xl bg-white-00 px-4 shadow-[0_4px_4px_rgb(0_0_0/25%)]">
            <span
              aria-hidden="true"
              className="size-6 shrink-0 bg-blue-07 mask-contain mask-center mask-no-repeat"
              style={{
                maskImage: `url("${deleteIcon}")`,
                WebkitMaskImage: `url("${deleteIcon}")`,
              }}
            />
            <span className="text-body-small font-bold text-blue-07">휴지통</span>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default MyPage;
