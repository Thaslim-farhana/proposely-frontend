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
  raw?: boolean;
  formData?: boolean; // For OAuth2 form-urlencoded
}

export async function apiRequest<T = any>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, token, headers: customHeaders, timeout = 20000, raw = false, formData = false } = options;

  const storedToken = token || getToken();

  const headers: Record<string, string> = {
    ...(formData ? {} : { 'Content-Type': 'application/json' }),
    ...customHeaders,
    ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    let requestBody: string | undefined;
    if (body && method !== 'GET') {
      if (formData) {
        // OAuth2 form-urlencoded format
        const params = new URLSearchParams();
        Object.entries(body).forEach(([key, value]) => {
          if (value !== undefined) params.append(key, String(value));
        });
        requestBody = params.toString();
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
      } else {
        requestBody = JSON.stringify(body);
      }
    }

    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: requestBody,
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

    let errorText = '';
    try {
      if (contentType.includes('application/json')) {
        const data = await res.json();
        errorText = data.detail || data.message || data.error || JSON.stringify(data);
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

// Proposal preview (no PDF)
export async function previewProposal(payload: {
  client_name: string;
  project_type: string;
  company_name?: string;
  template?: string;
  title?: string;
  content?: string;
  project_budget?: number;
}): Promise<any> {
  return apiRequest('/api/proposals/preview', {
    method: 'POST',
    body: payload,
    timeout: 60000,
  });
}

// Save proposal metadata (auth required)
export async function saveProposal(payload: {
  client_name: string;
  project_type: string;
  company_name?: string;
  title?: string;
  template?: string;
  content?: string;
  project_budget?: number;
}): Promise<any> {
  return apiRequest('/api/proposals/create', {
    method: 'POST',
    body: payload,
  });
}

// Generate PDF blob (auth required)
export async function generateProposalPdf(payload: {
  client_name: string;
  project_type: string;
  company_name?: string;
  template?: string;
  title?: string;
  content?: string;
  project_budget?: number;
}): Promise<Response> {
  return apiRequest<Response>('/api/generate-proposal', {
    method: 'POST',
    body: payload,
    raw: true,
    timeout: 60000,
  });
}

// List user proposals (auth required)
export async function listProposals(): Promise<any[]> {
  return apiRequest('/api/proposals/list', { method: 'GET' });
}

// Delete proposal
export async function deleteProposal(id: string): Promise<void> {
  return apiRequest(`/api/proposals/${id}`, { method: 'DELETE' });
}
