/* eslint-disable @typescript-eslint/no-explicit-any */

import {ReactElement} from 'react'
import {
  ThemeColor,
  ThemeColorButtonStates,
  ThemeColorCard,
  ThemeColorInputStates,
} from '../../../lib/theme'
import {
  COLOR_BASE_TONES,
  COLOR_BUTTON_MODES,
  COLOR_INPUT_MODES,
  COLOR_STATE_TONES,
} from '../../constants'
import {ColorBaseTone, ColorButtonMode, ColorInputMode, ColorStateTone} from '../../system'
import {Root} from './Root'
import {theme} from './theme'

export default function BuildStory(): ReactElement {
  return (
    <Root>
      <div style={{display: 'flex'}}>
        <div style={{flex: 1}}>
          {COLOR_BASE_TONES.map((baseTone) => (
            <BaseTonePreview
              baseTone={baseTone}
              key={baseTone}
              scheme="light"
              theme={theme.color.light[baseTone]}
            />
          ))}
        </div>
        <div style={{flex: 1}}>
          {COLOR_BASE_TONES.map((baseTone) => (
            <BaseTonePreview
              baseTone={baseTone}
              key={baseTone}
              scheme="dark"
              theme={theme.color.dark[baseTone]}
            />
          ))}
        </div>
      </div>
    </Root>
  )
}

