function getEnv(key: string) {
  const val = process.env[key]

  if (val === undefined) {
    throw new Error(`missing environment variable: ${key}`)
  }

  return val
}

export const config = {
  sanity: {
    projectId: getEnv('SANITY_PROJECT_ID'),
    dataset: getEnv('SANITY_DATASET'),
    token: process.env.SANITY_API_TOKEN,
  },
}
