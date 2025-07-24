'use client'

import {Badge, Box, Button, Card, Heading, Menu, MenuButton, MenuItem, useToast} from '@sanity/ui'

export default function Home() {
  const toast = useToast()

  return (
    <Card height="fill">
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        gap={[4, 5, 6, 7]}
        padding={[4, 5, 6, 7]}
      >
        <Badge tone="suggest">Playground</Badge>

        <Heading as="h1" size={[2, 3, 4, 5]}>
          Sanity UI in Next.js
        </Heading>

        <Button
          mode="ghost"
          onClick={() => toast.push({title: 'Hello, world'})}
          width="min"
          text="Push message to toast stack"
        />

        <MenuButton
          button={<Button mode="ghost" text="Open menu" width="min" />}
          id="test-menu-button"
          menu={
            <Menu>
              <MenuItem text="Item 1" />
              <MenuItem text="Item 2" />
              <MenuItem text="Item 3" />
            </Menu>
          }
        />
      </Box>
    </Card>
  )
}
