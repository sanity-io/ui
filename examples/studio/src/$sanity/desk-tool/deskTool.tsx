import {Box, Flex} from '@sanity/ui'
import styled from 'styled-components'
import {DocumentPane, DocumentTypeListPane, RootPane} from './panes'

const Root = styled(Flex)`
  height: 100%;

  @media (max-width: 639px) {
    & > :not(:last-child) {
      display: none;
    }
  }

  @media (min-width: 640px) {
    & > * + * {
      border-left: 1px solid var(--card-hairline-soft-color);
    }
  }
`

export function DeskTool() {
  return (
    <Root>
      <Box flex={1} style={{maxWidth: 300}}>
        <RootPane />
      </Box>
      <Box flex={1} style={{maxWidth: 300}}>
        <DocumentTypeListPane />
      </Box>
      <Box flex={2}>
        <DocumentPane />
      </Box>
    </Root>
  )
}
