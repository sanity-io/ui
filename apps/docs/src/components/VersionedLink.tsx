import Link from 'next/link'
import {useApp} from '@/app/useApp'

export function VersionedLink(props: React.ComponentProps<typeof Link>) {
  const {href, ...rest} = props
  const {defaultVersion, version} = useApp()
  const prefix = version === defaultVersion ? '' : `/${version}`

  return <Link {...rest} href={`${prefix}${href}`} />
}