function BaseTonePreview(props: {
  baseTone: ColorBaseTone
  scheme: 'light' | 'dark'
  theme: ThemeColor
}) {
  const {baseTone, scheme, theme: color} = props

  return (
    <div
      style={
        {
          backgroundColor: 'var(--bg)',
          color: 'var(--fg)',

          '--base-bg': color.base.bg,
          '--bg': 'var(--base-bg)',
          '--fg': color.base.fg,
          '--border': color.base.border,
          '--focus-ring': color.base.focusRing,
          '--shadow-outline': color.base.shadow.outline,
          '--shadow-umbra': color.base.shadow.umbra,
          '--shadow-penumbra': color.base.shadow.penumbra,
          '--shadow-ambient': color.base.shadow.ambient,
          '--skeleton-from': color.base.skeleton?.from,
          '--skeleton-to': color.base.skeleton?.to,
        } as any
      }
    >
      <div
        style={{
          maxWidth: 600,
          margin: 'auto',
          padding: '20px',
        }}
      >
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
        <div style={{padding: 12}}>
          <CardPreview theme={color.card} />
        </div>
        <div style={{padding: 12, display: 'flex', flexDirection: 'column', gap: 20}}>
          {COLOR_INPUT_MODES.map((mode) => (
            <InputPreview key={mode} mode={mode} theme={color.input[mode]} />
          ))}
        </div>
        <div style={{marginTop: 20, padding: '1px 12px 12px 12px'}}>
          {COLOR_BUTTON_MODES.map((mode) => (
            <div key={mode} style={{display: 'flex', flexDirection: 'column'}}>
              {COLOR_STATE_TONES.map((tone) => {
                return (
                  <ButtonPreview
                    key={tone}
                    mode={mode}
                    theme={color.button[mode][tone]}
                    tone={tone}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CardPreview(props: {theme: ThemeColorCard}) {
  const {theme: card} = props

  return (
    <div
      style={
        {
          // border: '1px solid var(--border)',
          // padding: 4,
          display: 'flex',
          flexDirection: 'column',
          marginTop: -1,

          '--card-enabled-bg': card.enabled.bg,
          '--card-enabled-bg2': card.enabled.bg2,
          '--card-enabled-fg': card.enabled.fg,
          '--card-enabled-border': card.enabled.border,
          '--card-enabled-muted-fg': card.enabled.muted.fg,

          '--card-hovered-bg': card.hovered.bg,
          '--card-hovered-bg2': card.hovered.bg2,
          '--card-hovered-fg': card.hovered.fg,
          '--card-hovered-border': card.hovered.border,
          '--card-hovered-muted-fg': card.hovered.muted.fg,

          '--card-pressed-bg': card.pressed.bg,
          '--card-pressed-bg2': card.pressed.bg2,
          '--card-pressed-fg': card.pressed.fg,
          '--card-pressed-border': card.pressed.border,
          '--card-pressed-muted-fg': card.pressed.muted.fg,

          '--card-selected-bg': card.selected.bg,
          '--card-selected-bg2': card.selected.bg2,
          '--card-selected-fg': card.selected.fg,
          '--card-selected-border': card.selected.border,
          '--card-selected-muted-fg': card.selected.muted.fg,

          '--card-disabled-bg': card.disabled.bg,
          '--card-disabled-bg2': card.disabled.bg2,
          '--card-disabled-fg': card.disabled.fg,
          '--card-disabled-border': card.disabled.border,
          '--card-disabled-muted-fg': card.disabled.muted.fg,
        } as any
      }
    >
      {/* <pre style={{padding: 8}}>{`mode="${mode}" tone="${tone}"`}</pre> */}
      <div
        style={{
          display: 'flex',
          gap: 4,
        }}
      >
        <div
          className="card"
          style={{flex: 'none', padding: 8, display: 'flex', gap: 4}}
          tabIndex={0}
        >
          <div style={{flex: 'none'}}>Card</div>
          <div style={{flex: 'none', color: 'var(--muted-fg)'}}>m</div>
          <div style={{flex: 'none'}}>
            <div
              style={{
                width: 4,
                height: 9,
                backgroundColor: 'var(--card-enabled-bg2)',
              }}
            />
          </div>
        </div>
        <div className="card selected" style={{flex: 'none', padding: 8, display: 'flex', gap: 4}}>
          <div style={{flex: 'none'}}>Card</div>
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
        <div className="card disabled" style={{flex: 'none', padding: 8, display: 'flex', gap: 4}}>
          <div style={{flex: 'none'}}>Card</div>
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
}

function ButtonPreview(props: {
  tone: ColorStateTone
  mode: ColorButtonMode
  theme: ThemeColorButtonStates
}) {
  const {tone, mode, theme: button} = props

  return (
    <div
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
}

function InputPreview(props: {mode: ColorInputMode; theme: ThemeColorInputStates}) {
  const {mode: _, theme: input} = props

  return (
    <div
      style={
        {
          display: 'flex',
          flexDirection: 'column',
          gap: 8,

          '--input-enabled-bg': input.enabled.bg,
          '--input-enabled-bg2': input.enabled.bg2,
          '--input-enabled-fg': input.enabled.fg,
          '--input-enabled-border': input.enabled.border,
          '--input-enabled-placeholder': input.enabled.placeholder,

          '--input-hovered-bg': input.hovered.bg,
          '--input-hovered-bg2': input.hovered.bg2,
          '--input-hovered-fg': input.hovered.fg,
          '--input-hovered-border': input.hovered.border,
          '--input-hovered-placeholder': input.hovered.placeholder,

          '--input-readOnly-bg': input.readOnly.bg,
          '--input-readOnly-bg2': input.readOnly.bg2,
          '--input-readOnly-fg': input.readOnly.fg,
          '--input-readOnly-border': input.readOnly.border,
          '--input-readOnly-placeholder': input.readOnly.placeholder,

          '--input-disabled-bg': input.disabled.bg,
          '--input-disabled-bg2': input.disabled.bg2,
          '--input-disabled-fg': input.disabled.fg,
          '--input-disabled-border': input.disabled.border,
          '--input-disabled-placeholder': input.disabled.placeholder,
        } as any
      }
    >
      <div className="input" tabIndex={0}>
        <span>Text</span> <span className="placeholder">Placeholder</span>
      </div>
      <div className="input readOnly" tabIndex={0}>
        <span>Text</span>
      </div>
      <div className="input disabled">
        <span>Text</span>
      </div>
    </div>
  )
}
