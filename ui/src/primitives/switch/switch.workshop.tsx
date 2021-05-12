import {Box, Flex, Switch, Text} from '@sanity/ui'
import {defineScope, useBoolean, useNumber} from '@sanity/ui-workshop'
import React, {useCallback, useMemo, useState} from 'react'
import {ThemeProvider} from 'styled-components'
import {useTheme} from '../../theme'

export default defineScope('primitives/switch', 'Switch', [
  {name: 'props', title: 'Props', component: SwitchStory},
  {name: 'example', title: 'Example', component: ExampleStory},
])

function SwitchStory() {
  const checked = useBoolean('Checked', false)
  const indeterminate = useBoolean('Indeterminate', false)
  const readOnly = useBoolean('Read only', false)
  const theme = useTheme()
  const focusRingOffset = useNumber('Focus ring offset', theme.sanity.focusRing.offset)
  const focusRingWidth = useNumber('Focus ring width', theme.sanity.focusRing.width)
  const handleChange = useCallback(() => undefined, [])

  const customTheme = useMemo(
    () => ({
      ...theme,
      sanity: {
        ...theme.sanity,
        focusRing: {
          offset: focusRingOffset || theme.sanity.focusRing.offset,
          width: focusRingWidth || theme.sanity.focusRing.width,
        },
      },
    }),
    [focusRingOffset, focusRingWidth, theme]
  )

  return (
    <ThemeProvider theme={customTheme}>
      <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
        <Switch
          checked={checked}
          indeterminate={indeterminate}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </Flex>
    </ThemeProvider>
  )
}

function ExampleStory() {
  const [checked, setChecked] = useState<boolean | undefined>(undefined)
  const indeterminate = checked === undefined
  const handleChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked)
  }, [])

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" as="label">
        <Switch checked={checked || false} indeterminate={indeterminate} onChange={handleChange} />
        <Box marginLeft={3}>
          <Text size={1} weight="semibold">
            Label
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
