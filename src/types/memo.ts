export type MemoCategory = 'daily' | 'work' | 'others';

export type Memo = {
  id: string;
  title: string;
  content: string;
  category: MemoCategory;
  date: string;
  isPinned: boolean;
};

export type MemoDraft = Pick<Memo, 'title' | 'content' | 'category' | 'date'>;
