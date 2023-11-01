/* eslint-disable @typescript-eslint/no-explicit-any */

import {ReactElement} from 'react'
import styled from 'styled-components'
import {COLOR_BASE_TONES, COLOR_BUTTON_MODES, COLOR_STATE_TONES} from '../../constants'
import {ColorBaseTone, TMP_Theme} from '../../types'
import {theme} from './theme'

const Root = styled.div`
  background: #000;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 13px;
  line-height: 9px;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  user-select: none;

  pre {
    font: inherit;
    font-family: 'SF Mono', Menlo, monospace;
    margin: 0;
    padding: 0;
  }

  .button {
    background-color: var(--bg);
    color: var(--fg);
    box-shadow:
      inset 0 0 0 1px var(--border),
      0 1px 0 0 color-mix(in srgb, var(--border), transparent 75%);
    text-align: center;
    border-radius: 3px;
    font-weight: 500;
    cursor: default;
    transition: box-shadow 50ms ease-in-out;

    --bg: var(--button-enabled-bg);
    --fg: var(--button-enabled-fg);
    --border: var(--button-enabled-border);
    --bg2: var(--button-enabled-bg2);
    --muted-fg: var(--button-enabled-muted-fg);
  }

  .button:hover {
    --bg: var(--button-hovered-bg);
    --fg: var(--button-hovered-fg);
    --border: var(--button-hovered-border);
    --bg2: var(--button-hovered-bg2);
    --muted-fg: var(--button-hovered-muted-fg);
  }

  .button:focus {
    outline: none;
    box-shadow:
      inset 0 0 0 1px var(--border),
      0 0 0 1px var(--base-bg),
      0 0 0 3px var(--focus-ring);

    --bg: var(--button-hovered-bg);
    --fg: var(--button-hovered-fg);
    --border: var(--button-hovered-border);
    --bg2: var(--button-hovered-bg2);
    --muted-fg: var(--button-hovered-muted-fg);
  }

  .button:active {
    background-color: var(--button-pressed-bg);
    color: var(--button-pressed-fg);
    box-shadow: inset 0 0 0 1px var(--border);
    --border: var(--button-pressed-border);
    --bg2: var(--button-pressed-bg2);
    --muted-fg: var(--button-pressed-muted-fg);
  }

  .button.selected {
    background-color: var(--button-selected-bg);
    color: var(--button-selected-fg);
    box-shadow: inset 0 0 0 1px var(--border);
    --border: var(--button-selected-border);
    --bg2: var(--button-selected-bg2);
    --muted-fg: var(--button-selected-muted-fg);
  }

  .button.disabled {
    background-color: var(--button-disabled-bg);
    color: var(--button-disabled-fg);
    box-shadow: inset 0 0 0 1px var(--border);
    --border: var(--button-disabled-border);
    --bg2: var(--button-disabled-bg2);
    --muted-fg: var(--button-disabled-muted-fg);
  }
`

export default function BuildStory(): ReactElement {
  return (
    <Root>
      <div style={{display: 'flex'}}>
        <div style={{flex: 1}}>
          {COLOR_BASE_TONES.map((baseTone) => (
            <BaseTonePreview baseTone={baseTone} key={baseTone} scheme="light" theme={theme} />
          ))}
        </div>
        <div style={{flex: 1}}>
          {COLOR_BASE_TONES.map((baseTone) => (
            <BaseTonePreview baseTone={baseTone} key={baseTone} scheme="dark" theme={theme} />
          ))}
        </div>
      </div>
    </Root>
  )
}

