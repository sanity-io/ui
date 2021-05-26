const __DEV__ = process.env.NODE_ENV === 'development'

/**
 * The application’s base path.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/**
 * Application features.
 */
export const features = {
  /**
   * Fetch draft data when `true`.
   *
   * Toggle this flag on/off by setting the environment variable `NEXT_PUBLIC_FEATURE_PREVIEW=true|false`.
   * Defaults to `true` in development.
   */
  preview: parseFlag(process.env.NEXT_PUBLIC_FEATURE_PREVIEW, __DEV__),

  /**
   * Show hints of hidden content when `true`.
   *
   * Toggle this flag on/off by setting the environment variable `NEXT_PUBLIC_FEATURE_HINT_HIDDEN_CONTENT=true|false`.
   * Defaults to `true` in development.
   */
  hintHiddenContent: parseFlag(process.env.NEXT_PUBLIC_FEATURE_HINT_HIDDEN_CONTENT, __DEV__),
}

/**
 * Google Analytics configuration.
 */
export const ga = {
  trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
}

/**
 * Sanity client configuration.
 */
export const sanity = {
  // The Sanity API version
  apiVersion: '2021-03-25',

  // The Sanity project dataset name
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  // The Sanity project ID
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',

  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
  useCdn: process.env.NODE_ENV === 'production',
}

function parseFlag<T = unknown>(envValue: string | undefined, defaultValue: T) {
  try {
    if (typeof envValue === 'string') {
      return JSON.parse(envValue) as T
    }
  } catch (_) {
    console.warn(`features: could not parse env value`)
  }

  return defaultValue
}
