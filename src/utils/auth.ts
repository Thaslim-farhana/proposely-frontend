const TOKEN_KEY = 'proposely_token';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://propsely-backend.onrender.com';

interface ApiRequestOptions {
  method?: string;
  body?: any;
  token?: string;
}

export const apiRequest = async <T = any>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> => {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

export interface User {
  id: string;
  email: string;
  plan: string;
  proposals_count?: number;
  proposals_limit?: number;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterResponse {
  access_token: string;
  user: User;
}

export const register = async (email: string, password: string): Promise<RegisterResponse> => {
  return apiRequest<RegisterResponse>('/api/auth/register', {
    method: 'POST',
    body: { email, password },
  });
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  return apiRequest<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
};

export const getCurrentUser = async (token: string): Promise<User> => {
  return apiRequest<User>('/api/auth/me', { token });
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
