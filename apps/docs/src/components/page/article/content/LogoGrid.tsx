'use client'

import {Box, Card, Code, Grid, Heading, useTheme_v2} from '@sanity/ui'
import React, {createElement} from 'react'

export function LogoGrid({
  logos,
}: {
  logos: {name: string; component: React.ComponentType<{dark?: boolean}>}[]
}) {
  const {color} = useTheme_v2()

  return (
    <Grid columns={[1, 1, 2]} gap={2}>
      {logos.map((logo) => (
        <Card border key={logo.name} overflow="hidden" radius={2} style={{textAlign: 'center'}}>
          <Card borderBottom padding={5}>
            <Heading as="span" size={[3, 3, 4, 5]}>
              {createElement(logo.component, {dark: color._dark})}
            </Heading>
          </Card>
          <Box padding={4}>
            <Code muted size={[1, 1, 2]}>
              {logo.name}
            </Code>
          </Box>
        </Card>
      ))}
    </Grid>
  )
}
