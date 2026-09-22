export type ApiMemoCategory = 'DAILY' | 'WORK' | 'OTHER';

export type ApiMemo = {
  id: number;
  title: string;
  content: string;
  date: string;
  category: ApiMemoCategory;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MemoRequest = {
  title: string;
  content: string;
  date: string;
  category: ApiMemoCategory;
  isPinned: boolean;
};

export type MemoPageResponse = {
  content: ApiMemo[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};
