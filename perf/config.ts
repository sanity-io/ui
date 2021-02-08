import path from 'path'

// register tests
import './tests/button'
import './tests/textArea'
import './tests/textInput'

function getEnv(key: string): string {
  const value = process.env[key]

  if (!value) {
    console.error(`Missing process.env.${key}`)
    process.exit(1)
  }

  return value
}

export const config = {
  artifacts: {
    path: path.resolve(__dirname, 'artifacts'),
  },

  baseUrl: 'http://localhost:9001',

  /**
   * Number of times to run each test
   */
  numRuns: 11,

  sanity: {
    projectId: getEnv('PERF_SANITY_PROJECT_ID'),
    dataset: getEnv('PERF_SANITY_DATASET'),
    token: getEnv('PERF_SANITY_WRITE_TOKEN'),
  },
}
