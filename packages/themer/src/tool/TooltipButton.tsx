import {Button, ButtonProps, Text} from '@sanity/ui'
import {Tooltip} from '@sanity/ui/tooltip'

/**
 * A button with an animated tooltip instead of a `title` attribute, sized like
 * the Studio's own buttons (`padding` and `gap` of 2). Icon-only buttons take
 * the tooltip as their accessible name.
 *
 * @internal
 */
export function TooltipButton(props: ButtonProps & {tooltip: string}) {
  const {tooltip, ...buttonProps} = props

  return (
    <Tooltip animate content={<Text size={1}>{tooltip}</Text>} placement="bottom" portal>
      <Button
        aria-label={buttonProps.text === undefined ? tooltip : undefined}
        gap={2}
        padding={2}
        {...buttonProps}
      />
    </Tooltip>
  )
}
