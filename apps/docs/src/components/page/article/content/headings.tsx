import {LinkIcon} from '@sanity/icons/Link'
import {Box, Heading} from '@sanity/ui'
import {ReactElement, ReactNode} from 'react'

export function Heading2(props: {children?: ReactNode; id: string}): ReactElement {
  const {children, id} = props

  return (
    <Box marginTop={6} marginBottom={5} id={id}>
      <Heading as="h2" size={[1, 1, 2]}>
        {children}
        &nbsp;&nbsp;
        <a aria-label="Link to this section" href={`#${id}`}>
          <LinkIcon aria-hidden />
        </a>
      </Heading>
    </Box>
  )
}

export function Heading3(props: {children?: ReactNode; id: string}): ReactElement {
  const {children, id} = props

  return (
    <Box marginTop={6} marginBottom={4} id={id}>
      <Heading as="h3" size={1}>
        {children}
        &nbsp;&nbsp;
        <a aria-label="Link to this section" href={`#${id}`}>
          <LinkIcon aria-hidden />
        </a>
      </Heading>
    </Box>
  )
}
