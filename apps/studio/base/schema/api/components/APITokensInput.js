import {FormField} from '@sanity/base/components'
import {Card, Code as UICode} from '@sanity/ui'
import {IntentLink} from 'part:@sanity/base/router'
import React from 'react'
import styled from 'styled-components'

const Code = styled(UICode)`
  & a {
    color: var(--card-link-color);

    &:hover {
      text-decoration: underline;
    }
  }
`

export function APITokensInput(props) {
  const {type, value = []} = props

  return (
    <FormField title={type.title} description={type.description}>
      <Card border padding={3} overflow="auto" radius={1}>
        <Code>
          {value.map((token) => (
            <TokenPreview key={token._key} token={token} />
          ))}
        </Code>
      </Card>
    </FormField>
  )
}

function TokenPreview({token}) {
  if (token.reference?._ref) {
    return (
      <IntentLink intent="edit" params={{id: token.reference?._ref}}>
        {token.text}
      </IntentLink>
    )
  }

  return <>{token.text}</>
}
