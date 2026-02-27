import {
  Autocomplete,
  type AutocompleteProps,
  Card,
  Dialog,
  LayerProvider,
  Popover,
  Stack,
  Text,
} from '@sanity/ui'
import {useCallback, useState} from 'react'

import {CardWrapper} from '$workshop'

import {countries} from './mock/countries'
import type {ExampleOption} from './types'

export default function ConstrainedHeightStory(): React.JSX.Element {
  return (
    <CardWrapper pattern="halftone">
      <Dialog id="constrained-height-dialog" tone="default">
        <Stack gap={5} padding={4}>
          <ConstrainedHeightExampleField id="example-1" label="Example 1" />
          <ConstrainedHeightExampleField id="example-2" label="Example 2" />
          <ConstrainedHeightExampleField id="example-3" label="Example 3" />
          <ConstrainedHeightExampleField id="example-4" label="Example 4" />
          <ConstrainedHeightExampleField id="example-5" label="Example 5" />
          <ConstrainedHeightExampleField id="example-6" label="Example 6" />
          <ConstrainedHeightExampleField id="example-7" label="Example 7" />
          <ConstrainedHeightExampleField id="example-8" label="Example 8" />
          <ConstrainedHeightExampleField id="example-9" label="Example 9" />
        </Stack>
      </Dialog>
    </CardWrapper>
  )
}

function ConstrainedHeightExampleField({id, label}: {id: string; label: string}) {
  const [value, setValue] = useState('')

  const renderOption = useCallback((option: ExampleOption) => {
    return (
      <Card
        key={option.value}
        as="a"
        data-qa={`option-${option.value}`}
        href="#"
        padding={3}
        radius={2}
        onClick={(event) => event.preventDefault()}
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
          ref={popoverRef}
          constrainSize
          matchReferenceWidth
          open
          overflow="auto"
          placement="bottom-start"
          portal
          radius={3}
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
          openButton
          options={options}
          placeholder="Search"
          renderOption={renderOption}
          renderPopover={renderPopover}
          renderValue={renderValue}
          value={value}
          onChange={setValue}
        />
      </LayerProvider>
    </Stack>
  )
}
