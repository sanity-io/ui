import type {ComponentType, ReactNode} from 'react'

/** The subset of a library version's exports the showcase renders */
export interface UiLib {
  VERSION: string
  Button: ComponentType<{
    tone?: (typeof TONES)[number]
    mode?: (typeof MODES)[number]
    text?: ReactNode
    icon?: ReactNode
    selected?: boolean
    disabled?: boolean
    loading?: boolean
    width?: 'fill'
    padding?: 0 | 1 | 2 | 3 | 4 | 5
    radius?: 0 | 1 | 2 | 3
    'data-testid'?: string
  }>
  ThemeProvider: ComponentType<{scheme?: 'light' | 'dark'; children?: ReactNode}>
}

export const TONES = ['default', 'primary', 'positive', 'caution', 'critical'] as const
export const MODES = ['default', 'ghost', 'bleed'] as const

const PlusIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M10 4v12M4 10h12" />
  </svg>
)

export function Showcase({lib, id}: {lib: UiLib; id: string}) {
  const {Button, ThemeProvider, VERSION} = lib
  return (
    <section data-testid={`${id}-section`} data-version={VERSION} className="showcase">
      <h2>
        <code>{id}</code> — ui v{VERSION}
      </h2>
      {(['light', 'dark'] as const).map((scheme) => (
        <ThemeProvider key={scheme} scheme={scheme}>
          <div className="matrix">
            {MODES.map((mode) => (
              <div className="row" key={mode}>
                <span className="label">{mode}</span>
                {TONES.map((tone) => (
                  <Button
                    key={tone}
                    data-testid={`${id}-${scheme}-${tone}-${mode}`}
                    tone={tone}
                    mode={mode}
                    text={tone}
                    icon={tone === 'primary' ? <PlusIcon /> : undefined}
                  />
                ))}
              </div>
            ))}
            <div className="row">
              <span className="label">states</span>
              <Button data-testid={`${id}-${scheme}-selected`} tone="primary" selected text="selected" />
              <Button data-testid={`${id}-${scheme}-disabled`} tone="primary" disabled text="disabled" />
              <Button data-testid={`${id}-${scheme}-loading`} tone="primary" loading text="loading" />
              <Button
                data-testid={`${id}-${scheme}-padding`}
                tone="positive"
                padding={1}
                radius={0}
                text="padding 1, radius 0"
              />
              <Button data-testid={`${id}-${scheme}-fill`} tone="caution" width="fill" text="width fill" />
            </div>
          </div>
        </ThemeProvider>
      ))}
    </section>
  )
}
