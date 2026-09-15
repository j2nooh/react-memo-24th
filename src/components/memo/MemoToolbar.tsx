import plusIcon from '../../assets/icons/plus.svg';
import profileIcon from '../../assets/icons/profile.svg';
import IconButton from '../common/IconButton';
import MemoSearchBar, { type MemoSearchBarProps } from './MemoSearchBar';

type MemoToolbarProps = MemoSearchBarProps & {
  onCreate: () => void;
};

function MemoToolbar({ onCreate, ...props }: MemoToolbarProps) {
  const actionClassName =
    'size-20 bg-white-00 p-6 max-[900px]:size-16 max-[900px]:p-4 max-sm:size-14 max-sm:p-3';

  return (
    <header className="flex w-full items-center gap-6 max-[900px]:gap-4 max-sm:flex-wrap max-sm:gap-3">
      <h1 className="sr-only">React Memo</h1>
      <MemoSearchBar {...props} />
      <div className="flex gap-6 max-[900px]:gap-4 max-sm:order-1 max-sm:ml-auto max-sm:gap-3">
        <IconButton
          label="메모 작성"
          icon={plusIcon}
          onClick={onCreate}
          className={actionClassName}
        />
        <IconButton label="프로필" icon={profileIcon} disabled className={actionClassName} />
      </div>
    </header>
  );
}

export default MemoToolbar;
