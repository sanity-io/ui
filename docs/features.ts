const __DEV__ = process.env.NODE_ENV === 'development'

/**
 * Fetch draft data when `true`.
 *
 * Toggle this flag on/off by setting the environment variable `NEXT_PUBLIC_FEATURE_PREVIEW=true|false`.
 * Defaults to `true` in development.
 */
export const PREVIEW = getFlag(process.env.NEXT_PUBLIC_FEATURE_PREVIEW, __DEV__)

/**
 * Show hints of hidden content when `true`.
 *
 * Toggle this flag on/off by setting the environment variable `NEXT_PUBLIC_FEATURE_HINT_HIDDEN_CONTENT=true|false`.
 * Defaults to `true` in development.
 */
export const HINT_HIDDEN_CONTENT = getFlag(
  process.env.NEXT_PUBLIC_FEATURE_HINT_HIDDEN_CONTENT,
  __DEV__
)

function getFlag<T = unknown>(envValue: string | undefined, defaultValue: T) {
  try {
    if (typeof envValue === 'string') {
      return JSON.parse(envValue) as T
    }
  } catch (_) {
    console.warn(`features: could not parse env value`)
  }

  return defaultValue
}
