import {Icon} from '@sanity/icons'
import {Card, Flex, Text} from '@sanity/ui'
import {stegaClean} from 'next-sanity'
import {ReactNode} from 'react'

import {useApp} from '../app/useApp'

export function Banner(): ReactNode {
  const {settings} = useApp()

  if (!settings?.banner || settings.banner.hidden) return null

  const {banner} = settings

  return (
    <Card padding={3} tone="primary">
      <Flex align="center" gap={2} justify="center">
        {banner.icon && (
          <Text muted size={1}>
            <Icon symbol={stegaClean(banner.icon)} />
          </Text>
        )}

        <Text muted size={1}>
          <strong>{banner.title}</strong>
          {banner.link?.href && (
            <>
              {' '}
              <a href={stegaClean(banner.link.href)} target="_blank" rel="noreferrer">
                {banner.link.title} &rarr;
              </a>
            </>
          )}
        </Text>
      </Flex>
    </Card>
  )
}
