type ApiSuccess<T> = {
  success: true;
  data: T;
  message: null;
};

type ApiFailure = {
  success: false;
  data: null;
  message: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
