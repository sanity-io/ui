import {Box, Card, Flex} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'
import {Canvas} from './canvas'
import {CodeEditor} from './codeEditor'
import {useIDE} from './useIDE'

const Root = styled(Card)`
  height: 100%;
`

export default function ArcadeApp() {
  const {code, cursor, handleCatch, handleCursorChange, handleKeyDown, result, write} = useIDE()

  return (
    <Root onKeyDown={handleKeyDown}>
      <Flex style={{height: '100%'}}>
        <Box flex={1}>
          <Canvas onCatch={handleCatch} result={result} />
        </Box>

        <Card borderLeft flex={1}>
          <CodeEditor
            code={code}
            cursor={cursor}
            onCodeChange={write}
            onCursorChange={handleCursorChange}
          />
        </Card>
      </Flex>
    </Root>
  )
}
