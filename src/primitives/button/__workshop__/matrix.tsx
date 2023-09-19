import {icons} from '@sanity/icons'
import {Button, Card, Container, Flex, Text} from '@sanity/ui'
import {useAction, useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {useCallback} from 'react'
import {
  WORKSHOP_BUTTON_MODE_OPTIONS,
  WORKSHOP_BUTTON_TONE_OPTIONS,
  WORKSHOP_FLEX_JUSTIFY_OPTIONS,
  WORKSHOP_ICON_SYMBOL_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_SIZE_OPTIONS,
} from '../../../__workshop__/constants'
import withStudioTheme from '../../../helpers/withStudioTheme'

const buttonModes = Object.values(WORKSHOP_BUTTON_MODE_OPTIONS)
const buttonTones = Object.values(WORKSHOP_BUTTON_TONE_OPTIONS)

export default withStudioTheme(function UploadButtonStory() {
  const textProp = useText('Text', 'Label', 'Props')

  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_SIZE_OPTIONS, 1, 'Props')
  const icon = useSelect('Icon', WORKSHOP_ICON_SYMBOL_OPTIONS, '', 'Props')
  const iconRight = useSelect('Icon (right)', WORKSHOP_ICON_SYMBOL_OPTIONS, '', 'Props')
  const justify = useSelect('Justify', WORKSHOP_FLEX_JUSTIFY_OPTIONS, 'center', 'Props')
  const onClick = useAction('onClick')
  const paddingX = useSelect('Padding X', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const paddingY = useSelect('Padding Y', WORKSHOP_SPACE_OPTIONS, 3, 'Props')
  const selected = useBoolean('Selected', false, 'Props')
  const space = useSelect('Space', WORKSHOP_SPACE_OPTIONS, 3, 'Props')

  const renderTable = useCallback(
    (scheme: 'light' | 'dark') => (
      <Card scheme={scheme} padding={4} border marginBottom={4}>
        <table
          style={{
            borderCollapse: 'collapse',
            tableLayout: 'fixed',
            width: '100%',
            borderSpacing: '10px 10px',
          }}
        >
          <thead>
            <tr>
              <th>
                <Text weight="semibold">Tone</Text>
              </th>
              {buttonModes.map((mode) => (
                <th key={mode + 'head'}>
                  <Text weight="semibold" style={{textTransform: 'capitalize'}}>
                    {mode}
                  </Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{borderTop: '16px solid transparent'}}>
            {buttonTones.map((tone) => (
              <tr
                key={tone}
                style={{
                  borderBottom: '16px solid transparent',
                }}
              >
                <td style={{verticalAlign: 'middle', textAlign: 'center'}}>
                  <Text
                    style={{
                      textTransform: 'capitalize',
                    }}
                  >
                    {tone}
                  </Text>
                </td>
                {buttonModes.map((mode) => (
                  <td
                    key={tone + mode}
                    // justify the elements in the center
                    style={{verticalAlign: 'middle', textAlign: 'center'}}
                  >
                    <Button
                      disabled={disabled}
                      fontSize={fontSize}
                      icon={icon && icons[icon]}
                      iconRight={iconRight && icons[iconRight]}
                      justify={justify}
                      mode={mode}
                      onClick={onClick}
                      paddingX={paddingX}
                      paddingY={paddingY}
                      selected={selected}
                      space={space}
                      text={textProp}
                      tone={tone}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    ),
    [
      disabled,
      fontSize,
      icon,
      iconRight,
      justify,
      onClick,
      paddingX,
      paddingY,
      selected,
      space,
      textProp,
    ],
  )

  return (
    <Card height="fill" tone="transparent">
      <Flex align="center" height="fill" justify="center">
        <Container width={1}>
          {renderTable('light')}
          {renderTable('dark')}
        </Container>
      </Flex>
    </Card>
  )
})
