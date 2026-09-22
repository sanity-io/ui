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
  aspect-ratio: 16 / 10;
  overflow: hidden;
`

/** The document rows in the list pane — the widths of their title lines */
const LIST_ROWS = ['58%', '44%', '66%', '50%', '60%', '40%']

/** The fields in the document form — the widths of their labels and their heights */
const FIELDS: Array<[label: string, height: number]> = [
  ['28%', 10],
  ['20%', 10],
  ['34%', 18],
]

/**
 * A tiny, lo-fi mockup of a Studio in the given theme — the navbar over the
 * structure tool with a list of documents on the left and a document form on
 * the right — in both color schemes at once: the light scheme on the left and
 * the dark scheme on the right, split diagonally. It only paints colors the
 * theme options change (backgrounds, text, borders, the accent) so that a
 * glance shows what the theme does to the Studio.
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
  const ghost = color.button.ghost.default.enabled
  const selected = color.selectable.default.selected
  const input = color.input.default.enabled
  const border = `1px solid ${color.border}`

  const line = (width: string, background: string): React.CSSProperties => ({
    flex: 'none',
    width,
    height: 3,
    borderRadius: 2,
    background,
  })

  const paneHeader: React.CSSProperties = {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '13%',
    padding: '0 7%',
    borderBottom: border,
  }

  const icon: React.CSSProperties = {width: 3, height: 3, borderRadius: 1, background: color.icon}

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
          gap: 4,
          height: '15%',
          padding: '0 4%',
          borderBottom: border,
        }}
      >
        <div style={{flex: 'none', width: 7, height: 7, borderRadius: 2, background: primary.bg}} />
        <div style={line('17%', color.fg)} />
        <div
          style={{
            flex: 1,
            height: 8,
            margin: '0 4%',
            borderRadius: 3,
            background: input.bg,
            boxShadow: `inset 0 0 0 1px ${input.border}`,
          }}
        />
        <div
          style={{
            flex: 'none',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: color.avatar.magenta.bg,
          }}
        />
        <div
          style={{
            flex: 'none',
            width: 8,
            height: 8,
            marginLeft: -7,
            borderRadius: '50%',
            background: color.avatar.blue.bg,
            boxShadow: `0 0 0 1px ${color.bg}`,
          }}
        />
      </div>

      <div style={{flex: 1, display: 'flex', minHeight: 0}}>
        <div
          style={{
            flex: 'none',
            display: 'flex',
            flexDirection: 'column',
            width: '38%',
            borderRight: border,
          }}
        >
          <div style={paneHeader}>
            <div style={line('45%', color.fg)} />
            <div style={icon} />
          </div>
          {LIST_ROWS.map((width, index) => {
            const isSelected = index === 1

            return (
              <div
                key={width}
                style={{
                  flex: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  height: '12%',
                  padding: '0 7%',
                  background: isSelected ? selected.bg : undefined,
                }}
              >
                <div
                  style={{
                    flex: 'none',
                    width: 7,
                    height: 7,
                    borderRadius: 2,
                    background: isSelected ? selected.muted.fg : color.skeleton.from,
                  }}
                />
                <div style={line(width, isSelected ? selected.fg : color.muted.fg)} />
              </div>
            )
          })}
        </div>

        <div style={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0}}>
          <div style={paneHeader}>
            <div style={line('40%', color.fg)} />
            <div style={icon} />
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 7,
              padding: '7% 7% 0',
              minHeight: 0,
              overflow: 'hidden',
            }}
          >
            {FIELDS.map(([label, height]) => (
              <div
                key={label}
                style={{flex: 'none', display: 'flex', flexDirection: 'column', gap: 3}}
              >
                <div style={line(label, color.fg)} />
                <div
                  style={{
                    height,
                    borderRadius: 2,
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
              gap: 4,
              height: '16%',
              padding: '0 7%',
              borderTop: border,
            }}
          >
            <div
              style={{
                width: '18%',
                height: 8,
                borderRadius: 2,
                background: ghost.bg,
                boxShadow: `inset 0 0 0 1px ${ghost.border}`,
              }}
            />
            <div style={{width: '26%', height: 8, borderRadius: 2, background: primary.bg}} />
          </div>
        </div>
      </div>
    </div>
  )
}
