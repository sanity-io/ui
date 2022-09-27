import {Icon, IconSymbol} from '@sanity/icons'
import {sanity} from '@sanity/react-loader/jsx'
import {Card, Flex, Text} from '@sanity/ui'
import {ReactNode} from 'react'

import {useApp} from '../app/useApp'

export function Banner(): ReactNode {
  const {settings} = useApp()

  if (!settings?.banner || settings.banner.hidden) return null

  return (
    <Card padding={3} tone="primary">
      <Flex align="center" gap={2} justify="center">
        {settings.banner.icon?.value && (
          <Text muted size={1}>
            <Icon symbol={settings.banner.icon.value as IconSymbol} />
          </Text>
        )}

        <Text muted size={1}>
          <sanity.strong>{settings.banner.title}</sanity.strong>
          {settings.banner.link?.href && (
            <>
              {' '}
              <a href={settings.banner.link.href.value} target="_blank" rel="noreferrer">
                <sanity.span>{settings.banner.link.title}</sanity.span> &rarr;
              </a>
            </>
          )}
        </Text>
      </Flex>
    </Card>
  )
}
