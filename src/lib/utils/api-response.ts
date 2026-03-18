import { NextResponse } from 'next/server';

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function notFoundResponse(resource = 'Resource') {
  return NextResponse.json(
    { success: false, error: `${resource} not found` },
    { status: 404 }
  );
}

export function badRequestResponse(message: string) {
  return NextResponse.json(
    { success: false, error: message },
    { status: 400 }
  );
}
