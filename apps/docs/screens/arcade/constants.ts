import {ArcadeState} from './types'

export const DEFAULT_CODE = `<Card height="fill" padding={[3, 4, 5, 6]} sizing="border">
  <Heading as="h1">Welcome to Sanity UI</Heading>
</Card>
`

export const INITIAL_STATE: ArcadeState = {
  jsxCode: '',
  jsxCursor: {line: 0, column: 0},
  hookCode: '',
  hookCursor: {line: 0, column: 0},
  canvasWidth: null,
  meta: {title: '', description: ''},
  codeMode: 'jsx',
}

export const SIZES = [320, 375, 768, 1024]
