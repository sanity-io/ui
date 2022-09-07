import {ChevronDownIcon} from '@sanity/icons'
import {SanityLogo} from '@sanity/logos'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Inline,
  Menu,
  MenuButton,
  MenuItem,
  Text,
} from '@sanity/ui'
import Link from 'next/link'

export function AppLayout({children}: {children?: React.ReactNode}) {
  return (
    <>
      <Card as="a" href="#" padding={3} tone="primary">
        <Text align="center">Latest release: Conditional Fields</Text>
      </Card>

      <Card borderBottom padding={[2, 2, 3, 4]}>
        <Container>
          <Flex>
            <Box marginRight={2}>
              <Link href="/" passHref>
                <Button as="a" icon={SanityLogo} mode="bleed" padding={2} tone="critical" />
              </Link>
            </Box>
            {/* <Card radius={2} style={{width: 120}} tone="critical" /> */}
            <Box flex={1}>
              <Inline space={1}>
                <MenuButton
                  button={
                    <Button
                      iconRight={ChevronDownIcon}
                      mode="bleed"
                      padding={2}
                      space={2}
                      text="Platform"
                    />
                  }
                  id="platform-menu"
                  menu={
                    <Menu>
                      <MenuItem padding={2} text="Structured content" />
                      <MenuItem padding={2} text="Sanity Studio" />
                      <MenuItem padding={2} text="Developer experience" />
                      <MenuItem padding={2} text="Solutions" />
                      <MenuItem padding={2} text="Case studies" />
                    </Menu>
                  }
                />
                <MenuButton
                  button={
                    <Button
                      iconRight={ChevronDownIcon}
                      mode="bleed"
                      padding={2}
                      space={2}
                      text="Resources"
                    />
                  }
                  id="resources-menu"
                  menu={
                    <Menu>
                      <MenuItem padding={2} text="Docs" />
                      <MenuItem padding={2} text="Reference" />
                      <MenuItem padding={2} text="Guides" />
                      <MenuItem padding={2} text="Plugins &amp; tools" />
                      <MenuItem padding={2} text="Get started" />
                    </Menu>
                  }
                />
                <Button mode="bleed" padding={2} text="Pricing" />
                <Button mode="bleed" padding={2} text="Blog" />
              </Inline>
            </Box>

            <Inline space={2}>
              <Button mode="bleed" padding={2} text="Contact us" />
              <Button mode="bleed" padding={2} text="Log in" />
            </Inline>

            <Box marginLeft={2}>
              <Button padding={2} text="Get started" tone="primary" />
            </Box>
          </Flex>
        </Container>
      </Card>

      <Box>{children}</Box>
    </>
  )
}
