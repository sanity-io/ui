import {ArcadeState} from './types'

export const DEFAULT_CODE = `<Card padding={[4, 5, 6]}>
  <Stack gap={4}>
    <Heading as="h1">Sanity UI Arcade</Heading>
    <Text muted>Write some JSX to get started</Text>
  </Stack>
</Card>
`

export const INITIAL_STATE: ArcadeState = {
  jsxCode: '',
  jsxCursor: {anchor: 0, focus: 0},
  hookCode: '',
  hookCursor: {anchor: 0, focus: 0},
  canvasWidth: null,
  meta: {title: '', description: ''},
  codeMode: 'jsx',
}

export const SIZES = [320, 375, 768, 1024]
