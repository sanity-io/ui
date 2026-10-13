/**
 * Generates a synthetic StyleX library of N component files (plus a shared
 * `tokens.stylex.ts` and an `index.ts` barrel) under `bench/.generated/`, for
 * compiler benchmarks and parity checks. Every file differs in a few values so
 * that rules are not trivially identical across files; each file is ~1.2 kB
 * and mixes static values, token references, conditions, a media query and a
 * dynamic style — roughly a @sanity/ui primitive.
 */
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const generatedDir = path.join(root, 'bench', '.generated')

const TOKENS = `import * as stylex from '@stylexjs/stylex'

export const tokens = stylex.defineVars({
  fontSize1: '13px',
  lineHeight1: '17px',
  radius2: '3px',
  space2: '8px',
  space3: '12px',
  space4: '16px',
  bg: '#ffffff',
  bgHover: '#f2f3f5',
  fg: '#121923',
  border: '#e3e4e8',
  accent: '#2276fc',
})
`

const component = (i) => {
  const id = String(i).padStart(4, '0')
  return `import * as stylex from '@stylexjs/stylex'
import type {ReactNode} from 'react'

import {tokens} from './tokens.stylex'

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: ${i % 2 ? "'column'" : "'row'"},
    alignItems: 'center',
    gap: tokens.space2,
    padding: {default: tokens.space3, '@media (min-width: ${600 + (i % 7) * 40}px)': tokens.space4},
    borderRadius: tokens.radius2,
    backgroundColor: {default: tokens.bg, ':hover': tokens.bgHover, ':active': '#${((i * 2654435761) >>> 8).toString(16).padStart(6, '0').slice(0, 6)}'},
    color: tokens.fg,
    boxShadow: \`inset 0 0 0 1px \${tokens.border}\`,
    minHeight: ${24 + (i % 13) * 4},
    zIndex: ${i % 5},
    opacity: {default: 1, ':disabled': 0.${5 + (i % 4)}},
  },
  active: {
    backgroundColor: tokens.accent,
    color: '#fff',
    boxShadow: 'none',
  },
  label: {
    fontSize: tokens.fontSize1,
    lineHeight: tokens.lineHeight1,
    fontWeight: ${i % 3 === 0 ? 600 : 500},
    letterSpacing: '${(i % 4) * 0.01}em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  width: (width: number) => ({width}),
})

export function Component${id}(props: {active?: boolean; width?: number; children?: ReactNode}) {
  const {active = false, width, children} = props
  return (
    <div
      data-component="${id}"
      {...stylex.props(styles.root, active && styles.active, width != null && styles.width(width))}
    >
      <span {...stylex.props(styles.label)}>{children}</span>
    </div>
  )
}
`
}

export function generateSynthetic(n) {
  const dir = path.join(generatedDir, `synthetic-${n}`)
  const src = path.join(dir, 'src')
  fs.rmSync(dir, {recursive: true, force: true})
  fs.mkdirSync(src, {recursive: true})
  fs.writeFileSync(path.join(src, 'tokens.stylex.ts'), TOKENS)
  const exportsList = []
  for (let i = 0; i < n; i++) {
    const id = String(i).padStart(4, '0')
    fs.writeFileSync(path.join(src, `component-${id}.tsx`), component(i))
    exportsList.push(`export {Component${id}} from './component-${id}'`)
  }
  fs.writeFileSync(path.join(src, 'index.ts'), exportsList.join('\n') + '\n')
  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify(
      {
        name: `@sanity-eval/stylex-synthetic-${n}`,
        version: '1.0.0',
        type: 'module',
        private: true,
        exports: {'.': './dist/index.js', './styles.css': './dist/stylex.css'},
        dependencies: {'@stylexjs/stylex': '0.19.1'},
        peerDependencies: {react: '^19'},
      },
      null,
      2,
    ),
  )
  fs.writeFileSync(
    path.join(dir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          lib: ['ES2022', 'DOM'],
          module: 'ESNext',
          moduleResolution: 'bundler',
          jsx: 'react-jsx',
          strict: true,
          skipLibCheck: true,
          noEmit: true,
        },
        include: ['src'],
      },
      null,
      2,
    ),
  )
  // same plugin chain as the Button libraries; dts off so the measurement is
  // the JS + StyleX pipeline only
  fs.writeFileSync(
    path.join(dir, 'tsdown.config.ts'),
    `import {defineConfig} from 'tsdown'

import {stylexLibraryPlugins} from '${path.relative(dir, path.join(root, 'scripts', 'stylex-tsdown.mjs')).split(path.sep).join('/')}'

export default defineConfig({
  entry: ['./src/index.ts'],
  tsconfig: 'tsconfig.json',
  platform: 'neutral',
  dts: false,
  sourcemap: false,
  exports: false,
  publint: false,
  external: ['react', 'react/jsx-runtime', '@stylexjs/stylex'],
  outputOptions: {assetFileNames: '[name][extname]'},
  plugins: stylexLibraryPlugins({packageDir: import.meta.dirname}),
})
`,
  )
  return dir
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  for (const n of (process.argv[2] ?? '300,1000').split(',').map(Number)) {
    console.log(`✔ generated ${generateSynthetic(n)}`)
  }
}
