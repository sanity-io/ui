import {Box, Card, Grid, PortalProvider} from '@sanity/ui'
import React, {useState} from 'react'
import {Canvas} from './canvas'
import {CodeEditor} from './codeEditor'
import {useIDE} from './useIDE'

export default function ArcadeApp() {
  const {code, cursor, handleCatch, handleCursorChange, handleKeyDown, result, write} = useIDE()
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <Grid columns={[1, 1, 2]} height="fill" onKeyDown={handleKeyDown} rows={[2, 2, 1]}>
      <Box height="fill" style={{position: 'relative'}}>
        <PortalProvider element={portalElement}>
          <Canvas onCatch={handleCatch} result={result} />
        </PortalProvider>
        <div data-portal ref={setPortalElement} />
      </Box>

      <Card
        height="fill"
        borderLeft={[false, false, true]}
        borderTop={[true, true, false]}
        flex={1}
      >
        <CodeEditor
          code={code}
          cursor={cursor}
          onCodeChange={write}
          onCursorChange={handleCursorChange}
        />
      </Card>
    </Grid>
  )
}
