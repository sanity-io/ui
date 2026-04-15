'use client'

import {WrappedValue} from '@sanity/react-loader/jsx'
import {sanity} from '@sanity/react-loader/jsx'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Label,
  SrOnly,
  Stack,
  Text,
} from '@sanity/ui'
import {ButtonMode, ElementTone} from '@sanity/ui'
import Link from 'next/link'
import {ReactElement} from 'react'

import {HeroSectionData} from '@/lib/data'
import {ArrowRightIcon} from '@sanity/icons'
import {VersionedLink} from '../../VersionedLink'

export function HeroSection(props: {data: WrappedValue<HeroSectionData>}): ReactElement {
  const {data} = props

  return (
    <Card
      __unstable_pattern="halftone"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      flex={1}
      position="relative"
      style={{minHeight: 'auto'}}
    >
      <Box flex={1} />
      <Container
        marginBottom={[5, 6, 7]}
        width={5}
        // width="fill"
        padding={[4, 5, 6]}
        paddingTop={[6, 7, 8]}
      >
        <Heading
          as="h1"
          size={[4, 5, 6, 8, 9]}
          weight="medium"
          style={{marginLeft: '-0.05em', marginRight: '-0.05em'}}
        >
          <sanity.span>{data.headline}</sanity.span>
        </Heading>

        {data.copy && (
          <Text marginTop={[5, 5, 6]} as="p" size={[2, 2, 3, 4]}>
            <sanity.span>{data.copy}</sanity.span>
          </Text>
        )}

        {data.ctas && (
          <Flex marginTop={[4, 4, 5]} gap={2} wrap="wrap">
            {data.ctas
              .filter((cta) => cta.href)
              .map((cta) => (
                <Button
                  iconRight={<ArrowRightIcon />}
                  as={VersionedLink}
                  data-as="a"
                  fontSize={[2, 2, 3]}
                  href={cta.href!.value}
                  key={cta._key}
                  mode={(cta.mode?.value || 'default') as ButtonMode}
                  padding={[3, 3, 4]}
                  // radius={[3, 4, 5]}
                  radius="full"
                  text={<sanity.span>{cta.label}</sanity.span>}
                  tone={(cta.tone?.value || 'default') as ElementTone}
                />
              ))}
          </Flex>
        )}
      </Container>

      {data.linksHeader && (
        <SrOnly>
          <Label
            as="h2"
            marginX="auto"
            marginBottom={[3, 4, 4, 4]}
            maxWidth={5}
            size={2}
            weight="semibold"
            width="fill"
          >
            <sanity.span>{data.linksHeader}</sanity.span>
          </Label>
        </SrOnly>
      )}

      {data.links && (
        <Grid
          gridTemplateColumns={[1, 1, 2, 3, 6]}
          gap={[3, 4, 4, 4]}
          padding={[3, 4, 5]}
          paddingTop={0}
          marginX="auto"
          maxWidth={5}
          width="fill"
        >
          {data.links
            .filter((link) => link.href?.value)
            .map((link) => (
              <Card
                as={Link}
                data-as="a"
                href={link.href?.value || '/docs/motivation'}
                key={link._key}
                padding={4}
                radius={4}
                shadow={1}
                tone="default"
              >
                <Stack gap={4}>
                  <Text as="h2" size={1} weight="semibold">
                    {link.title ? <sanity.span>{link.title}</sanity.span> : <em>Untitled</em>}
                  </Text>

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
      )}
    </Card>
  )
}
