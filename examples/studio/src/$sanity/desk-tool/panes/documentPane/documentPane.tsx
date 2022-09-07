import {Box, Flex} from '@sanity/ui'
import {useState} from 'react'
import styled from 'styled-components'
import {ChangesPanel} from './changesPanel'
import {DocumentPanel} from './documentPanel'

const Root = styled(Flex)`
  height: 100%;
`

export function DocumentPane() {
  const [changesOpen, setChangesOpen] = useState(false)
  const handleChangesOpen = () => setChangesOpen(true)
  const handleChangesClose = () => setChangesOpen(false)

  return (
    <Root>
      <Box flex={2}>
        <DocumentPanel onChangeOpen={handleChangesOpen} />
      </Box>

      {changesOpen && (
        <Box flex={1}>
          <ChangesPanel onClose={handleChangesClose} />
        </Box>
      )}
    </Root>
  )
}
