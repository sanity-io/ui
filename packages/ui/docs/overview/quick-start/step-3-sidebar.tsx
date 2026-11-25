import {AddIcon} from '@sanity/icons/Add'
import {CloseIcon} from '@sanity/icons/Close'
import {MenuIcon} from '@sanity/icons/Menu'
import {Box, Button, Flex, Heading, IconButton, Link, SkipToContent, VStack} from '@sanity/ui'
// src/App.tsx, after step 3
import {useState} from 'react'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
          overflowY="auto"
        >
          <VStack>
            <Box padding={3} borderBottom>
              <Flex alignItems="center" justifyContent="space-between">
                <Heading as="h2" size={1}>
                  Studio
                </Heading>
                <IconButton
                  level="tertiary"
                  icon={CloseIcon}
                  aria-label="Close navigation"
                  onClick={() => setSidebarOpen(false)}
                />
              </Flex>
            </Box>
            <Box padding={3}>
              <VStack gap={3}>
                <Link href="/documents" underlined={false}>
                  Documents
                </Link>
                <Link href="/authors" underlined={false}>
                  Authors
                </Link>
                <Link href="/settings" underlined={false}>
                  Settings
                </Link>
              </VStack>
            </Box>
          </VStack>
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
          <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
            <Flex alignItems="center" gap={3} minWidth="0">
              {!sidebarOpen && (
                <IconButton
                  level="tertiary"
                  icon={MenuIcon}
                  aria-label="Show navigation"
                  onClick={() => setSidebarOpen(true)}
                />
              )}
              <Heading truncate={1} as="h1">
                All Documents
              </Heading>
            </Flex>
            <Button text="New document" iconStart={AddIcon} />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}
