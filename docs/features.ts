/**
 * Fetch data including drafts.
 *
 * Toggle this flag on/off by setting the environment variable `FEATURE_PREVIEW=true|false`.
 * Defaults to `true` in development.
 */
export const PREVIEW = process.env.FEATURE_PREVIEW
  ? JSON.parse(process.env.FEATURE_PREVIEW)
  : process.env.NODE_ENV === 'development'
