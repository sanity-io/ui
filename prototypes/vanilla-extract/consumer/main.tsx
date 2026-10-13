import type {ComponentType, ReactNode} from 'react'
import {createRoot} from 'react-dom/client'

// The two releases' built output (`node scripts/build.mjs`). The page loads BOTH stylesheets,
// 1.0.0 first, then 2.0.0 — the situation a Studio is in when two @sanity/ui versions end up
// in one bundle, or when the module CDN serves JS and CSS from different releases.
const styles = import.meta.glob<string>('../lib-*/dist/*/styles.css', {query: '?raw', import: 'default'})
const modules = import.meta.glob<ButtonModule>('../lib-*/dist/*/index.js')

interface ButtonModule {
  Button: ComponentType<{
    tone?: 'default' | 'primary' | 'positive' | 'caution' | 'critical'
    mode?: 'default' | 'ghost' | 'bleed'
    accent?: string
    loading?: boolean
    children?: ReactNode
  }>
  button: {classNames: {base: string; variants: Record<string, Record<string, string>>}}
  lightTheme: string
  darkTheme: string
  loadingBox: string
  VERSION: string
}

const TONES = ['default', 'primary', 'positive', 'caution', 'critical'] as const
const MODES = ['default', 'ghost', 'bleed'] as const
const NAMING_MODES = ['default', 'version', 'version+module'] as const
type NamingMode = (typeof NAMING_MODES)[number]

const params = new URLSearchParams(location.search)
const namingMode = (params.get('mode') ?? 'version') as NamingMode
if (!NAMING_MODES.includes(namingMode)) {
  throw new Error(`?mode must be one of ${NAMING_MODES.join(', ')}`)
}

async function loadRelease(lib: 'lib-v1' | 'lib-v2'): Promise<ButtonModule> {
  const css = await styles[`../${lib}/dist/${namingMode}/styles.css`]!()
  const style = document.createElement('style')
  style.dataset['release'] = lib
  style.textContent = css
  document.head.append(style)
  return modules[`../${lib}/dist/${namingMode}/index.js`]!()
}

function Release({mod}: {mod: ButtonModule}) {
  const {Button, button, lightTheme, darkTheme, VERSION} = mod
  const classNames = [
    button.classNames.base,
    ...Object.values(button.classNames.variants).flatMap((group) => Object.values(group)),
    lightTheme,
    darkTheme,
    mod.loadingBox,
  ]
  return (
    <section data-release={VERSION}>
      <h2>
        @css-eval/ve-button <code>{VERSION}</code>
      </h2>
      {(
        [
          ['light', lightTheme, '#fff', '#1f2126'],
          ['dark', darkTheme, '#121417', '#f2f3f5'],
        ] as const
      ).map(([name, themeClass, bg, fg]) => (
        <div key={name} className={`panel ${themeClass}`} data-theme={name} style={{background: bg, color: fg}}>
          <h3>{name} theme</h3>
          <div className="grid">
            {TONES.map((tone) =>
              MODES.map((mode) => (
                <Button key={`${tone}-${mode}`} tone={tone} mode={mode}>
                  {tone} / {mode}
                </Button>
              )),
            )}
          </div>
          <div className="row">
            <Button tone="primary" loading>
              loading
            </Button>
            <Button tone="primary" accent="magenta">
              accent (dynamic var)
            </Button>
          </div>
        </div>
      ))}
      <div className="classes">{classNames.join(' ')}</div>
    </section>
  )
}

async function main() {
  const v1 = await loadRelease('lib-v1')
  const v2 = await loadRelease('lib-v2')
  const root = createRoot(document.getElementById('root')!)
  root.render(
    <>
      <header>
        <h1>Two releases of one vanilla-extract library on one page</h1>
        <div>
          identifiers mode: <code data-naming-mode={namingMode}>{namingMode}</code> — stylesheets loaded in order:
          1.0.0, then 2.0.0
        </div>
      </header>
      <main>
        <Release mod={v1} />
        <Release mod={v2} />
      </main>
    </>,
  )
  // Signal readiness after React has committed and styles are applied.
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  document.body.dataset['ready'] = 'true'
}

void main()
