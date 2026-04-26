import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

// Replace with your GA4 Measurement ID from Google Analytics > Admin > Data Streams
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* Resets ScrollView default styles that conflict with the root web layout */}
        <ScrollViewStyleReset />

        {/* Google Analytics 4 — web only, no-op on native builds */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                send_page_view: false
              });
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
