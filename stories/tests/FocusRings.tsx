import {ReactNode} from 'react'
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Flex,
  Heading,
  Radio,
  Select,
  Stack,
  Switch,
  Text,
  TextArea,
  TextInput,
} from '../../src/primitives'
import {ThemeProvider, studioTheme} from '../../src/theme'

const Wrapper = ({children, title}: {children: ReactNode; title: string}) => {
  return (
    <Stack space={3}>
      <Text size={1} weight="semibold">
        {title}
      </Text>
      {children}
    </Stack>
  )
}

export function FocusRings(): ReactNode {
  return (
    <ThemeProvider scheme="light" theme={studioTheme}>
      <Card padding={5}>
        <Stack space={6}>
          <Heading>Primitives</Heading>
          <Wrapper title="Avatar (as button)">
            <Avatar as="button" initials="AB" />
          </Wrapper>
          <Wrapper title="Buttons">
            <Flex gap={3} wrap="wrap">
              <Button text="Button" />
              <Button mode="bleed" text="Button" />
              <Button mode="ghost" text="Button" />
            </Flex>
            <Flex gap={3} wrap="wrap">
              <Button text="Button" tone="primary" />
              <Button mode="bleed" text="Button" tone="primary" />
              <Button mode="ghost" text="Button" tone="primary" />
            </Flex>
            <Flex gap={3} wrap="wrap">
              <Button text="Button" tone="positive" />
              <Button mode="bleed" text="Button" tone="positive" />
              <Button mode="ghost" text="Button" tone="positive" />
            </Flex>
            <Flex gap={3} wrap="wrap">
              <Button text="Button" tone="caution" />
              <Button mode="bleed" text="Button" tone="caution" />
              <Button mode="ghost" text="Button" tone="caution" />
            </Flex>
            <Flex gap={3} wrap="wrap">
              <Button text="Button" tone="critical" />
              <Button mode="bleed" text="Button" tone="critical" />
              <Button mode="ghost" text="Button" tone="critical" />
            </Flex>
          </Wrapper>
          <Wrapper title="Card (as button)">
            <Flex gap={3} wrap="wrap">
              <Card __unstable_focusRing as="button" padding={3} tone="transparent">
                <Text>Transparent</Text>
              </Card>
              <Card __unstable_focusRing as="button" padding={3} tone="primary">
                <Text>Primary</Text>
              </Card>
              <Card __unstable_focusRing as="button" padding={3} tone="positive">
                <Text>Positive</Text>
              </Card>
              <Card __unstable_focusRing as="button" padding={3} tone="caution">
                <Text>Caution</Text>
              </Card>
              <Card __unstable_focusRing as="button" padding={3} tone="critical">
                <Text>Critical</Text>
              </Card>
            </Flex>
          </Wrapper>
          <Wrapper title="Checkboxes">
            <Flex gap={3} wrap="wrap">
              <Checkbox />
              <Checkbox indeterminate />
              <Checkbox defaultChecked />
              <Checkbox disabled />
            </Flex>
          </Wrapper>
          <Wrapper title="Radios">
            <Flex gap={3} wrap="wrap">
              <Radio />
              <Radio defaultChecked />
              <Radio disabled />
            </Flex>
          </Wrapper>
          <Wrapper title="Selects">
            <Flex gap={3} wrap="wrap">
              <Select>
                <option>Select...</option>
              </Select>
              <Select readOnly>
                <option>Select...</option>
              </Select>
              <Select disabled>
                <option>Select...</option>
              </Select>
            </Flex>
          </Wrapper>
          <Wrapper title="Switches">
            <Flex gap={3} wrap="wrap">
              <Switch />
              <Switch indeterminate />
              <Switch defaultChecked />
              <Switch disabled />
            </Flex>
          </Wrapper>
          <Wrapper title="Text areas">
            <Flex gap={3} wrap="wrap">
              <TextArea placeholder="Default" />
              <TextArea placeholder="Read-only" readOnly />
              <TextArea customValidity="error" placeholder="With error" />
              <TextArea disabled placeholder="Disabled" />
            </Flex>
          </Wrapper>
          <Wrapper title="Text inputs">
            <Flex gap={3} wrap="wrap">
              <TextInput placeholder="Default" />
              <TextInput placeholder="Read-only" readOnly />
              <TextInput customValidity="error" placeholder="With error" />
              <TextInput disabled placeholder="Disabled" />
            </Flex>
          </Wrapper>
        </Stack>
      </Card>
    </ThemeProvider>
  )
}
