import {defineConfig, globalIgnores} from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import eslintConfig from '@repo/eslint-config'

const eslintConfig = defineConfig([
  ...eslintConfig,
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

export default eslintConfig
