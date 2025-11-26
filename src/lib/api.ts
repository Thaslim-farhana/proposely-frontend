// Note: This is a Vite app, so we use import.meta.env instead of process.env
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://propsely-backend.onrender.com';

export async function apiRequest(
  path: string,
  method: string = "GET",
  body?: any,
  token?: string
) {
  if (!API_BASE) {
    throw new Error("API base URL is not defined");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch (e) {
    // ignore if no json
  }

  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || "Request failed";
    throw new Error(msg);
  }

  return data;
}
