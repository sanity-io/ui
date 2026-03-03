function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

export const datasets = {
  production: assertValue(
    process.env.NEXT_PUBLIC_SANITY_PRODUCTION_DATASET,
    'Missing environment variable: NEXT_PUBLIC_SANITY_PRODUCTION_DATASET',
  ),
  development: assertValue(
    process.env.NEXT_PUBLIC_SANITY_DEVELOPMENT_DATASET,
    'Missing environment variable: NEXT_PUBLIC_SANITY_DEVELOPMENT_DATASET',
  ),
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

// export const perspective = process.env.NEXT_PUBLIC_SANITY_PERSPECTIVE?.split(',') || 'published'

export const apiVersion = '2025-09-25'
