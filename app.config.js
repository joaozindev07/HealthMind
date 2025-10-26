/**
 * app.config.js — expose env vars to Expo 'extra' so EAS builds can inject secrets
 */
import 'dotenv/config'

export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...(config.extra || {}),
      EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
  }
}
