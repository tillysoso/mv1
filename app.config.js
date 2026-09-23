// Extends app.json. Sentry's config plugin only wires native source-map and
// debug-symbol upload (the SDK itself autolinks), and that upload step fails
// the build without credentials — so include it only when SENTRY_AUTH_TOKEN is
// set. Keyless builds stay a no-op, same as a blank EXPO_PUBLIC_SENTRY_DSN.
module.exports = ({ config }) => ({
  ...config,
  plugins: [
    ...(config.plugins ?? []),
    ...(process.env.SENTRY_AUTH_TOKEN ? ['@sentry/react-native'] : []),
  ],
});
