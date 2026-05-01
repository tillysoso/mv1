export class AppError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleSupabaseError(error: unknown): AppError {
  if (error !== null && typeof error === 'object' && 'message' in error) {
    const e = error as { message: string; code?: string };
    return new AppError(e.message, e.code);
  }
  return new AppError(String(error));
}

export async function handleAsyncError<T>(
  fn: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error('[handleAsyncError]', error);
    return fallback;
  }
}
