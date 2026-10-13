import * as stylex from '@stylexjs/stylex'
import {
  Button as ButtonV1,
  type ButtonMode,
  type ButtonProps as ButtonPropsV1,
  type ButtonTone,
  darkTheme as darkThemeV1,
  VERSION as VERSION_V1,
} from 'stylex-button-v1'
import {tokens as tokensV1} from 'stylex-button-v1/tokens.stylex'
import {
  Button as ButtonV2,
  type ButtonProps as ButtonPropsV2,
  darkTheme as darkThemeV2,
  VERSION as VERSION_V2,
} from 'stylex-button-v2'
import type {ComponentType} from 'react'

const MODES: ButtonMode[] = ['default', 'ghost', 'bleed']
const TONES: ButtonTone[] = ['default', 'primary', 'positive', 'caution', 'critical']

// A consumer-defined theme over the *published* v1 token group. The app's
// compiler resolves `stylex-button-v1/tokens.stylex` to the same variable
// identities the library CSS declares (see scripts/stylex-options.mjs).
const brandTheme = stylex.createTheme(tokensV1, {
  primaryFill: '#ff3399',
  primaryFillHover: '#e61e85',
  primaryFillActive: '#c40f6d',
  primaryOnFill: '#ffffff',
  primaryBorder: '#ff3399',
})

const app = stylex.create({
  page: {
    fontFamily: 'system-ui, sans-serif',
    padding: 24,
    margin: 0,
    color: '#121923',
  },
  h1: {fontSize: 20, margin: 0, marginBottom: 4},
  sub: {fontSize: 13, color: '#6e7683', marginTop: 0, marginBottom: 20},
  columns: {display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start'},
  card: {
    borderRadius: 6,
    padding: 16,
    boxShadow: 'inset 0 0 0 1px #e3e4e8',
    backgroundColor: '#fff',
  },
  cardDark: {backgroundColor: '#13141b', color: '#e6e8ee'},
  h2: {fontSize: 14, margin: 0, marginBottom: 12},
  row: {display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8, alignItems: 'center'},
  label: {width: 56, fontSize: 11, color: '#6e7683', flexShrink: 0},
  fillBox: {width: 300, marginTop: 8},
})

type AnyButton = ComponentType<ButtonPropsV1 | ButtonPropsV2>

function Matrix(props: {version: 'v1' | 'v2'; Button: AnyButton; prefix?: string}) {
  const {version, Button, prefix = ''} = props
  const id = (name: string) => `${version}-${prefix}${name}`
  return (
    <>
      {MODES.map((mode) => (
        <div key={mode} {...stylex.props(app.row)}>
          <span {...stylex.props(app.label)}>{mode}</span>
          {TONES.map((tone) => (
            <Button key={tone} data-testid={id(`${mode}-${tone}`)} mode={mode} text={tone} tone={tone} />
          ))}
        </div>
      ))}
      <div {...stylex.props(app.row)}>
        <span {...stylex.props(app.label)}>states</span>
        <Button data-testid={id('selected')} selected text="selected" />
        <Button data-testid={id('disabled')} disabled text="disabled" tone="primary" />
        <Button data-testid={id('dynamic')} text="width 180" width={180} />
        <Button data-testid={id('radius')} radius={3} text="radius 3" />
        <Button data-testid={id('padding')} padding={1} text="padding 1" />
        {version === 'v2' && (
          <ButtonV2 data-testid={id('loading')} loading text="loading" tone="positive" />
        )}
      </div>
      <div {...stylex.props(app.fillBox)}>
        <Button data-testid={id('fill')} text="width fill" width="fill" />
      </div>
    </>
  )
}

export function App() {
  return (
    <main {...stylex.props(app.page)}>
      <h1 {...stylex.props(app.h1)}>
        @sanity-eval/stylex-button {VERSION_V1} and {VERSION_V2} on one page
      </h1>
      <p {...stylex.props(app.sub)}>
        Both precompiled stylesheets are loaded (order:{' '}
        <code data-testid="sheet-order">{document.documentElement.dataset.sheetOrder}</code>). v2
        changed token defaults (padding 12→14px, radius 3→4px, weight 500→600), added a style key
        before <code>root</code> and reordered its style groups.
      </p>
      <div {...stylex.props(app.columns)}>
        <section {...stylex.props(app.card)}>
          <h2 {...stylex.props(app.h2)}>v1 — light</h2>
          <Matrix version="v1" Button={ButtonV1} />
        </section>
        <section {...stylex.props(app.card)}>
          <h2 {...stylex.props(app.h2)}>v2 — light</h2>
          <Matrix version="v2" Button={ButtonV2} />
        </section>
        <section {...stylex.props(app.card, app.cardDark, darkThemeV1)}>
          <h2 {...stylex.props(app.h2)}>v1 — darkTheme (createTheme)</h2>
          <Matrix version="v1" Button={ButtonV1} prefix="dark-" />
        </section>
        <section {...stylex.props(app.card, app.cardDark, darkThemeV2)}>
          <h2 {...stylex.props(app.h2)}>v2 — darkTheme (createTheme)</h2>
          <Matrix version="v2" Button={ButtonV2} prefix="dark-" />
        </section>
        <section {...stylex.props(app.card, brandTheme)}>
          <h2 {...stylex.props(app.h2)}>v1 — consumer brandTheme (compiled in the app)</h2>
          <Matrix version="v1" Button={ButtonV1} prefix="brand-" />
        </section>
      </div>
    </main>
  )
}
