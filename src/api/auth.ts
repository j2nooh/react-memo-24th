import type { AuthCredentials, LoginResponse, SignupResponse } from '../types/auth';
import { request } from './client';

export function login(credentials: AuthCredentials) {
  return request<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: credentials,
  });
}

export function signup(credentials: AuthCredentials) {
  return request<SignupResponse>('/api/auth/signup', {
    method: 'POST',
    body: credentials,
  });
}
