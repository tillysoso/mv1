import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Majestic</title>
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body, #root { height: 100%; margin: 0; padding: 0; background: #1A1A2E; }
            #root { display: flex; flex: 1; }
            #pre-error { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #0D0D14; color: #FF8888; padding: 24px; z-index: 99999; font-family: monospace; font-size: 13px; overflow: auto; white-space: pre-wrap; }
          `
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.onerror = function(msg, src, line, col, err) {
              var el = document.getElementById('pre-error');
              if (el) { el.style.display = 'block'; el.textContent = 'JS Error:\\n' + msg + '\\n\\n' + (err && err.stack ? err.stack : src + ':' + line + ':' + col); }
              return false;
            };
            window.onunhandledrejection = function(e) {
              var el = document.getElementById('pre-error');
              if (el) { el.style.display = 'block'; el.textContent = 'Unhandled rejection:\\n' + (e.reason && e.reason.stack ? e.reason.stack : String(e.reason)); }
            };
          `
        }} />
      </head>
      <body>
        <div id="pre-error" />
        {children}
      </body>
    </html>
  );
}
