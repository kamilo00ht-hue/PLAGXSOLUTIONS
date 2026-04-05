import { NextResponse } from 'next/server';

export type ApiSuccess<T> = { success: true; data: T };
export type ApiFailure = { success: false; error: { message: string; code: string } };

export function ok<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccess<T>>({ success: true, data }, { status });
}

export function fail(message: string, code = 'BAD_REQUEST', status = 400) {
  return NextResponse.json<ApiFailure>({ success: false, error: { message, code } }, { status });
}

export async function withApiErrorHandling<T>(handler: () => Promise<T>) {
  try {
    const data = await handler();
    if (data instanceof NextResponse) return data;
    return ok(data);
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Unexpected error', 'INTERNAL_ERROR', 500);
  }
}
