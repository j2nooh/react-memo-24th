import { ApiError } from '../api/client';

export function getRequestErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.message;
  }

  return '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
}
