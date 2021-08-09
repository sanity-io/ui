import {ArrowRightIcon, Icon} from '@sanity/icons'
import {Card, Text} from '@sanity/ui'
import Link from 'next/link'
import React from 'react'
import {useApp} from './hooks'
import {isRecord} from '$lib/types'

export function AppBanner() {
  const {data} = useApp()
  const settings = isRecord(data) && data.settings
  const banner = settings && (settings as any).banner

  if (!banner || banner.hidden) return null

  return (
    <Card padding={3} tone="transparent" style={{minHeight: 'auto'}}>
      <Text align="center" size={1}>
        {(banner.icon || banner.title) && (
          <strong>
            {banner.icon && (
              <>
                <Icon symbol={banner.icon} />
                &nbsp;&nbsp;{' '}
              </>
            )}
            {banner.title}
          </strong>
        )}

        {banner.link?.title && banner.link?.href && (
          <>
            {' '}
            <Link href={banner.link?.href}>
              <a>
                {banner.link.title} <ArrowRightIcon />
              </a>
            </Link>
          </>
        )}
      </Text>
    </Card>
  )
}
