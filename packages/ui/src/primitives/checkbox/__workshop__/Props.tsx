import {Box, Checkbox, Flex, Text} from '@sanity/ui'
import {useAction, useBoolean} from '@sanity/ui-workshop'

export default function PropsStory(): React.JSX.Element {
  const checked = useBoolean('Checked', false)
  const disabled = useBoolean('Disabled', false)
  const indeterminate = useBoolean('Indeterminate', false)
  const invalid = useBoolean('Invalid', false)
  const onChange = useAction('onChange')
  const onFocus = useAction('onFocus')
  const onBlur = useAction('onBlur')
  const readOnly = useBoolean('Read only', false)

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" as="label">
        <Checkbox
          checked={checked}
          customValidity={invalid ? 'Invalid' : undefined}
          disabled={disabled}
          indeterminate={indeterminate}
          readOnly={readOnly}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
        />
        <Box marginLeft={2}>
          <Text size={1} weight="medium">
            Toggle
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
