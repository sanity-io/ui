'use client'

import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Inline,
  Stack,
  Text,
  useTheme_v2,
} from '@sanity/ui'
import {stegaClean} from 'next-sanity'
import Link from 'next/link'
import {ReactElement} from 'react'
import {styled} from 'styled-components'

import {imageUrlBuilder} from '#lib/sanity/image.ts'
import type {TargetByPathQueryResult} from '#sanity.types'

const Root = styled(Card)`
  position: relative;
`

const BackgroundBox = styled(Box)`
  position: absolute;
  width: 100%;
  height: 400px;
  max-height: 50vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  top: 0;
  left: 0;
  z-index: 0;
`

export function HeroSection(props: {
  data: Extract<
    NonNullable<
      Extract<NonNullable<TargetByPathQueryResult>, {_type: 'screen'}>['sections']
    >[number],
    {_type: 'screenSection.hero'}
  >
}): ReactElement {
  const {data} = props

  const {color} = useTheme_v2()

  const backgroundImage = {
    dark: data.backgroundImage?.dark && imageUrlBuilder.image(data.backgroundImage?.dark).url(),
    light: data.backgroundImage?.light && imageUrlBuilder.image(data.backgroundImage?.light).url(),
  }

  const backgroundImageUrl = color._dark ? backgroundImage.dark : backgroundImage.light

  return (
    <Root flex={1} paddingX={[3, 4, 5]} paddingY={[6, 7, 8]} style={{minHeight: 'auto'}}>
      <BackgroundBox
        display={['none', 'none', 'block']}
        style={{
          backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
        }}
      />

      <Container width={0}>
        <Stack gap={[4, 4, 5]}>
          <Heading align="center" as="h1" size={[2, 3, 4, 5]}>
            {data.headline}
          </Heading>

          {data.copy && (
            <Text align="center" as="p" muted size={[2, 2, 3]}>
              {data.copy}
            </Text>
          )}

          {data.ctas && (
            <Inline gap={2} style={{textAlign: 'center'}}>
              {data.ctas
                .filter((cta) => cta.href)
                .map((cta) => (
                  <Button
                    as={Link}
                    data-as="a"
                    fontSize={2}
                    href={stegaClean(cta.href) || ''}
                    key={cta._key}
                    mode={stegaClean(cta.mode) || 'default'}
                    paddingX={5}
                    paddingY={4}
                    text={cta.label}
                    tone={stegaClean(cta.tone) || 'default'}
                  />
                ))}
            </Inline>
          )}
        </Stack>
      </Container>

      {data.linksHeader && (
        <Box marginTop={[5, 6, 7]}>
          <Heading align="center" size={[1, 1, 2]}>
            {data.linksHeader}
          </Heading>
        </Box>
      )}

      {data.links && (
        <Container width={2}>
          <Box marginTop={[4, 4, 5]}>
            <Grid gap={[3, 4, 4, 5]} gridTemplateColumns={[1, 1, 2, 3]}>
              {data.links
                .filter((link) => link.href)
                .map((link) => (
                  <Card
                    as={Link}
                    border
                    data-as="a"
                    href={stegaClean(link.href) || '/docs/motivation'}
                    key={link._key}
                    padding={4}
                    radius={2}
                  >
                    <Stack gap={3}>
                      <Heading as="h2" size={1}>
                        {link.title || <em>Untitled</em>}
                      </Heading>
                      {link.subtitle && (
                        <Text as="p" muted size={1}>
                          {link.subtitle}
                        </Text>
                      )}
                    </Stack>
                  </Card>
                ))}
            </Grid>
          </Box>
        </Container>
      )}
    </Root>
  )
}
