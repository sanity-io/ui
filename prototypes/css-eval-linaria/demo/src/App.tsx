import type {ComponentType, ReactNode} from 'react'

/** The subset of the library surface the demo needs, shared by v1 and v2. */
export interface ButtonLib {
  Button: ComponentType<{
    children?: ReactNode
    disabled?: boolean
    minWidth?: number
    mode?: string
    tone?: string
  }>
  themeDark: string
  themeLight: string
  version: string
  tones: string[]
}

const modes = ['default', 'ghost', 'bleed']

function Panel(props: {expected: string; id: string; lib: ButtonLib}) {
  const {expected, id, lib} = props
  const {Button} = lib

  return (
    <section data-testid={`${id}-panel`} style={{flex: 1, minWidth: 0}}>
      <h2 style={{font: '600 14px/1.2 system-ui', margin: '0 0 4px'}}>
        {id}: {lib.version}
      </h2>
      <p style={{font: '12px/1.4 system-ui', color: '#667', margin: '0 0 12px'}}>expected: {expected}</p>
      <div className={lib.themeLight} style={{padding: 12, borderRadius: 8}}>
        {modes.map((mode) => (
          <div key={mode} style={{display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap'}}>
            {lib.tones.map((tone) => (
              <Button key={tone} data-testid={`${id}-${tone}-${mode}`} mode={mode} tone={tone}>
                {tone}
              </Button>
            ))}
          </div>
        ))}
        <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
          <Button data-testid={`${id}-dynamic`} minWidth={160} tone="primary">
            minWidth=160 (dynamic)
          </Button>
          <Button data-testid={`${id}-disabled`} disabled tone="primary">
            disabled
          </Button>
        </div>
      </div>
      <div className={lib.themeDark} style={{padding: 12, borderRadius: 8, marginTop: 8}}>
        <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
          {lib.tones.map((tone) => (
            <Button key={tone} data-testid={`${id}-dark-${tone}-ghost`} mode="ghost" tone={tone}>
              {tone}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}

export function App(props: {flavor: string; v1: ButtonLib; v2: ButtonLib}) {
  const {flavor, v1, v2} = props

  return (
    <main style={{fontFamily: 'system-ui', padding: 16, maxWidth: 1400}}>
      <h1 style={{font: '600 18px/1.2 system-ui', margin: '0 0 4px'}}>
        Linaria class-name collision demo — flavor: <code>{flavor}</code>
      </h1>
      <p style={{font: '13px/1.4 system-ui', color: '#445', margin: '0 0 16px'}}>
        Both versions' stylesheets are loaded on this page (v1 first, then v2). Each panel must look
        like its own version: v1 has a blue primary and 6px corners, v2 has a purple primary, a red
        brand tone and pill corners.
      </p>
      <div style={{display: 'flex', gap: 24}}>
        <Panel expected="blue primary, 6px radius, 5 tones" id="v1" lib={v1} />
        <Panel expected="purple primary, red brand, pill radius, 6 tones" id="v2" lib={v2} />
      </div>
    </main>
  )
}
