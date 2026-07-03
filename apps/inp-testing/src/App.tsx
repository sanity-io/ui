import {Box, Card, Heading, HStack, VStack} from '@sanity-labs/ui-poc'
import {NavLink, Outlet} from 'react-router'

function App() {
  return (
    <Box padding={4}>
      <VStack gap={4}>
        <Heading>INP Testing</Heading>

        <Card>
          <HStack gap={3}>
            <NavLink to="/">UI POC</NavLink>
            <NavLink to="/ui3">UI 3</NavLink>
          </HStack>
        </Card>

        <Outlet />
      </VStack>
    </Box>
  )
}

export default App
