export declare const ANALYTICS_EVENT: Readonly<{
  ONBOARDING_COMPLETED: 'onboarding_completed';
  DAILY_DRAW_COMPLETED: 'daily_draw_completed';
}>;

export declare const ACCENT_THEME_PROPERTY: 'accent_theme';

export interface PostHogConfig {
  apiKey: string;
  options: {
    host?: string;
    captureAppLifecycleEvents: true;
    errorTracking: { autocapture: false };
    enableSessionReplay: false;
  };
}

export declare function buildPostHogConfig(
  apiKey: string | undefined,
  host: string | undefined,
): PostHogConfig | null;

export interface WebStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export declare function createWebStorage(storage: WebStorageLike | null | undefined): {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export interface IdentityAction {
  reset: boolean;
  identify: boolean;
}

export declare function resolveIdentityAction(
  previousUserId: string | null | undefined,
  nextUserId: string | null,
  storedIdIsIdentified: boolean,
): IdentityAction;
