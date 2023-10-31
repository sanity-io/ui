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
    font-family: 'SF Mono';
    margin: 0;
    padding: 0;
  }

  .button {
    background-color: var(--button-enabled-bg);
    color: var(--button-enabled-fg);
    text-align: center;
    border-radius: 3px;
    font-weight: 500;
    cursor: default;
  }

  .button:hover {
    background-color: var(--button-hovered-bg);
    color: var(--button-hovered-fg);
  }

  .button:active {
    background-color: var(--button-pressed-bg);
    color: var(--button-pressed-fg);
  }

  .button.selected {
    background-color: var(--button-selected-bg);
    color: var(--button-selected-fg);
  }

  .button.disabled {
    background-color: var(--button-disabled-bg);
    color: var(--button-disabled-fg);
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

                        '--button-hovered-bg': button.hovered.bg,
                        '--button-hovered-fg': button.hovered.fg,

                        '--button-pressed-bg': button.pressed.bg,
                        '--button-pressed-fg': button.pressed.fg,

                        '--button-selected-bg': button.selected.bg,
                        '--button-selected-fg': button.selected.fg,

                        '--button-disabled-bg': button.disabled.bg,
                        '--button-disabled-fg': button.disabled.fg,
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
