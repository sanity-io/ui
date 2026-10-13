import * as V1 from '@sanity-eval/panda-button-v1'
import * as V2 from '@sanity-eval/panda-button-v2'
import type {ReactNode} from 'react'

type Lib = typeof V1 | typeof V2

const schemes = ['light', 'dark'] as const

/**
 * One section per library version. Every element carries a `data-testid`
 * (`<v>-<scheme>-<tone>-<mode>`, `<v>-dynamic`, `<v>-themed`, `<v>-badge`,
 * `<v>-unprovided-primary`) so `scripts/browser-proof.mjs` can assert its
 * computed styles against what THAT version's source declares.
 */
function VersionSection({lib, id}: {lib: Lib; id: 'v1' | 'v2'}): ReactNode {
  const {Badge, Button, ThemeProvider, VERSION, buttonModes, tones} = lib
  return (
    <section className="version" data-version={VERSION}>
      <h2>
        {id} = <code>@sanity-eval/panda-button-{id}@{VERSION}</code> (stylesheet loaded{' '}
        {id === 'v1' ? 'first' : 'last'})
      </h2>
      <div className="rows">
        {schemes.map((scheme) => (
          <ThemeProvider key={scheme} scheme={scheme}>
            <div className="scheme">
              <p className="caption">
                scheme={scheme} · tone × mode
              </p>
              <div className="grid">
                {tones.map((tone) =>
                  buttonModes.map((mode) => (
                    <Button key={`${tone}-${mode}`} tone={tone} mode={mode} data-testid={`${id}-${scheme}-${tone}-${mode}`}>
                      {tone} / {mode}
                    </Button>
                  )),
                )}
              </div>
            </div>
          </ThemeProvider>
        ))}
        <ThemeProvider scheme="light">
          <div className="scheme">
            <p className="caption">dynamic styles (inline CSS variables)</p>
            <div className="grid" style={{gridTemplateColumns: 'auto'}}>
              <Button tone="positive" width={240} radius="full" data-testid={`${id}-dynamic`}>
                width=240 radius=full
              </Button>
              <Button tone="critical" mode="ghost" width="100%" radius={0} data-testid={`${id}-dynamic-2`}>
                width=100% radius=0
              </Button>
            </div>
          </div>
        </ThemeProvider>
        <ThemeProvider
          scheme="light"
          theme={{'tone.primary.bg': '#8e44ad', 'tone.primary.bgHover': '#6c3483', 'tone.primary.fg': '#ffffff'}}
        >
          <div className="scheme">
            <p className="caption">runtime theme override (purple primary)</p>
            <Button tone="primary" data-testid={`${id}-themed`}>
              themed primary
            </Button>
          </div>
        </ThemeProvider>
      </div>
      <div className="pitfalls">
        <p>
          <strong>Negative control (config recipe):</strong>{' '}
          <Badge tone="primary" data-testid={`${id}-badge`}>
            badge {VERSION}
          </Badge>{' '}
          — name-addressed classes, expected to collide across versions.
        </p>
        <p>
          <strong>Token default without ThemeProvider:</strong>{' '}
          <Button tone="primary" data-testid={`${id}-unprovided-primary`}>
            primary (no provider)
          </Button>{' '}
          — reads <code>--sui-v4-colors-tone-primary-bg</code> from <code>:root</code>, where the last loaded stylesheet
          wins.
        </p>
      </div>
    </section>
  )
}

export function App(): ReactNode {
  return (
    <main>
      <h1>Panda CSS 2.x eval: two versions of one library on one page</h1>
      <p>
        Both sections are rendered by their own package build (<code>dist/index.js</code> +{' '}
        <code>dist/styles.css</code>). v2 changed padding, radius, gap, font-weight, hover styles, declaration order
        and the primary token default.
      </p>
      <VersionSection lib={V1} id="v1" />
      <VersionSection lib={V2} id="v2" />
    </main>
  )
}
