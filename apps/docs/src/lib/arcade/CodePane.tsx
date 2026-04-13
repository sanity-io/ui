import {Card, Flex, Tab, TabList, TabPanel} from '@sanity/ui'
import {ReactElement} from 'react'

import {CodeEditor, CodeEditorSelection} from '@/lib/codeEditor'

import {ArcadeCodeMode} from './types'

export function CodePane(props: {
  jsxCode: string
  jsxCursor: CodeEditorSelection
  mode: ArcadeCodeMode
  onJSXCodeChange: (newCode: string) => void
  onJSXCursorChange: (cursor: CodeEditorSelection) => void
  onModeChange: (mode: ArcadeCodeMode) => void
  onHookCodeChange: (newCode: string) => void
  onHookCursorChange: (cursor: CodeEditorSelection) => void
  hookCode: string
  hookCursor: CodeEditorSelection
}): ReactElement {
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
    <Flex direction="column" height="fill" overflow="hidden">
      <Card padding={2} shadow={1} style={{minHeight: 'auto', zIndex: 2}}>
        <TabList autoActivate gap={1}>
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
        style={{outline: 'none'}}
      >
        {mode === 'jsx' && (
          <CodeEditor
            border={false}
            selection={jsxCursor}
            flex={1}
            focusRing={false}
            height="fill"
            onChange={onJSXCodeChange}
            onSelectionChange={onJSXCursorChange}
            value={jsxCode}
          />
        )}
      </TabPanel>

      <TabPanel
        aria-labelledby="mode-hook-tab"
        flex={1}
        id="mode-hook-panel"
        hidden={mode !== 'hook'}
        style={{outline: 'none'}}
      >
        {mode === 'hook' && (
          <CodeEditor
            border={false}
            selection={hookCursor}
            flex={1}
            focusRing={false}
            height="fill"
            onChange={onHookCodeChange}
            onSelectionChange={onHookCursorChange}
            value={hookCode}
          />
        )}
      </TabPanel>
    </Flex>
  )
}
