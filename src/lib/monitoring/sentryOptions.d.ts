export declare const TRACES_SAMPLE_RATE: number;

export interface SentryOptions {
  dsn: string;
  sendDefaultPii: false;
  environment: 'development' | 'production';
  tracesSampleRate: number;
}

export declare function buildSentryOptions(
  dsn: string | undefined,
  isDev: boolean,
): SentryOptions | null;
