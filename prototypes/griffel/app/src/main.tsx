import {makeStyles} from '@griffel/react'
import * as v1 from 'griffel-button-v1'
import * as v2 from 'griffel-button-v2'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

// The app's own styles: compiled + extracted to CSS by @griffel/vite-plugin.
const useStyles = makeStyles({
  page: {
    fontFamily: v1.tokens['font-family'],
    paddingTop: '24px',
    paddingBottom: '24px',
    paddingLeft: '24px',
    paddingRight: '24px',
    display: 'grid',
    rowGap: '24px',
  },
  section: {
    paddingTop: '16px',
    paddingBottom: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
    borderRadius: '8px',
  },
  heading: {fontSize: '14px', fontWeight: '600', marginTop: '0', marginBottom: '12px'},
  matrix: {display: 'grid', rowGap: '12px'},
  row: {display: 'flex', alignItems: 'center', columnGap: '12px', flexWrap: 'wrap'},
  label: {width: '72px', fontSize: '12px', opacity: '0.7'},
  pair: {display: 'inline-flex', alignItems: 'center', columnGap: '4px'},
})

const tones = v1.buttonTones
const modes = v1.buttonModes

function Matrix({theme, title}: {theme: v1.Theme; title: string}) {
  const classes = useStyles()

  return (
    <v1.ThemeProvider theme={theme} className={classes.section}>
      <h2 className={classes.heading}>{title}</h2>
      <div className={classes.matrix}>
        {modes.map((mode) => (
          <div key={mode} className={classes.row} data-mode-row={mode}>
            <span className={classes.label}>mode={mode}</span>
            {tones.map((tone) => (
              <span key={tone} className={classes.pair}>
                <v1.Button tone={tone} mode={mode} text={`${tone} v1`} />
                <v2.Button tone={tone} mode={mode} text={`${tone} v2`} />
              </span>
            ))}
          </div>
        ))}
        <div className={classes.row} data-mode-row="states">
          <span className={classes.label}>states</span>
          <v1.Button tone="primary" text="selected v1" selected />
          <v2.Button tone="primary" text="selected v2" selected />
          <v1.Button tone="primary" text="disabled v1" disabled />
          <v2.Button tone="primary" text="disabled v2" disabled />
          <v1.Button tone="positive" text="width=200 v1" width={200} />
          <v2.Button tone="positive" text="width=200 v2" width={200} />
          <v1.Button
            tone="caution"
            text="consumer override v1"
            className={classes.heading}
            data-testid="override-v1"
          />
        </div>
        <div className={classes.row} data-mode-row="fill">
          <span className={classes.label}>fill</span>
          <v1.Button tone="default" mode="ghost" text="width=fill v1" width="fill" />
          <v2.Button tone="default" mode="ghost" text="width=fill v2" width="fill" />
        </div>
      </div>
    </v1.ThemeProvider>
  )
}

function App() {
  const classes = useStyles()

  return (
    <main className={classes.page}>
      <Matrix
        theme={v1.defaultTheme}
        title="defaultTheme — v1 (shared runtime) next to v2 (own runtime copy)"
      />
      <Matrix theme={v2.darkTheme} title="darkTheme — same page, same CSS-variable contract" />
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
