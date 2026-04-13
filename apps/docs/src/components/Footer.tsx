import {HeartFilledIcon} from '@sanity/icons'
import {SanityLogo} from '@sanity/logos'
import {Box, Button, Card, Flex, Text, useCard} from '@sanity/ui'
import {ReactElement} from 'react'

export function AppFooter(): ReactElement {
  const card = useCard()

  return (
    <Card flex="none" paddingX={[3, 4, 5]} paddingY={[2, 3, 4]} shadow={1} style={{zIndex: 10}}>
      <Flex align="center" gap={1} justify="center">
        <Text as="span" muted size={1}>
          Made with
        </Text>

        <Box as="span" paddingX={1}>
          <Text as="span" size={1}>
            <HeartFilledIcon aria-label="love" />
          </Text>
        </Box>

        <Text as="span" muted size={1}>
          by folks at
        </Text>

        <Button
          as="a"
          href="https://sanity.io"
          mode="bleed"
          padding={2}
          rel="noopener noreferrer"
          target="_blank"
          tone={card.scheme === 'dark' ? undefined : 'critical'}
        >
          <Text as="span" size={1}>
            <SanityLogo aria-label="Sanity" dark={card.scheme === 'dark'} />
          </Text>
        </Button>
      </Flex>
    </Card>
  )
}
