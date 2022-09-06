import {Text} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styled from 'styled-components'

const Root = styled(Text)`
  & > a {
    color: var(--card-muted-fg-color);

    @media (hover: hover) {
      &:hover {
        color: var(--card-fg-color);
        text-decoration: none;
      }
    }
  }

  &[aria-selected='true'] > a {
    color: var(--card-link-color);
  }
`

export function NavLink(props: {
  children: React.ReactNode
  href: string
  size?: number | number[]
  style?: React.CSSProperties
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
}) {
  const {children, href, ...restProps} = props
  const router = useRouter()

  return (
    <Root {...restProps} aria-selected={href === router.asPath}>
      <Link href={href} passHref>
        <a>{children}</a>
      </Link>
    </Root>
  )
}
