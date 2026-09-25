import {ThemeProvider, useTheme_v2} from '@sanity/ui'
import {type ThemeColorSchemeKey} from '@sanity/ui/theme'
import {assignInlineVars} from '@vanilla-extract/dynamic'
import {useMemo} from 'react'

import {buildTheme} from '../theme/buildTheme'
import {BuildThemeOptions} from '../theme/options'

import {
  avatar,
  body,
  button,
  colors,
  field,
  footer,
  form,
  input,
  line,
  list,
  listRow,
  logo,
  navbar,
  pane,
  root,
  spacer,
  studio,
} from './ThemePreview.css'

/** The document rows in the list pane — the widths of their title lines */
const LIST_ROWS = ['62%', '46%', '70%', '52%']

/** The fields in the document form — the widths of their labels */
const FIELDS = ['32%', '24%']

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
    <div aria-hidden className={root}>
      <ThemeProvider scheme="light" theme={theme} tone="default">
        <MockStudio scheme="light" />
      </ThemeProvider>
      <ThemeProvider scheme="dark" theme={theme} tone="default">
        <MockStudio scheme="dark" />
      </ThemeProvider>
    </div>
  )
}

function MockStudio(props: {scheme: ThemeColorSchemeKey}) {
  const {scheme} = props
  const {color} = useTheme_v2()
  const selected = color.selectable.default.selected
  const inputColor = color.input.default.enabled

  return (
    <div
      className={studio[scheme]}
      style={assignInlineVars({
        [colors.bg]: color.bg,
        [colors.fg]: color.fg,
        [colors.mutedFg]: color.muted.fg,
        [colors.border]: color.border,
        [colors.accent]: color.button.default.primary.enabled.bg,
        [colors.avatar]: color.avatar.blue.bg,
        [colors.selectedBg]: selected.bg,
        [colors.selectedFg]: selected.fg,
        [colors.inputBg]: inputColor.bg,
        [colors.inputBorder]: inputColor.border,
      })}
    >
      <div className={navbar}>
        <div className={logo} />
        <div className={line.fg} style={{width: '22%'}} />
        <div className={spacer} />
        <div className={avatar} />
      </div>

      <div className={body}>
        <div className={list}>
          {LIST_ROWS.map((width, index) => {
            const isSelected = index === 1

            return (
              <div className={listRow} data-selected={isSelected} key={width}>
                <div className={isSelected ? line.selected : line.muted} style={{width}} />
              </div>
            )
          })}
        </div>

        <div className={pane}>
          <div className={form}>
            <div className={line.fg} style={{width: '45%'}} />
            {FIELDS.map((width) => (
              <div className={field} key={width}>
                <div className={line.muted} style={{width}} />
                <div className={input} />
              </div>
            ))}
          </div>
          <div className={footer}>
            <div className={button} />
          </div>
        </div>
      </div>
    </div>
  )
}
