import {Box, Card, Flex, PortalProvider} from '@sanity/ui'
import React, {useState} from 'react'
import styled from 'styled-components'
import {Canvas} from './canvas'
import {CodeEditor} from './codeEditor'
import {useIDE} from './useIDE'

const Root = styled(Card)`
  height: 100%;
`

const CanvasBox = styled(Box)`
  position: relative;
`

export default function ArcadeApp() {
  const {code, cursor, handleCatch, handleCursorChange, handleKeyDown, result, write} = useIDE()
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <Root onKeyDown={handleKeyDown}>
      <Flex style={{height: '100%'}}>
        <PortalProvider element={portalElement}>
          <CanvasBox flex={1}>
            <Canvas onCatch={handleCatch} result={result} />
            <div data-portal ref={setPortalElement} />
          </CanvasBox>
        </PortalProvider>

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
