import {Icon, type IconSymbol} from '@sanity/icons'
import {Card, Flex, Text} from '@sanity/ui'
import {ReactNode} from 'react'

export interface BannerData {
  hidden?: boolean
  icon?: IconSymbol
  title?: string
  link?: {title?: string; href?: string}
}

export function Banner({banner}: {banner: BannerData | null}): ReactNode {
  if (!banner || banner.hidden) return null

  return (
    <Card padding={3} tone="primary">
      <Flex align="center" gap={2} justify="center">
        {banner.icon && (
          <Text muted size={1}>
            <Icon symbol={banner.icon} />
          </Text>
        )}

        <Text muted size={1}>
          <strong>{banner.title}</strong>
          {banner.link?.href && (
            <>
              {' '}
              <a href={banner.link.href} target="_blank" rel="noreferrer">
                {banner.link.title} &rarr;
              </a>
            </>
          )}
        </Text>
      </Flex>
    </Card>
  )
}
