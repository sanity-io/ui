'use client'

import {WrappedValue} from '@sanity/react-loader/jsx'
import {sanity} from '@sanity/react-loader/jsx'
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
import Link from 'next/link'
import {ReactElement} from 'react'
import {styled} from 'styled-components'

import {useApp} from '@/app/useApp'
import {HeroSectionData} from '@/lib/data'

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

export function HeroSection(props: {data: WrappedValue<HeroSectionData>}): ReactElement {
  const {data} = props

  const {imageUrlBuilder} = useApp()

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
        <Stack space={[4, 4, 5]}>
          <Heading align="center" as="h1" size={[2, 3, 4, 5]}>
            <sanity.span>{data.headline}</sanity.span>
          </Heading>

          {data.copy && (
            <Text align="center" as="p" muted size={[2, 2, 3]}>
              <sanity.span>{data.copy}</sanity.span>
            </Text>
          )}

          {data.ctas && (
            <Inline space={2} style={{textAlign: 'center'}}>
              {data.ctas
                .filter((cta) => cta.href?.value)
                .map((cta) => (
                  <Button
                    as={Link}
                    data-as="a"
                    fontSize={2}
                    href={cta.href?.value}
                    key={cta._key}
                    mode={(cta.mode?.value || 'default') as any}
                    paddingX={5}
                    paddingY={4}
                    text={<sanity.span>{cta.label}</sanity.span>}
                    tone={(cta.tone?.value || 'default') as any}
                  />
                ))}
            </Inline>
          )}
        </Stack>
      </Container>

      {data.linksHeader && (
        <Box marginTop={[5, 6, 7]}>
          <Heading align="center" size={[1, 1, 2]}>
            <sanity.span>{data.linksHeader}</sanity.span>
          </Heading>
        </Box>
      )}

      {data.links && (
        <Container width={2}>
          <Box marginTop={[4, 4, 5]}>
            <Grid columns={[1, 1, 2, 3]} gap={[3, 4, 4, 5]}>
              {data.links
                .filter((link) => link.href?.value)
                .map((link) => (
                  <Card
                    as={Link}
                    border
                    data-as="a"
                    href={link.href?.value || '/docs/motivation'}
                    key={link._key}
                    padding={4}
                    radius={2}
                  >
                    <Stack space={3}>
                      <Heading as="h2" size={1}>
                        {link.title ? <sanity.span>{link.title}</sanity.span> : <em>Untitled</em>}
                      </Heading>
                      {link.subtitle && (
                        <Text as="p" muted size={1}>
                          {link.subtitle ? (
                            <sanity.span>{link.subtitle}</sanity.span>
                          ) : (
                            <em>Unsubtitled</em>
                          )}
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
