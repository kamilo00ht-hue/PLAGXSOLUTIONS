export type HttpClientOptions = {
  baseUrl: string;
  getToken?: () => string | null;
};

export class HttpClient {
  constructor(private readonly options: HttpClientOptions) {}

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = this.options.getToken?.();
    const headers = new Headers(init.headers ?? {});

    if (!headers.has('Content-Type') && init.body) {
      headers.set('Content-Type', 'application/json');
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${this.options.baseUrl}${path}`, {
      ...init,
      headers
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text || 'Request failed'}`);
    }

    return (await response.json()) as T;
  }
}
