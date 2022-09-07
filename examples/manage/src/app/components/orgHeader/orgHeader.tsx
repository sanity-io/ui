import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  // VariantProvider
} from '@sanity/ui'
import styled from 'styled-components'
import {OrganizationTabs} from './tabs'

const TabsContainer = styled.div`
  white-space: nowrap;
  overflow: auto;
`

export function OrgHeader() {
  return (
    <>
      {/* <VariantProvider> */}
      <Card>
        <Container width={3}>
          <Box padding={4} paddingY={[4, 5, 6]}>
            <Flex align="center">
              <Box paddingRight={5}>
                <Card radius={4} style={{width: 100, height: 100}} tone="transparent" />
              </Box>
              <Box flex={1}>
                <Stack space={4}>
                  <Heading size={4}>Sanity.io</Heading>
                  <Text>21 projects</Text>
                </Stack>
              </Box>
            </Flex>
          </Box>
        </Container>
      </Card>
      {/* </VariantProvider> */}

      <Card shadow={1} style={{position: 'sticky', zIndex: 1, top: 75}}>
        <TabsContainer>
          <Container width={3}>
            <Box paddingX={4} paddingY={3}>
              <OrganizationTabs />
            </Box>
          </Container>
        </TabsContainer>
      </Card>
    </>
  )
}
