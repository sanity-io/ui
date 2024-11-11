import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
      'ae-incompatible-release-tags': 'warn',
      'ae-missing-release-tag': 'warn',
    },
  },
  legacyExports: true,
  strictOptions: {
    // disable warning when not using browserslist in package.json
    noImplicitBrowsersList: 'off',
  },
  tsconfig: 'tsconfig.dist.json',
  babel: {reactCompiler: true},
  reactCompilerOptions: {
    target: '18',
    logger: {
      logEvent(filename, event) {
        /* eslint-disable no-console */
        if (event.kind === 'CompileError') {
          console.group(`[${filename}] ${event.kind}`)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const {reason, description, severity, loc, suggestions} = event.detail as any

          console.error(`[${severity}] ${reason}`)
          console.log(`${filename}:${loc.start?.line}:${loc.start?.column} ${description}`)
          console.log(suggestions)

          console.groupEnd()
        }
      },
    },
  },
})
