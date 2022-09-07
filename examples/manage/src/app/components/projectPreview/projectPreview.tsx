import {CircleIcon, WarningOutlineIcon} from '@sanity/icons'
import {
  Avatar,
  AvatarStack,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Inline,
  Label,
  Stack,
  Text,
} from '@sanity/ui'
import styled from 'styled-components'
import {useLocation} from '../../../lib/location'

const Root = styled(Card).attrs({forwardedAs: 'a'})`
  display: block;
  appearance: none;
  text-decoration: none;
`

export function ProjectPreview(props: {plan: string; title: React.ReactNode}) {
  const {plan, title} = props
  const {handleLinkClick} = useLocation()

  return (
    <Root
      href="/org/sanity/project/foo"
      onClick={handleLinkClick}
      padding={4}
      radius={2}
      shadow={1}
    >
      <Flex align="flex-start">
        <Box paddingRight={4}>
          <Card radius={4} style={{width: 64, height: 64}} tone="transparent" />
        </Box>
        <Box flex={1}>
          <Stack space={4}>
            <Flex align="flex-start">
              <Box flex={1} paddingRight={4}>
                <Stack space={3}>
                  <Heading size={1}>{title}</Heading>
                  <Label>{plan}</Label>
                </Stack>
              </Box>
              <Box>
                <Inline space={1}>
                  <Button icon={WarningOutlineIcon} mode="bleed" padding={2} tone="caution" />
                  <Button icon={CircleIcon} mode="bleed" padding={2} />
                </Inline>
              </Box>
            </Flex>

            <Flex align="center">
              <Box flex={1}>
                <Inline space={2}>
                  <AvatarStack>
                    <Avatar color="cyan" />
                    <Avatar color="blue" />
                    <Avatar color="purple" />
                  </AvatarStack>
                  <Text size={1}>16 members</Text>
                </Inline>
              </Box>
              <Box>
                <Text size={1}>updated just now</Text>
              </Box>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Root>
  )
}
