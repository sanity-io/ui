import {ThemeProvider, useTheme_v2} from '@sanity/ui'
import {useMemo} from 'react'
import {styled} from 'styled-components'

import {buildTheme} from '../theme/buildTheme'
import {BuildThemeOptions} from '../theme/options'

/**
 * The dark scheme covers the right side of the preview behind a diagonal cut,
 * like the "Auto" appearance preview in macOS System Settings shows both
 * schemes at once.
 */
const DARK_CLIP_PATH = 'polygon(58% 0, 100% 0, 100% 100%, 42% 100%)'

const Root = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`

/** The document rows in the list pane — the widths of their title lines */
const LIST_ROWS = ['62%', '46%', '70%', '52%']

/** The fields in the document form — the widths of their labels */
const FIELDS = ['32%', '24%']

/** The thickness of a line of text — bold enough to survive a half-size preview */
const LINE = 4

/**
 * A tiny, lo-fi mockup of a Studio in the given theme — the navbar over the
 * structure tool with a list of documents on the left and a document form on
 * the right — in both color schemes at once: the light scheme on the left and
 * the dark scheme on the right, split diagonally. It only paints colors the
 * theme options change (backgrounds, text, borders, the accent) so that a
 * glance shows what the theme does to the Studio — with few and bold enough
 * elements to still read when scaled down to a thumbnail.
 *
 * @internal
 */
export function ThemePreview(props: {options: BuildThemeOptions}) {
  const {options} = props
  const theme = useMemo(() => buildTheme(options), [options])

  return (
    <Root aria-hidden>
      <ThemeProvider scheme="light" theme={theme} tone="default">
        <MockStudio />
      </ThemeProvider>
      <ThemeProvider scheme="dark" theme={theme} tone="default">
        <MockStudio style={{clipPath: DARK_CLIP_PATH}} />
      </ThemeProvider>
    </Root>
  )
}

function MockStudio(props: {style?: React.CSSProperties}) {
  const {color} = useTheme_v2()
  const primary = color.button.default.primary.enabled
  const selected = color.selectable.default.selected
  const input = color.input.default.enabled
  const border = `1px solid ${color.border}`

  const line = (width: string, background: string): React.CSSProperties => ({
    flex: 'none',
    width,
    height: LINE,
    borderRadius: LINE / 2,
    background,
  })

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: color.bg,
        ...props.style,
      }}
    >
      <div
        style={{
          flex: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          height: '18%',
          padding: '0 5%',
          borderBottom: border,
        }}
      >
        <div style={{flex: 'none', width: 8, height: 8, borderRadius: 2, background: primary.bg}} />
        <div style={line('22%', color.fg)} />
        <div style={{flex: 1}} />
        <div
          style={{
            flex: 'none',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: color.avatar.blue.bg,
          }}
        />
      </div>

      <div style={{flex: 1, display: 'flex', minHeight: 0}}>
        <div
          style={{
            flex: 'none',
            display: 'flex',
            flexDirection: 'column',
            width: '36%',
            borderRight: border,
          }}
        >
          {LIST_ROWS.map((width, index) => {
            const isSelected = index === 1

            return (
              <div
                key={width}
                style={{
                  flex: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  height: '18%',
                  padding: '0 9%',
                  background: isSelected ? selected.bg : undefined,
                }}
              >
                <div style={line(width, isSelected ? selected.fg : color.muted.fg)} />
              </div>
            )
          })}
        </div>

        <div style={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0}}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 7,
              padding: '9% 8% 0',
              minHeight: 0,
              overflow: 'hidden',
            }}
          >
            <div style={line('45%', color.fg)} />
            {FIELDS.map((width) => (
              <div
                key={width}
                style={{flex: 'none', display: 'flex', flexDirection: 'column', gap: 3}}
              >
                <div style={line(width, color.muted.fg)} />
                <div
                  style={{
                    height: 12,
                    borderRadius: 3,
                    background: input.bg,
                    boxShadow: `inset 0 0 0 1px ${input.border}`,
                  }}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              flex: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: '20%',
              padding: '0 8%',
              borderTop: border,
            }}
          >
            <div style={{width: '32%', height: '50%', borderRadius: 3, background: primary.bg}} />
          </div>
        </div>
      </div>
    </div>
  )
}
