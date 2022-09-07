import {Box, Button, Card, Container, Grid, Heading, Inline, Stack, Text} from '@sanity/ui'
import Link from 'next/link'
import styled from 'styled-components'
import {useApp} from '$components/app'
import {imageUrlBuilder} from '$sanity'

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

export function ScreenHeroSection({data}: {data: any}) {
  const app = useApp()

  const backgroundImage = {
    dark: data.backgroundImage?.dark && imageUrlBuilder.image(data.backgroundImage?.dark).url(),
    light: data.backgroundImage?.light && imageUrlBuilder.image(data.backgroundImage?.light).url(),
  }

  const backgroundImageUrl =
    app.colorScheme === 'dark' ? backgroundImage.dark : backgroundImage.light

  return (
    <Root flex={1} paddingX={[3, 4, 5]} paddingY={[6, 7, 8]}>
      <BackgroundBox
        display={['none', 'none', 'block']}
        style={{backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined}}
      />

      <Container width={0}>
        <Stack space={[4, 4, 5]}>
          <Heading align="center" as="h1" size={[2, 3, 4, 5]}>
            {data.headline}
          </Heading>

          {data.copy && (
            <Text align="center" as="p" muted size={[2, 2, 3]}>
              {data.copy}
            </Text>
          )}

          {data.ctas && (
            <Inline space={2} style={{textAlign: 'center'}}>
              {data.ctas.map((cta: any) => (
                <Link href={cta.href} key={cta._key} passHref>
                  <Button
                    as="a"
                    fontSize={[2, 2, 3]}
                    mode={cta.mode}
                    padding={[3, 3, 4]}
                    text={cta.label}
                    tone={cta.tone}
                  />
                </Link>
              ))}
            </Inline>
          )}
        </Stack>
      </Container>

      {data.linksHeader && (
        <Box marginTop={[5, 6, 7]}>
          <Heading accent align="center" size={[1, 1, 2]}>
            {data.linksHeader}
          </Heading>
        </Box>
      )}

      {data.links && (
        <Container width={2}>
          <Box marginTop={[4, 4, 5]}>
            <Grid columns={[1, 1, 2, 3]} gap={[3, 4, 4, 5]}>
              {data.links.map((link: any) => (
                <Link href={link.href ? link.href : '/docs/motivation'} key={link._key} passHref>
                  <Card as="a" border padding={4} radius={2}>
                    <Stack space={3}>
                      <Heading as="h2" size={1}>
                        {link.title || <em>Untitled</em>}
                      </Heading>
                      {link.subtitle && (
                        <Text as="p" muted size={2}>
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
    </Root>
  )
}
