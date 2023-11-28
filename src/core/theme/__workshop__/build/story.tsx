/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ThemeColor,
  ThemeColorButtonStates,
  ThemeColorCard,
  ThemeColorInputStates,
} from '@sanity/ui/theme'
import {
  COLOR_BASE_TONES,
  COLOR_BUTTON_MODES,
  COLOR_INPUT_MODES,
  COLOR_STATE_TONES,
  ColorBaseTone,
  ColorInputMode,
} from '@sanity/ui/theme'
import {studioTheme} from '@sanity/ui/theme'
import {ReactElement} from 'react'
import {rem} from '../../../styles'
import {useTheme} from '../../useTheme'
import {getCSSProps} from './helpers'
import {Root} from './Root'

const theme = studioTheme

export default function BuildStory(): ReactElement {
  return (
    <Root>
      <div
        style={{
          display: 'flex',
          ...getCSSProps({
            radius: theme.radius.map((r) => rem(r)),
            shadows: theme.shadows.map((s) =>
              s
                ? {
                    umbra: s.umbra.join(' '),
                    penumbra: s.penumbra.join(' '),
                    ambient: s.ambient.join(' '),
                  }
                : {},
            ),
            space: theme.space.map((s) => rem(s)),
          }),
        }}
      >
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
  const theme = useTheme()

  return (
    <div className="base" style={getCSSProps(color.base as unknown as Record<string, unknown>)}>
      <div
        style={{
          maxWidth: 600,
          margin: 'auto',
          padding: 'var(--space-4)',
        }}
      >
        <pre style={{padding: 12}}>
          color/{scheme}/{baseTone}
        </pre>
        <div style={{padding: 12}}>
          <div
            style={{
              boxShadow: [
                `0 0 0 ${theme.sanity.card.shadow.outline}px var(--shadow-outline)`,
                `0 6px 8px -4px var(--shadow-umbra)`,
                `0 12px 17px 2px var(--shadow-penumbra)`,
                `0 5px 22px 4px var(--shadow-ambient)`,
              ].join(', '),
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-2)',
            }}
          >
            Shadow
          </div>
        </div>
        <div style={{padding: 'var(--space-3)'}}>
          <CardPreview theme={color.card} />
        </div>
        <div
          style={{
            padding: 'var(--space-3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          {COLOR_INPUT_MODES.map((mode) => (
            <InputPreview key={mode} mode={mode} theme={color.input[mode]} />
          ))}
        </div>
        <div
          style={{
            marginTop: 'var(--space-4)',
            padding: '1px 12px 12px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          {COLOR_BUTTON_MODES.map((mode) => (
            <div
              key={mode}
              style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-1)'}}
            >
              {COLOR_STATE_TONES.map((tone) => {
                return <ButtonPreview key={tone} theme={color.button[mode][tone]} />
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
          ...getCSSProps({card}),

          display: 'flex',
          flexDirection: 'column',
          marginTop: -1,
        } as any
      }
    >
      <div
        style={{
          display: 'flex',
          gap: 4,
        }}
      >
        <div
          className="card"
          style={{
            flex: 1,
            padding: 'var(--space-2)',
            display: 'flex',
            gap: 'var(--space-1)',
          }}
          tabIndex={0}
        >
          <div style={{flex: 'none'}}>Card</div>
          <div className="icon" style={{flex: 'none'}}>
            &copy;
          </div>
          <div className="muted-fg" style={{flex: 'none'}}>
            m
          </div>
          <div className="accent-fg" style={{flex: 'none'}}>
            a
          </div>
          <div className="link-fg" style={{flex: 'none'}}>
            l
          </div>
          <div className="code" style={{flex: 'none'}}>
            c
          </div>
          <div style={{flex: 'none'}}>
            <CheckeredBackground />
          </div>
          <div style={{flex: 'none'}}>
            <Skeleton />
          </div>
        </div>
        <div
          className="card selected"
          style={{
            flex: 1,
            padding: 'var(--space-2)',
            display: 'flex',
            gap: 4,
          }}
        >
          <div style={{flex: 'none'}}>Card</div>
          <div className="icon" style={{flex: 'none'}}>
            &copy;
          </div>
          <div className="muted-fg" style={{flex: 'none'}}>
            m
          </div>
          <div className="accent-fg" style={{flex: 'none'}}>
            a
          </div>
          <div className="link-fg" style={{flex: 'none'}}>
            l
          </div>
          <div className="code" style={{flex: 'none'}}>
            c
          </div>
          <div style={{flex: 'none'}}>
            <CheckeredBackground />
          </div>
          <div style={{flex: 'none'}}>
            <Skeleton />
          </div>
        </div>
        <div
          className="card disabled"
          style={{
            flex: 1,
            padding: 'var(--space-2)',
            display: 'flex',
            gap: 4,
          }}
        >
          <div style={{flex: 'none'}}>Card</div>
          <div className="icon" style={{flex: 'none'}}>
            &copy;
          </div>
          <div className="muted-fg" style={{flex: 'none'}}>
            m
          </div>
          <div className="accent-fg" style={{flex: 'none'}}>
            a
          </div>
          <div className="link-fg" style={{flex: 'none'}}>
            l
          </div>
          <div className="code" style={{flex: 'none'}}>
            c
          </div>
          <div style={{flex: 'none'}}>
            <CheckeredBackground />
          </div>
          <div style={{flex: 'none'}}>
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  )
}

function ButtonPreview(props: {
  // tone: ColorStateTone
  // mode: ColorButtonMode
  theme: ThemeColorButtonStates
}) {
  const {theme: button} = props

  return (
    <div
      style={{
        ...getCSSProps({button}),

        display: 'flex',
        gap: 4,
      }}
    >
      <div
        className="button"
        style={{flex: 1, padding: 'var(--space-2)', display: 'flex', gap: 4}}
        tabIndex={0}
      >
        <div style={{flex: 'none'}}>Button</div>
        <div className="icon" style={{flex: 'none'}}>
          &copy;
        </div>
        <div className="muted-fg" style={{flex: 'none'}}>
          m
        </div>
        <div className="accent-fg" style={{flex: 'none'}}>
          a
        </div>
        <div className="link-fg" style={{flex: 'none'}}>
          l
        </div>
        <div className="code" style={{flex: 'none'}}>
          c
        </div>
        <div style={{flex: 'none'}}>
          <CheckeredBackground />
        </div>
        <div style={{flex: 'none'}}>
          <Skeleton />
        </div>
      </div>
      <div
        className="button selected"
        style={{flex: 1, padding: 'var(--space-2)', display: 'flex', gap: 4}}
      >
        <div style={{flex: 'none'}}>Button</div>
        <div className="icon" style={{flex: 'none'}}>
          &copy;
        </div>
        <div className="muted-fg" style={{flex: 'none'}}>
          m
        </div>
        <div className="accent-fg" style={{flex: 'none'}}>
          a
        </div>
        <div className="link-fg" style={{flex: 'none'}}>
          l
        </div>
        <div className="code" style={{flex: 'none'}}>
          c
        </div>
        <div style={{flex: 'none'}}>
          <CheckeredBackground />
        </div>
        <div style={{flex: 'none'}}>
          <Skeleton />
        </div>
      </div>
      <div
        className="button disabled"
        style={{flex: 1, padding: 'var(--space-2)', display: 'flex', gap: 4}}
      >
        <div style={{flex: 'none'}}>Button</div>
        <div className="icon" style={{flex: 'none'}}>
          &copy;
        </div>
        <div className="muted-fg" style={{flex: 'none'}}>
          m
        </div>
        <div className="accent-fg" style={{flex: 'none'}}>
          a
        </div>
        <div className="link-fg" style={{flex: 'none'}}>
          l
        </div>
        <div className="code" style={{flex: 'none'}}>
          c
        </div>
        <div style={{flex: 'none'}}>
          <CheckeredBackground />
        </div>
        <div style={{flex: 'none'}}>
          <Skeleton />
        </div>
      </div>
    </div>
  )
}

function CheckeredBackground() {
  return (
    <div className="border" style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex'}}>
        <div
          style={{
            width: 8,
            height: 8,
          }}
        />
        <div
          className="bg2"
          style={{
            width: 8,
            height: 8,
          }}
        />
      </div>
      <div style={{display: 'flex'}}>
        <div
          className="bg2"
          style={{
            width: 8,
            height: 8,
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
          }}
        />
      </div>
    </div>
  )
}

function Skeleton() {
  return (
    <div className="border" style={{display: 'flex'}}>
      <div
        className="skeleton-from"
        style={{
          width: 8,
          height: 16,
        }}
      />
      <div
        className="skeleton-to"
        style={{
          width: 8,
          height: 16,
        }}
      />
    </div>
  )
}

function InputPreview(props: {mode: ColorInputMode; theme: ThemeColorInputStates}) {
  const {mode, theme: input} = props

  return (
    <div
      style={
        {
          ...getCSSProps({input}),

          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        } as any
      }
    >
      <div className="input" tabIndex={0}>
        <span>Text ({mode})</span> <span className="placeholder">Placeholder</span>
      </div>
      <div className="input readOnly" tabIndex={0}>
        <span>Text ({mode})</span>
      </div>
      <div className="input disabled">
        <span>Text ({mode})</span>
      </div>
    </div>
  )
}
