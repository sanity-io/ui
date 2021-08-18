import {Box, Container, Flex, Heading} from '@sanity/ui'
import Image from 'next/image'
import React from 'react'
import judges404Image from '../../public/images/judges-404@2x.png'

export function NotFoundScreen() {
  return (
    <Flex align="center" height="fill" justify="center">
      <Container padding={4} width={1}>
        <Image aria-hidden layout="responsive" src={judges404Image} />
        <Box marginTop={[3, 4, 5]}>
          <Heading align="center" as="h1" size={[2, 2, 3, 4]}>
            Page not found
          </Heading>
        </Box>
      </Container>
    </Flex>
  )
}
