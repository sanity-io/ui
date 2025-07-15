import {
  Autocomplete,
  type AutocompleteProps,
  BoundaryElementProvider,
  Box,
  Card,
  Container,
  LayerProvider,
  Popover,
  Stack,
  Text,
} from '@sanity/ui'
import {useCallback, useState} from 'react'

import {countries} from './mock/countries'
import type {ExampleOption} from './types'

export default function ConstrainedHeightStory(): React.JSX.Element {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Card height="fill" tone="transparent">
      <Container height="fill" padding={3} sizing="border" width={1}>
        <Card height="fill" ref={setBoundaryElement} radius={4} shadow={3} tone="default">
          <Box height="fill" overflow="auto" padding={[4, 4, 5]} sizing="border">
            <Stack gap={5}>
              <BoundaryElementProvider element={boundaryElement}>
                <ConstrainedHeightExampleField id="example-1" label="Example 1" />
                <ConstrainedHeightExampleField id="example-2" label="Example 2" />
                <ConstrainedHeightExampleField id="example-3" label="Example 3" />
                <ConstrainedHeightExampleField id="example-4" label="Example 4" />
                <ConstrainedHeightExampleField id="example-5" label="Example 5" />
                <ConstrainedHeightExampleField id="example-6" label="Example 6" />
                <ConstrainedHeightExampleField id="example-7" label="Example 7" />
                <ConstrainedHeightExampleField id="example-8" label="Example 8" />
                <ConstrainedHeightExampleField id="example-9" label="Example 9" />
              </BoundaryElementProvider>
            </Stack>
          </Box>
        </Card>
      </Container>
    </Card>
  )
}

function ConstrainedHeightExampleField({id, label}: {id: string; label: string}) {
  const [value, setValue] = useState('')

  const renderOption = useCallback((option: ExampleOption) => {
    return (
      <Card
        as="a"
        data-qa={`option-${option.value}`}
        href="#"
        key={option.value}
        onClick={(event) => event.preventDefault()}
        padding={3}
        radius={2}
      >
        <Text textOverflow="ellipsis">{option.title}</Text>
      </Card>
    )
  }, [])

  const renderValue = useCallback((currentValue: string, option?: ExampleOption) => {
    return option ? option.title : currentValue
  }, [])

  const filterOption = useCallback((query: string, option: ExampleOption) => {
    return option.title.toLowerCase().indexOf(query.toLowerCase()) > -1
  }, [])

  const options = countries.map((item) => ({value: item.code, title: item.name}))

  const renderPopover: AutocompleteProps['renderPopover'] = useCallback(
    (
      popoverProps: {
        content: React.JSX.Element | null
        hidden: boolean
        inputElement: HTMLInputElement | null
        onMouseEnter: () => void
        onMouseLeave: () => void
      },
      popoverRef: React.Ref<HTMLDivElement>,
    ) => {
      const {hidden, inputElement, ...rest} = popoverProps

      if (hidden) return null

      return (
        <Popover
          {...rest}
          arrow={false}
          constrainSize
          matchReferenceWidth
          open
          overflow="auto"
          placement="bottom-start"
          portal
          radius={3}
          ref={popoverRef}
          referenceElement={inputElement}
        />
      )
    },
    [],
  )

  return (
    <Stack gap={3}>
      <Text size={1} weight="medium">
        {label}
      </Text>
      <LayerProvider zOffset={100}>
        <Autocomplete
          filterOption={filterOption}
          id={id}
          onChange={setValue}
          openButton
          options={options}
          placeholder="Search"
          radius={2}
          renderOption={renderOption}
          renderPopover={renderPopover}
          renderValue={renderValue}
          value={value}
        />
      </LayerProvider>
    </Stack>
  )
}
