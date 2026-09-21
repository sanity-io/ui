import {type ReactNode, useEffect, useState} from 'react'

import './record.css'

const STAGE_WIDTH = 640
const STAGE_HEIGHT = 360

// 10px cells divide both 320×180 tiles, so a centered spinner sits on a grid
// intersection. Major lines every fifth cell read as a blueprint sheet.
const BLUEPRINT_STYLE = {
  backgroundImage: [
    'linear-gradient(to right, color-mix(in srgb, #2f6fed 42%, transparent) 1px, transparent 1px)',
    'linear-gradient(to bottom, color-mix(in srgb, #2f6fed 42%, transparent) 1px, transparent 1px)',
    'linear-gradient(to right, color-mix(in srgb, #2f6fed 78%, transparent) 1px, transparent 1px)',
    'linear-gradient(to bottom, color-mix(in srgb, #2f6fed 78%, transparent) 1px, transparent 1px)',
  ].join(','),
  backgroundPosition: '0 0',
  backgroundSize: '10px 10px, 10px 10px, 50px 50px, 50px 50px',
} as const

type Scheme = 'light' | 'dark'

interface CardProps {
  children?: ReactNode
  height?: 'fill'
  scheme?: Scheme
  style?: React.CSSProperties
  tone?: 'transparent'
}

interface FlexProps {
  align?: 'center'
  children?: ReactNode
  gap?: number
  height?: 'fill'
  justify?: 'center'
  padding?: number
}

interface SpinnerProps {
  size?: number
}

interface TextProps {
  children?: ReactNode
  size?: number
}

interface AutocompleteProps {
  fontSize?: number
  gap?: number
  icon?: ReactNode
  id: string
  padding?: number
  radius?: number
  tabIndex?: number
  value?: string
}

export interface SceneProps<TTheme> {
  Autocomplete: (props: AutocompleteProps) => React.JSX.Element
  Card: (props: CardProps) => React.JSX.Element
  Flex: (props: FlexProps) => React.JSX.Element
  Spinner: (props: SpinnerProps) => React.JSX.Element
  Text: (props: TextProps) => React.JSX.Element
  ThemeProvider: (props: {children?: ReactNode; theme: TTheme}) => React.JSX.Element
  theme: TTheme
  version: 'before' | 'after'
}

function readScale(native: boolean): number {
  if (native || typeof window === 'undefined') return 1

  const dpr = window.devicePixelRatio || 1
  const raw = Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT)

  return Math.max(1 / dpr, Math.floor(raw * dpr) / dpr)
}

function LoadingTile({
  Card,
  Flex,
  Spinner,
  Text,
  scheme,
}: {
  Card: SceneProps<unknown>['Card']
  Flex: SceneProps<unknown>['Flex']
  Spinner: SceneProps<unknown>['Spinner']
  Text: SceneProps<unknown>['Text']
  scheme: Scheme
}) {
  return (
    <Card height="fill" scheme={scheme} style={BLUEPRINT_STYLE} tone="transparent">
      <Flex align="center" gap={4} height="fill" justify="center">
        <Spinner size={2} />
        <Text size={2}>Loading...</Text>
      </Flex>
    </Card>
  )
}

function SearchTile({
  Autocomplete,
  Card,
  Flex,
  Spinner,
  scheme,
}: {
  Autocomplete: SceneProps<unknown>['Autocomplete']
  Card: SceneProps<unknown>['Card']
  Flex: SceneProps<unknown>['Flex']
  Spinner: SceneProps<unknown>['Spinner']
  scheme: Scheme
}) {
  return (
    <Card height="fill" scheme={scheme} tone="transparent">
      <Flex align="center" height="fill" justify="center" padding={4}>
        <div className="search">
          <Autocomplete
            fontSize={1}
            gap={4}
            icon={<Spinner size={1} />}
            id={`searching-${scheme}`}
            padding={4}
            radius={2}
            tabIndex={-1}
            value="Searching..."
          />
        </div>
      </Flex>
    </Card>
  )
}

export function Scene<TTheme>({
  Autocomplete,
  Card,
  Flex,
  Spinner,
  Text,
  ThemeProvider,
  theme,
  version,
}: SceneProps<TTheme>) {
  const native = new URLSearchParams(window.location.search).has('native')
  const [scale, setScale] = useState(() => readScale(native))

  useEffect(() => {
    document.title = version === 'before' ? 'Before · @sanity/ui 4.2.0' : 'After · @sanity/ui 4.2.1'

    if (native) return undefined

    const fit = () => setScale(readScale(false))

    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [native, version])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'a') {
        window.location.href = `/after.html${window.location.search}`
      } else if (event.key === 'b') {
        window.location.href = `/before.html${window.location.search}`
      } else if (event.key === 'f') {
        if (document.fullscreenElement) {
          void document.exitFullscreen()
        } else {
          void document.documentElement.requestFullscreen()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="viewport">
      <div
        className="stage"
        data-spinner-demo={version}
        style={{
          height: STAGE_HEIGHT,
          transform: `scale(${scale})`,
          width: STAGE_WIDTH,
        }}
      >
        <ThemeProvider theme={theme}>
          <div className="tiles">
            <LoadingTile Card={Card} Flex={Flex} scheme="dark" Spinner={Spinner} Text={Text} />
            <SearchTile
              Autocomplete={Autocomplete}
              Card={Card}
              Flex={Flex}
              scheme="light"
              Spinner={Spinner}
            />
            <LoadingTile Card={Card} Flex={Flex} scheme="light" Spinner={Spinner} Text={Text} />
            <SearchTile
              Autocomplete={Autocomplete}
              Card={Card}
              Flex={Flex}
              scheme="dark"
              Spinner={Spinner}
            />
          </div>
        </ThemeProvider>
      </div>
    </div>
  )
}
