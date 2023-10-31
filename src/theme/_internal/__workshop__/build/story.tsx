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
    background-color: var(--button-enabled-bg);
    color: var(--button-enabled-fg);
    box-shadow:
      inset 0 0 0 1px var(--border-color),
      0 1px 0 0 color-mix(in srgb, var(--border-color), transparent 75%);
    text-align: center;
    border-radius: 3px;
    font-weight: 500;
    cursor: default;
    transition: box-shadow 80ms ease-in-out;

    --border-color: var(--button-enabled-border);
  }

  .button:hover {
    background-color: var(--button-hovered-bg);
    color: var(--button-hovered-fg);
    --border-color: var(--button-hovered-border);
  }

  .button:active {
    background-color: var(--button-pressed-bg);
    color: var(--button-pressed-fg);
    --border-color: var(--button-pressed-border);
    box-shadow: inset 0 0 0 1px var(--border-color);
  }

  .button.selected {
    background-color: var(--button-selected-bg);
    color: var(--button-selected-fg);
    --border-color: var(--button-selected-border);
    box-shadow: inset 0 0 0 1px var(--border-color);
  }

  .button.disabled {
    background-color: var(--button-disabled-bg);
    color: var(--button-disabled-fg);
    --border-color: var(--button-disabled-border);
    box-shadow: inset 0 0 0 1px var(--border-color);
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
          backgroundColor: color[baseTone].base.bg,
          color: color[baseTone].base.fg,
          '--border-color': color[baseTone].base.border,
        } as any
      }
    >
      <div style={{maxWidth: 540, margin: 'auto', padding: '20px 0'}}>
        <pre style={{padding: 12}}>
          color/{scheme}/{baseTone}
        </pre>
        <div style={{padding: '1px 12px 12px 12px'}}>
          {COLOR_BUTTON_MODES.map((mode) => (
            <div key={mode} style={{display: 'flex', flexDirection: 'column'}}>
              {COLOR_STATE_TONES.map((tone) => {
                const button = color[baseTone].button[tone][mode]

                return (
                  <div
                    key={tone}
                    style={
                      {
                        border: '1px solid var(--border-color)',
                        padding: 4,
                        display: 'flex',
                        marginTop: -1,
                        gap: 4,

                        '--button-enabled-bg': button.enabled.bg,
                        '--button-enabled-fg': button.enabled.fg,
                        '--button-enabled-border': button.enabled.border,

                        '--button-hovered-bg': button.hovered.bg,
                        '--button-hovered-fg': button.hovered.fg,
                        '--button-hovered-border': button.hovered.border,

                        '--button-pressed-bg': button.pressed.bg,
                        '--button-pressed-fg': button.pressed.fg,
                        '--button-pressed-border': button.pressed.border,

                        '--button-selected-bg': button.selected.bg,
                        '--button-selected-fg': button.selected.fg,
                        '--button-selected-border': button.selected.border,

                        '--button-disabled-bg': button.disabled.bg,
                        '--button-disabled-fg': button.disabled.fg,
                        '--button-disabled-border': button.disabled.border,
                      } as any
                    }
                  >
                    <pre style={{flex: 2, padding: 8}}>{`mode="${mode}" tone="${tone}"`}</pre>
                    <div className="button" style={{flex: 'none', padding: 8}}>
                      Button
                    </div>
                    <div className="button selected" style={{flex: 'none', padding: 8}}>
                      Button
                    </div>
                    <div className="button disabled" style={{flex: 'none', padding: 8}}>
                      Button
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
