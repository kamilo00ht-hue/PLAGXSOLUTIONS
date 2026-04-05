# @plagx/api-client

Shared HTTP API client for desktop and mobile adapters.

## Usage
```ts
import { createApiClient } from '@plagx/api-client';

const api = createApiClient({ baseUrl: 'http://localhost:3000', getToken: () => localStorage.getItem('token') });
await api.loginUser({ email, password });
```
