'use client'

import {Page} from '@/components/page'

export default function WebsiteError(props: {error: Error & {digest?: string}}) {
  return <Page error={props.error} path={[]} />
}
