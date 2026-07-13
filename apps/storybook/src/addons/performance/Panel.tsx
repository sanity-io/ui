import React, {useState, useEffect} from 'react'
import {AddonPanel, Form, Placeholder} from 'storybook/internal/components'
import {useChannel, useGlobals, useStorybookApi} from 'storybook/manager-api'
import {styled} from 'storybook/theming'

import {
  ADDON_ID,
  EVENTS,
  GLOBAL_BENCHMARK_KEY,
  GLOBAL_COUNT_KEY,
  PERFORMANCE_COUNT_OPTIONS,
} from './constants'
import {Measurement} from './Measurement'
import type {PerformanceParameters, ProfilerMeasurement, ProfilerSlot} from './types'

interface PanelProps {
  active?: boolean
}

const ControlsForm = styled(Form)({
  'marginBottom': 0,
  'marginTop': 0,
  '& > label': {
    position: 'relative',
  },
  '& > label:last-child': {
    marginBottom: 0,
  },
})

const Select = styled.select(({theme}) => ({
  'appearance': 'none',
  'background': theme.input.background,
  'border': 0,
  'borderRadius': theme.input.borderRadius,
  'boxShadow': `${theme.input.border} 0 0 0 1px inset`,
  'boxSizing': 'border-box',
  'color': theme.input.color || theme.color.defaultText,
  'fontSize': theme.typography.size.s2 - 1,
  'lineHeight': '20px',
  'padding': '6px 10px',
  'position': 'relative',
  'width': '100%',
  '&:focus-visible': {
    boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,
    outline: 'none',
  },
}))

const SelectIcon = styled.svg(({theme}) => ({
  fill: theme.textMutedColor,
  height: 12,
  marginTop: -6,
  pointerEvents: 'none',
  position: 'absolute',
  right: 12,
  top: '50%',
  zIndex: 1,
}))

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.75rem',
  padding: '1rem',
})

const Column = styled.article({
  flex: '1 1 0',
  minWidth: 0,
})

type PerformanceMeasurements = Partial<Record<ProfilerSlot, ProfilerMeasurement>> | undefined

export const Panel = React.memo(function PerformancePanel({active}: PanelProps) {
  const api = useStorybookApi()
  const story = api.getCurrentStoryData()
  const [globals, updateGlobals] = useGlobals()
  const [measurements, setMeasurements] = useState<PerformanceMeasurements>(undefined)
  const storyId = story?.type === 'story' ? story.id : undefined
  const performanceParameters = story?.parameters?.[ADDON_ID] as PerformanceParameters | undefined
  const hasCompare = !!performanceParameters?.compareComponent
  const benchmarkRun = Number(globals[GLOBAL_BENCHMARK_KEY] ?? 0) || 0
  const count = globals?.[GLOBAL_COUNT_KEY] ?? PERFORMANCE_COUNT_OPTIONS[0]
  const [pendingCount, setPendingCount] = useState(count)
  const [prevStoryId, setPrevStoryId] = useState(storyId)

  useChannel({
    [EVENTS.RENDER]: (nextMeasurement: ProfilerMeasurement) => {
      if (nextMeasurement.phase !== 'mount') {
        return
      }

      setMeasurements((prev) => ({
        ...prev,
        [nextMeasurement.slot]: nextMeasurement,
      }))
    },
  })

  useEffect(() => {
    updateGlobals({[GLOBAL_BENCHMARK_KEY]: 0})
  }, [storyId, updateGlobals])

  useEffect(() => {
    if (benchmarkRun === 0 || !measurements?.primary) {
      return
    }

    if (hasCompare && !measurements.compare) {
      return
    }

    updateGlobals({[GLOBAL_BENCHMARK_KEY]: 0})
  }, [benchmarkRun, hasCompare, measurements, updateGlobals])

  const handleClick = () => {
    setMeasurements(undefined)

    updateGlobals({
      [GLOBAL_COUNT_KEY]: pendingCount,
      [GLOBAL_BENCHMARK_KEY]: benchmarkRun + 1,
    })
  }

  if (prevStoryId !== storyId) {
    setPrevStoryId(storyId)
    setPendingCount(count)
    setMeasurements(undefined)
  }

  return (
    <AddonPanel active={!!active}>
      {story?.type === 'story' ? (
        <>
          <ControlsForm>
            <Form.Field label="Count">
              <Select
                onChange={(event) => {
                  setPendingCount(Number(event.currentTarget.value))
                }}
                value={pendingCount}
              >
                {PERFORMANCE_COUNT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>

              <SelectIcon
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.854 4.896a.5.5 0 10-.708.708l3.5 3.5a.5.5 0 00.708 0l3.5-3.5a.5.5 0 00-.708-.708L7 8.043 3.854 4.896z"
                  fill="currentColor"
                ></path>
              </SelectIcon>
            </Form.Field>

            <Form.Field label="Measure">
              <Form.Button onClick={handleClick} size="medium" type="button">
                Measure performance
              </Form.Button>
            </Form.Field>
          </ControlsForm>

          {measurements?.primary ? (
            <Row>
              <Column>
                <Measurement measurement={measurements.primary} />
              </Column>

              {measurements.compare && (
                <Column>
                  <Measurement measurement={measurements.compare} />
                </Column>
              )}
            </Row>
          ) : (
            <Placeholder>
              <p>
                {benchmarkRun === 0
                  ? 'Click the Measure performance button above to run the profiler on this story.'
                  : 'Waiting for profiler results…'}
              </p>
            </Placeholder>
          )}
        </>
      ) : (
        <Placeholder>
          <p>Select a story to collect profiler measurements.</p>
        </Placeholder>
      )}
    </AddonPanel>
  )
})
