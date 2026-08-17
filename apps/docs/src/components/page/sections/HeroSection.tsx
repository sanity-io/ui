'use client'

import {
  Box,
  Button,
  type ButtonMode,
  type ButtonTone,
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

import {basePath} from '@/constants'

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
  backgroundImage?: {dark?: string; light?: string}
  copy?: string
  ctas?: {href: string; label: string; mode: ButtonMode; tone: ButtonTone}[]
  headline: string
  links?: {href: string; subtitle?: string; title: string}[]
  linksHeader?: string
}): ReactElement {
  const {backgroundImage, copy, ctas, headline, links, linksHeader} = props

  const {color} = useTheme_v2()

  // CSS `url()` values don't get the router basePath prefix
  const backgroundImagePath = color._dark ? backgroundImage?.dark : backgroundImage?.light
  const backgroundImageUrl = backgroundImagePath && `${basePath}${backgroundImagePath}`

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
            {headline}
          </Heading>

          {copy && (
            <Text align="center" as="p" muted size={[2, 2, 3]}>
              {copy}
            </Text>
          )}

          {ctas && (
            <Inline gap={2} style={{textAlign: 'center'}}>
              {ctas.map((cta) => (
                <Button
                  as={Link}
                  data-as="a"
                  fontSize={2}
                  href={cta.href}
                  key={cta.href}
                  mode={cta.mode}
                  paddingX={5}
                  paddingY={4}
                  prefetch={true}
                  text={cta.label}
                  tone={cta.tone}
                />
              ))}
            </Inline>
          )}
        </Stack>
      </Container>

      {linksHeader && (
        <Box marginTop={[5, 6, 7]}>
          <Heading align="center" size={[1, 1, 2]}>
            {linksHeader}
          </Heading>
        </Box>
      )}

      {links && (
        <Container width={2}>
          <Box marginTop={[4, 4, 5]}>
            <Grid gap={[3, 4, 4, 5]} gridTemplateColumns={[1, 1, 2, 3]}>
              {links.map((link) => (
                <Card
                  as={Link}
                  border
                  data-as="a"
                  href={link.href}
                  key={link.href}
                  padding={4}
                  prefetch={true}
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