function BaseTonePreview(props: {
  baseTone: ColorBaseTone
  scheme: 'light' | 'dark'
  theme: TMP_Theme
}) {
  const {baseTone, scheme, theme} = props
  const color = theme.color[scheme]

  return (
    <div
      style={
        {
          backgroundColor: 'var(--bg)',
          color: 'var(--fg)',

          '--base-bg': color[baseTone].base.bg,
          '--bg': 'var(--base-bg)',
          '--fg': color[baseTone].base.fg,
          '--border': color[baseTone].base.border,
          '--focus-ring': color[baseTone].base.focusRing,
          '--shadow-outline': color[baseTone].base.shadow.outline,
          '--shadow-umbra': color[baseTone].base.shadow.umbra,
          '--shadow-penumbra': color[baseTone].base.shadow.penumbra,
          '--shadow-ambient': color[baseTone].base.shadow.ambient,
          '--skeleton-from': color[baseTone].base.skeleton.from,
          '--skeleton-to': color[baseTone].base.skeleton.to,
        } as any
      }
    >
      <div style={{maxWidth: 320, margin: 'auto', padding: '20px 0'}}>
        <pre style={{padding: 12}}>
          color/{scheme}/{baseTone}
        </pre>
        <div style={{padding: 12}}>
          <div
            style={{
              boxShadow: [
                `0 0 0 1px var(--shadow-outline)`,
                `0 6px 8px -4px var(--shadow-umbra)`,
                `0 12px 17px 2px var(--shadow-penumbra)`,
                `0 5px 22px 4px var(--shadow-ambient)`,
              ].join(', '),
              padding: 12,
              borderRadius: 3,
            }}
          >
            Shadow
          </div>
        </div>
        <div style={{marginTop: 20, padding: '1px 12px 12px 12px'}}>
          {COLOR_BUTTON_MODES.map((mode) => (
            <div key={mode} style={{display: 'flex', flexDirection: 'column'}}>
              {COLOR_STATE_TONES.map((tone) => {
                const button = color[baseTone].button[tone][mode]

                return (
                  <div
                    key={tone}
                    style={
                      {
                        border: '1px solid var(--border)',
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: -1,

                        '--button-enabled-bg': button.enabled.bg,
                        '--button-enabled-bg2': button.enabled.bg2,
                        '--button-enabled-fg': button.enabled.fg,
                        '--button-enabled-border': button.enabled.border,
                        '--button-enabled-muted-fg': button.enabled.muted.fg,

                        '--button-hovered-bg': button.hovered.bg,
                        '--button-hovered-bg2': button.hovered.bg2,
                        '--button-hovered-fg': button.hovered.fg,
                        '--button-hovered-border': button.hovered.border,
                        '--button-hovered-muted-fg': button.hovered.muted.fg,

                        '--button-pressed-bg': button.pressed.bg,
                        '--button-pressed-bg2': button.pressed.bg2,
                        '--button-pressed-fg': button.pressed.fg,
                        '--button-pressed-border': button.pressed.border,
                        '--button-pressed-muted-fg': button.pressed.muted.fg,

                        '--button-selected-bg': button.selected.bg,
                        '--button-selected-bg2': button.selected.bg2,
                        '--button-selected-fg': button.selected.fg,
                        '--button-selected-border': button.selected.border,
                        '--button-selected-muted-fg': button.selected.muted.fg,

                        '--button-disabled-bg': button.disabled.bg,
                        '--button-disabled-bg2': button.disabled.bg2,
                        '--button-disabled-fg': button.disabled.fg,
                        '--button-disabled-border': button.disabled.border,
                        '--button-disabled-muted-fg': button.disabled.muted.fg,
                      } as any
                    }
                  >
                    <pre style={{padding: 8}}>{`mode="${mode}" tone="${tone}"`}</pre>
                    <div
                      style={{
                        display: 'flex',
                        gap: 4,
                      }}
                    >
                      <div
                        className="button"
                        style={{flex: 'none', padding: 8, display: 'flex', gap: 4}}
                        tabIndex={0}
                      >
                        <div style={{flex: 'none'}}>Button</div>
                        <div style={{flex: 'none', color: 'var(--muted-fg)'}}>m</div>
                        <div style={{flex: 'none'}}>
                          <div
                            style={{
                              width: 4,
                              height: 9,
                              backgroundColor: 'var(--button-enabled-bg2)',
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="button selected"
                        style={{flex: 'none', padding: 8, display: 'flex', gap: 4}}
                      >
                        <div style={{flex: 'none'}}>Button</div>
                        <div style={{flex: 'none', color: 'var(--muted-fg)'}}>m</div>
                        <div style={{flex: 'none'}}>
                          <div
                            style={{
                              width: 4,
                              height: 9,
                              backgroundColor: 'var(--bg2)',
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="button disabled"
                        style={{flex: 'none', padding: 8, display: 'flex', gap: 4}}
                      >
                        <div style={{flex: 'none'}}>Button</div>
                        <div style={{flex: 'none', color: 'var(--muted-fg)'}}>m</div>
                        <div style={{flex: 'none'}}>
                          <div
                            style={{
                              width: 4,
                              height: 9,
                              backgroundColor: 'var(--bg2)',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
