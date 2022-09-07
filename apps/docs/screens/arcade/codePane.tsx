import {Card, Flex, Tab, TabList, TabPanel} from '@sanity/ui'
import {ArcadeCodeMode} from './types'
import {AsyncCodeEditor, Cursor} from '$lib/ide'

export function CodePane(props: {
  jsxCode: string
  jsxCursor: Cursor
  mode: ArcadeCodeMode
  onJSXCodeChange: (newCode: string) => void
  onJSXCursorChange: (cursor: Cursor) => void
  onModeChange: (mode: ArcadeCodeMode) => void
  onHookCodeChange: (newCode: string) => void
  onHookCursorChange: (cursor: Cursor) => void
  hookCode: string
  hookCursor: Cursor
}) {
  const {
    jsxCode,
    jsxCursor,
    mode,
    onJSXCodeChange,
    onJSXCursorChange,
    onModeChange,
    onHookCodeChange,
    onHookCursorChange,
    hookCode,
    hookCursor,
  } = props

  return (
    <Flex direction="column" height="fill">
      <Card borderBottom padding={2} style={{minHeight: 'auto'}}>
        <TabList space={1}>
          <Tab
            aria-controls="mode-jsx-panel"
            fontSize={1}
            id="mode-jsx-tab"
            onClick={() => onModeChange('jsx')}
            padding={2}
            selected={mode === 'jsx'}
            style={{verticalAlign: 'top'}}
            label="JSX"
          />
          <Tab
            aria-controls="mode-hook-panel"
            fontSize={1}
            id="mode-hook-tab"
            onClick={() => onModeChange('hook')}
            padding={2}
            selected={mode === 'hook'}
            style={{verticalAlign: 'top'}}
            label="Hook"
          />
        </TabList>
      </Card>

      <TabPanel
        aria-labelledby="mode-jsx-tab"
        flex={1}
        id="mode-jsx-panel"
        hidden={mode !== 'jsx'}
        style={{outline: 'none', position: 'relative'}}
      >
        {mode === 'jsx' && (
          <AsyncCodeEditor
            code={jsxCode}
            cursor={jsxCursor}
            key="jsx"
            language="jsx"
            onCodeChange={onJSXCodeChange}
            onCursorChange={onJSXCursorChange}
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
          />
        )}
      </TabPanel>

      <TabPanel
        aria-labelledby="mode-hook-tab"
        flex={1}
        id="mode-hook-panel"
        hidden={mode !== 'hook'}
        style={{outline: 'none', position: 'relative'}}
      >
        {mode === 'hook' && (
          <AsyncCodeEditor
            code={hookCode}
            cursor={hookCursor}
            key="hook"
            language="javascript"
            onCodeChange={onHookCodeChange}
            onCursorChange={onHookCursorChange}
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
          />
        )}
      </TabPanel>
    </Flex>
  )
}
