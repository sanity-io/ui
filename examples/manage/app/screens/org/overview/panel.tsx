import {Avatar, Box, Button, Card, Container, Grid, Heading, Inline, Stack} from '@sanity/ui'
import React from 'react'
import {ActivityEvent, ProjectPreview} from '../../../components'

export function OverviewPanel() {
  return (
    <Card>
      <Container width={3}>
        <Box paddingX={4} paddingY={6}>
          <Grid columns={[1, 1, 5]} gap={[6, 6, 5, 6]}>
            <Box column={[1, 1, 3]}>
              <Stack space={4}>
                <Heading>Projects</Heading>

                <Stack space={4}>
                  <ProjectPreview plan="developer" title={<>DogWeddings.com</>} />
                  <ProjectPreview plan="developer" title={<>CatWeddings.com</>} />
                  <ProjectPreview plan="pro" title={<>Chips and Chops</>} />
                  <ProjectPreview plan="enterprise" title={<>🎉😍💯 Emojis should work too!</>} />
                  <ProjectPreview
                    plan="developer"
                    title={
                      <>
                        An even longer project name that cannot fit literally anywhere which is
                        super annoying
                      </>
                    }
                  />
                  <ProjectPreview plan="pro" title={<>Another project on the list</>} />
                </Stack>
              </Stack>
            </Box>

            <Box column={[1, 1, 2]}>
              <Stack space={6}>
                <Stack space={4}>
                  <Heading>Recent activity</Heading>
                  <Card radius={2} shadow={1}>
                    <ActivityEvent />
                    <ActivityEvent />
                    <ActivityEvent />
                    <ActivityEvent />
                    <ActivityEvent />
                    <ActivityEvent />
                  </Card>
                </Stack>

                <Stack space={4}>
                  <Heading>Team members</Heading>
                  <Card padding={4} radius={2} shadow={1}>
                    <Stack space={4}>
                      <Inline space={2}>
                        <Avatar color="magenta" size={1} />
                        <Avatar color="purple" size={1} />
                        <Avatar color="blue" size={1} />
                        <Avatar color="cyan" size={1} />
                        <Avatar color="yellow" size={1} />
                        <Avatar color="orange" size={1} />
                        <Avatar color="magenta" size={1} />
                        <Avatar color="purple" size={1} />
                        <Avatar color="blue" size={1} />
                        <Avatar color="cyan" size={1} />
                        <Avatar color="yellow" size={1} />
                        <Avatar color="orange" size={1} />
                        <Avatar color="magenta" size={1} />
                        <Avatar color="purple" size={1} />
                        <Avatar color="blue" size={1} />
                        <Avatar color="cyan" size={1} />
                        <Avatar color="yellow" size={1} />
                        <Avatar color="orange" size={1} />
                      </Inline>
                      <Button icon="add" mode="ghost" padding={4} text="Invite new members" />
                    </Stack>
                  </Card>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Container>
    </Card>
  )
}
