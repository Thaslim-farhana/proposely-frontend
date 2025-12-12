// API client with timeout handling and raw response support

export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://propsely-backend.onrender.com';

const TOKEN_KEY = 'proposely_token';

function getToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
}

export interface ApiRequestOptions {
  method?: string;
  body?: any;
  token?: string;
  headers?: Record<string, string>;
  timeout?: number;
  raw?: boolean; // Return raw Response for blob handling
}

export async function apiRequest<T = any>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, token, headers: customHeaders, timeout = 20000, raw = false } = options;

  const storedToken = token || getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
    ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body && method !== 'GET' ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';

    if (res.ok) {
      if (raw) {
        return res as unknown as T;
      }
      if (contentType.includes('application/json')) {
        return await res.json();
      }
      return (await res.text()) as unknown as T;
    }

    // Not ok — extract helpful error message
    let errorText = '';
    try {
      if (contentType.includes('application/json')) {
        const data = await res.json();
        errorText = data.message || data.error || JSON.stringify(data);
      } else {
        errorText = await res.text();
      }
    } catch {
      errorText = res.statusText || `HTTP ${res.status}`;
    }

    const error = new Error(errorText || `HTTP ${res.status}`) as Error & { status?: number };
    error.status = res.status;
    throw error;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw err;
  }
}

// Proposal generation with blob support
export async function generateProposalBlob(payload: {
  client_name: string;
  project_type: string;
  company_name?: string;
  template?: string;
  title?: string;
  content?: string;
  project_budget?: number;
}): Promise<Response> {
  return apiRequest<Response>('/generate-proposal', {
    method: 'POST',
    body: payload,
    raw: true,
    timeout: 60000, // Generation may take longer
  });
}

// Save proposal metadata
export async function saveProposal(payload: {
  client_name: string;
  project_type: string;
  company_name?: string;
  title?: string;
  template?: string;
}): Promise<any> {
  return apiRequest('/proposals/create', {
    method: 'POST',
    body: payload,
  });
}

// List user proposals
export async function listProposals(): Promise<any[]> {
  return apiRequest('/proposals/list', { method: 'GET' });
}
