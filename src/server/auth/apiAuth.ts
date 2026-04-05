import { NextRequest } from 'next/server';
import { getBearerToken, verifyApiToken } from './token';

export function requireApiAuth(req: NextRequest) {
  const token = getBearerToken(req.headers.get('authorization'));
  if (!token) return null;
  return verifyApiToken(token);
}
