export type ApiMemo = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type MemoPageResponse = {
  content: ApiMemo[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};
