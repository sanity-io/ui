export function parseFlag<T = unknown>(envValue: string | undefined, defaultValue: T) {
  try {
    if (typeof envValue === 'string') {
      return JSON.parse(envValue) as T
    }
  } catch (_) {
    console.warn(`features: could not parse env value`)
  }

  return defaultValue
}
