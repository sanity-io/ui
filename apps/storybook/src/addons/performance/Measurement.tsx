import React from 'react'
import {styled} from 'storybook/theming'

import type {ProfilerMeasurement} from './types'

const Card = styled.article(({theme}) => ({
  border: `1px solid ${theme.appBorderColor}`,
  borderRadius: theme.appBorderRadius,
  color: theme.color.defaultText,
  fontSize: theme.typography.size.s2 - 1,
  lineHeight: 1.5,
  padding: '0.75rem',
}))

const Title = styled.h3(({theme}) => ({
  color: theme.color.defaultText,
  fontSize: theme.typography.size.s2 - 1,
  fontWeight: theme.typography.weight.bold,
  margin: '0 0 0.5rem',
}))

const Details = styled.dl({
  display: 'grid',
  gap: '0.25rem 0.75rem',
  gridTemplateColumns: 'max-content 1fr',
  margin: 0,
})

const Label = styled.dt(({theme}) => ({
  color: theme.color.defaultText,
  fontWeight: theme.typography.weight.bold,
}))

const Value = styled.dd(({theme}) => ({
  color: theme.color.defaultText,
  fontFamily: theme.typography.fonts.mono,
  margin: 0,
}))

function formatMilliseconds(milliseconds: number) {
  return `${milliseconds.toFixed(2)} ms`
}

export function Measurement({measurement}: {measurement: ProfilerMeasurement}) {
  return (
    <Card>
      <Title>{measurement.id}</Title>

      <Details>
        <Label>Phase</Label>
        <Value>{measurement.phase}</Value>
        <Label>Actual duration</Label>
        <Value>{formatMilliseconds(measurement.actualDuration)}</Value>
        <Label>Base duration</Label>
        <Value>{formatMilliseconds(measurement.baseDuration)}</Value>
        <Label>Start time</Label>
        <Value>{formatMilliseconds(measurement.startTime)}</Value>
        <Label>Commit time</Label>
        <Value>{formatMilliseconds(measurement.commitTime)}</Value>
      </Details>
    </Card>
  )
}
