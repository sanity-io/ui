import {Box, Card, Container, Grid, Heading, Stack, Text} from '@sanity/ui'
import Link from 'next/link'
import React from 'react'

export function ScreenHeroSection({data}: {data: any}) {
  return (
    <>
      <Card flex={1} paddingX={[3, 4, 5]} paddingY={[6, 7, 8]}>
        <Container width={0}>
          <Stack space={[3, 4, 5]} style={{textAlign: 'center'}}>
            <Heading size={[3, 3, 4]}>{data.headline}</Heading>
            {data.copy && (
              <Text muted size={[2, 2, 3]} weight="medium">
                {data.copy}
              </Text>
            )}
          </Stack>
        </Container>

        {data.linksHeader && (
          <Box marginTop={[5, 6, 7]} style={{textAlign: 'center'}}>
            <Heading accent size={[1, 1, 2]}>
              {data.linksHeader}
            </Heading>
          </Box>
        )}

        {data.links && (
          <Container width={2}>
            <Box marginTop={[4, 5, 6]}>
              <Grid columns={[1, 2, 3]} gap={[3, 4, 5]}>
                {data.links.map((link: any) => (
                  <Link href={link.href ? link.href : '/docs'} key={link._key} passHref>
                    <Card as="a" border padding={4} radius={3}>
                      <Stack space={3}>
                        <Heading size={1}>{link.title || <em>Untitled</em>}</Heading>
                        {link.subtitle && (
                          <Text muted size={2}>
                            {link.subtitle}
                          </Text>
                        )}
                      </Stack>
                    </Card>
                  </Link>
                ))}
              </Grid>
            </Box>
          </Container>
        )}
      </Card>
    </>
  )
}
