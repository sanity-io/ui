import {Card, Code, Container, Grid} from '@sanity/ui'
import {withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Grid',
  decorators: [withCentered, withKnobs],
}

export const responsive = () => {
  return (
    <Container width="auto">
      <Card padding={4}>
        <Grid
          id="responsive-grid"
          columns={[1, 2, 3, 4, 5, 6, 7]}
          gap={[0, 1, 2, 3, 4, 5, 6]}
          rows={[1, 2, 3, 4, 5, 6, 7]}
        >
          <Card tone="transparent">
            <Code>1</Code>
          </Card>
          <Card tone="transparent">
            <Code>2</Code>
          </Card>
          <Card tone="transparent">
            <Code>3</Code>
          </Card>
          <Card tone="transparent">
            <Code>4</Code>
          </Card>
          <Card tone="transparent">
            <Code>5</Code>
          </Card>
          <Card tone="transparent">
            <Code>6</Code>
          </Card>
          <Card tone="transparent">
            <Code>7</Code>
          </Card>
          <Card tone="transparent">
            <Code>8</Code>
          </Card>
          <Card tone="transparent">
            <Code>9</Code>
          </Card>
          <Card tone="transparent">
            <Code>10</Code>
          </Card>
          <Card tone="transparent">
            <Code>11</Code>
          </Card>
          <Card tone="transparent">
            <Code>12</Code>
          </Card>
        </Grid>
      </Card>
    </Container>
  )
}
