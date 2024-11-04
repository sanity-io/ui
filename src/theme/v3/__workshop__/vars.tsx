import {Box, Code} from '@sanity/ui'
import {buildThemeEntries_v3, THEME_COLOR_CARD_TONES, THEME_COLOR_SCHEMES} from '@sanity/ui/theme'
import {ReactElement, useMemo} from 'react'
import {styled} from 'styled-components'
// import {buildTheme_v3} from '../buildTheme_v3'

const Swatch = styled.div`
  padding: 20px;
  overflow: hidden;

  & [data-ui='Code'] {
    color: inherit;
    opacity: 0;
  }
`

export default function VarsStory(): ReactElement {
  // const tokens = useMemo(() => resolveTokens(), [])
  const style = useMemo(
    () =>
      Object.fromEntries(
        buildThemeEntries_v3({
          color: {
            '*': {
              bg: {
                1: ['950', '50'],
                2: ['900', '100'],
                3: ['800', '200'],
                4: ['700', '300'],
              },
              tinted: {
                '*': {
                  bg: {
                    1: ['900', '100'],
                    2: ['800', '200'],
                    3: ['700', '300'],
                    4: ['600', '400'],
                  },
                },
              },
              solid: {
                '*': {
                  bg: {
                    1: ['500', '500'],
                    2: ['400', '600'],
                    3: ['300', '700'],
                    4: ['200', '800'],
                  },
                  fg: {
                    1: ['black', 'white'],
                    2: ['950', '50'],
                    3: ['900', '100'],
                    4: ['800', '200'],
                  },
                },
              },
            },
            'transparent': {
              bg: {
                1: ['black', '50'],
                2: ['950', '100'],
                3: ['900', '200'],
                4: ['800', '300'],
              },
            },
            'default': {
              bg: {
                1: ['950', 'white'],
                2: ['900', '50'],
                3: ['800', '100'],
                4: ['700', '200'],
              },
              tinted: {
                '*': {
                  bg: {
                    1: ['900', '50'],
                    2: ['800', '100'],
                    3: ['700', '200'],
                    4: ['600', '300'],
                  },
                },
              },
            },
            // 'transparent': {
            //   bg: {
            //     1: ['black', '50'],
            //     2: ['950', '100'],
            //     3: ['900', '200'],
            //     4: ['800', '300'],
            //   },
            // },
            'primary': {
              _hue: 'purple',
            },
            'positive': {
              _hue: 'cyan',
            },
            'caution': {
              _hue: 'yellow',
            },
            'critical': {
              _hue: 'red',
            },
          },
        }),
      ),
    [],
  )

  // const themeEntries = useMemo(
  //   () => getThemeEntries(tokens.color as unknown as Record<string, unknown>),
  //   [tokens],
  // )

  // const themeProps = useMemo(() => Object.fromEntries(themeEntries.dark), [themeEntries])

  return (
    <div style={style}>
      {/* <ElementPreview prefix={`--color-dark-default`} /> */}
      {THEME_COLOR_SCHEMES.map((scheme) => (
        <Box display="flex" key={scheme} style={{border: '2px solid green'}}>
          {THEME_COLOR_CARD_TONES.map((cardTone) => (
            <Box direction="column" display="flex" key={cardTone}>
              <ElementPreview prefix={`--color-${scheme}-${cardTone}`} />
              <ElementPreview prefix={`--color-${scheme}-${cardTone}-tinted-default`} />
              <ElementPreview prefix={`--color-${scheme}-${cardTone}-solid-default`} />
            </Box>
          ))}
        </Box>
      ))}
      {/* <ElementPreview prefix={`--color-light-primary`} />
      <ElementPreview prefix={`--color-light-primary-solid-default`} /> */}
      {/* <div style={{color: 'var(--color-light-default-fg-1)'}}>
        <Swatch style={{backgroundColor: 'var(--color-light-default-bg-1)'}}>bg-1</Swatch>
        <Swatch style={{backgroundColor: 'var(--color-light-default-bg-2)'}}>bg-2</Swatch>
        <Swatch style={{backgroundColor: 'var(--color-light-default-bg-3)'}}>bg-3</Swatch>
        <Swatch style={{backgroundColor: 'var(--color-light-default-bg-4)'}}>bg-4</Swatch>
      </div> */}
    </div>
  )
}

function ElementPreview(props: {prefix: `--${string}`}) {
  const {prefix} = props

  return (
    <div style={{color: `var(${prefix}-fg-1)`}}>
      <Swatch style={{backgroundColor: `var(${prefix}-bg-1)`}}>
        <Code size={1}>{`${prefix}-bg-1`}</Code>
      </Swatch>
      <Swatch style={{backgroundColor: `var(${prefix}-bg-2)`}}>
        <Code size={1}>{`${prefix}-bg-2`}</Code>
      </Swatch>
      <Swatch style={{backgroundColor: `var(${prefix}-bg-3)`}}>
        <Code size={1}>{`${prefix}-bg-3`}</Code>
      </Swatch>
      <Swatch style={{backgroundColor: `var(${prefix}-bg-4)`}}>
        <Code size={1}>{`${prefix}-bg-4`}</Code>
      </Swatch>
    </div>
  )
}
