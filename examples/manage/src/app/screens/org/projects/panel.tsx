import {EllipsisVerticalIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
} from '@sanity/ui'

export function ProjectsPanel() {
  return (
    <Card>
      <Container width={3}>
        <Box paddingX={4} paddingY={6}>
          <Heading>Projects</Heading>
        </Box>

        <Stack padding={4} space={4}>
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
          <ProjectItem id="foo" />
        </Stack>
      </Container>
    </Card>
  )
}

function ProjectItem({id}: {id: string}) {
  return (
    <Card radius={3} shadow={1}>
      <Flex align="center">
        <Box flex={1} paddingX={4} paddingY={3}>
          <Heading>Project: {id}</Heading>
        </Box>
        <Box padding={2}>
          <MenuButton
            id={`${id}-menu`}
            button={<Button icon={EllipsisVerticalIcon} mode="bleed" />}
            menu={
              <Menu>
                <MenuItem text="Foo" />
                <MenuItem text="Foo" />
                <MenuItem text="Foo" />
                <MenuItem text="Foo" />
              </Menu>
            }
          />
        </Box>
      </Flex>
    </Card>
  )
}
