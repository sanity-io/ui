import {Box, Card, Flex, Stack, Text} from '@sanity/ui'
import styled from 'styled-components'

const ConcatenatedText = styled(Text)`
  & > span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

export function Preview(props: {subtitle?: React.ReactNode; title?: React.ReactNode}) {
  return (
    <Flex align="center">
      <Box>
        <Card radius={1} style={{width: 41, height: 41}} tone="transparent" />
      </Box>
      <Box flex={1} marginLeft={3}>
        <Stack space={2}>
          {props.title && (
            <ConcatenatedText style={{fontWeight: 500}}>
              <span>{props.title}</span>
            </ConcatenatedText>
          )}

          {!props.title && (
            <ConcatenatedText muted>
              <span>Untitled</span>
            </ConcatenatedText>
          )}

          {props.subtitle && (
            <ConcatenatedText muted size={1}>
              <span>{props.subtitle}</span>
            </ConcatenatedText>
          )}
        </Stack>
      </Box>
    </Flex>
  )
}
