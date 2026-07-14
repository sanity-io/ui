import {gray, white} from '@sanity/color'
import {SanityMonogram} from '@sanity/logos'
import {Box, Button, Card, Flex, Text} from '@sanity/ui'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {ReactElement, useMemo} from 'react'

import {useApp} from '../app/useApp'
import {GitHubMark} from './assets'

export function Navbar(): ReactElement {
  // `usePathname` excludes the `/ui` basePath, matching the nav tree hrefs
  const segment = usePathname().split('/').find(Boolean)
  const {dataset, features, nav} = useApp()

  // Grayscale monogram hints that the app is not reading from the production
  // dataset (the deprecated `SanityMonogramColor` type is left inferred; the
  // `scheme` prop replacement has no gray variant)
  const monogramColor = useMemo(
    () =>
      dataset === 'production'
        ? undefined
        : {bg1: gray['500'].hex, bg2: gray['200'].hex, fg: white.hex},
    [dataset],
  )

  return (
    <Card flex="none" padding={[2, 2, 3, 4]} style={{lineHeight: 0}}>
      <Flex gap={1}>
        <Box flex="none">
          <Button as={Link} data-as="a" href="/" mode="bleed" padding={3} radius={2}>
            <Flex align="center" gap={[3, 3, 4]}>
              <Box flex="none">
                <Text size={[1, 1, 2]}>
                  {monogramColor ? (
                    <SanityMonogram color={monogramColor} style={{borderRadius: 3}} />
                  ) : (
                    <SanityMonogram style={{borderRadius: 3}} />
                  )}
                </Text>
              </Box>

              <Box flex="none">
                <Text size={[1, 1, 2]} weight="bold" style={{color: 'var(--card-fg-color)'}}>
                  Sanity UI
                </Text>
              </Box>
            </Flex>
          </Button>
        </Box>

        {nav && (
          <Flex align="center" flex={1} gap={1}>
            {nav.children?.map((node) => {
              if (node.hidden && !features.hintHiddenContent) {
                return null
              }

              if (!node.href) {
                return null
              }

              return (
                <Button
                  as={Link}
                  data-as="a"
                  fontSize={[1, 1, 2]}
                  href={node.href}
                  key={node.href}
                  mode="bleed"
                  padding={3}
                  // The destination pages are fully cached, so ship their
                  // content with the prefetch for instant navigations
                  prefetch
                  radius={2}
                  selected={node.segment === segment}
                  style={{opacity: node.hidden ? 0.25 : undefined}}
                  text={node.title}
                />
              )
            })}
          </Flex>
        )}

        <Box marginLeft={[1, 1, 2]}>
          <Button
            aria-label="Open GitHub repository"
            as="a"
            fontSize={[1, 1, 2]}
            href="https://github.com/sanity-io/ui"
            icon={GitHubMark}
            mode="bleed"
            padding={3}
            radius={2}
            rel="noopener noreferrer"
            target="_blank"
          />
        </Box>
      </Flex>
    </Card>
  )
}
