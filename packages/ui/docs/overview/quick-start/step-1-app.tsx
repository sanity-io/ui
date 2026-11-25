import {Box, Flex, Heading, SkipToContent} from '@sanity/ui'
// src/App.tsx, after step 1
import {useState} from 'react'

export default function App() {
  const [sidebarOpen] = useState(true)

  return (
    <Flex flexWrap="wrap" minHeight="100vh">
      <SkipToContent href="#main-content" label="Skip to content" />
      {sidebarOpen && (
        <Box
          as="nav"
          aria-label="Main navigation"
          borderRight={[false, false, false, true]}
          flexBasis={['100%', '100%', '100%', '260px']}
          flexShrink={0}
        >
          <Box padding={3}>
            <Heading as="h2" size={1}>
              Studio
            </Heading>
          </Box>
        </Box>
      )}

      <Flex
        as="main"
        id="main-content"
        tabIndex={-1}
        flexBasis={['100%', '100%', '100%', '0']}
        flexDirection="column"
        flexGrow={1}
        minWidth="0"
        overflow="hidden"
      >
        <Box padding={3} borderBottom>
          <Heading as="h1">All Documents</Heading>
        </Box>
      </Flex>
    </Flex>
  )
}
