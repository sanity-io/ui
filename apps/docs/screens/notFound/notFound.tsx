import {Box, Container, Flex, Heading, useTheme} from '@sanity/ui'
import Image from 'next/image'
import React from 'react'
import {basePath} from '$config'

export function NotFoundScreen() {
  const {color} = useTheme().sanity

  return (
    <Flex align="center" height="fill" justify="center">
      <Container padding={4} width={1}>
        {!color.dark && (
          <Image
            aria-hidden
            src={`${basePath}/images/judges-404@2x.png`}
            width="1253"
            height="681"
          />
        )}

        <Box marginTop={[3, 4, 5]}>
          <Heading align="center" as="h1" size={[2, 2, 3, 4]}>
            Page not found
          </Heading>
        </Box>
      </Container>
    </Flex>
  )
}
