import {gray, white} from '@sanity/color'
import {SanityMonogram, SanityMonogramColor} from '@sanity/logos'
import {sanity} from '@sanity/react-loader/jsx'
import {Box, Button, Card, Flex, Text} from '@sanity/ui'
import Link from 'next/link'
import {ReactElement, useMemo} from 'react'

import {useApp} from '../app/useApp'
import {GitHubMark} from './assets'

export function Navbar(props: {path: string[]}): ReactElement {
  const {path} = props
  const {dataset, features, nav} = useApp()

  const monogramColor: SanityMonogramColor | undefined = useMemo(
    () =>
      dataset?.startsWith('prod')
        ? undefined
        : {bg1: gray['500'].hex, bg2: gray['200'].hex, fg: white.hex},
    [dataset],
  )

  return (
    <Card flex="none" padding={[2, 2, 3, 4]} style={{lineHeight: 0}}>
      <Flex gap={1}>
        <Box flex="none">
          <Button as={Link} data-as="a" href="/" mode="bleed" padding={3} radius={3}>
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
            {nav.children?.map((node, idx) => {
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
                  key={idx}
                  mode="bleed"
                  padding={3}
                  radius={3}
                  selected={node.segment === path[0]}
                  style={{opacity: node.hidden ? 0.25 : undefined}}
                  text={<sanity.span>{node.title}</sanity.span>}
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
