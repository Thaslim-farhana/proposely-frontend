import { apiRequest } from '@/lib/api';

const TOKEN_KEY = 'proposely_token';
const USER_KEY = 'proposely_user';

export const getToken = (): string | null => {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
};

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export interface User {
  id: string;
  email: string;
  name?: string;
  plan: string;
  proposals_count?: number;
  proposals_limit?: number;
}

export interface LoginResponse {
  token: string;
  access_token?: string;
  user: User;
}

export interface RegisterResponse {
  token: string;
  access_token?: string;
  user: User;
}

export const register = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
  const data = await apiRequest<RegisterResponse>('/auth/signup', {
    method: 'POST',
    body: { name, email, password },
  });
  
  const token = data.token || data.access_token;
  if (!token) throw new Error('Invalid signup response');
  
  saveToken(token);
  if (data.user) saveUser(data.user);
  
  return { ...data, token };
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const data = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  
  const token = data.token || data.access_token;
  if (!token) throw new Error('Invalid login response');
  
  saveToken(token);
  if (data.user) saveUser(data.user);
  
  return { ...data, token };
};

export const getCurrentUser = async (token: string): Promise<User> => {
  return apiRequest<User>('/auth/me', { token });
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
