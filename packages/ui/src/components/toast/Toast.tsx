import CloseIcon from '@sanity/icons/Close'
import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {Flex} from '../flex/Flex'
import {IconButton} from '../icon-button/IconButton'
import {Text} from '../text/Text'
import {type ToastProps, toastProps} from './toast.props'

const toastClassName = suffixClassName('sui-Toast')

export function Toast({
  tone = 'neutral',
  title,
  description,
  closable,
  onClose,
  ...props
}: ToastProps) {
  const {className, style, ...rest} = getProps({tone, ...props}, toastProps)

  const toastClasses = clsx(
    'sui-display-flex',
    'sui-flex-direction-column',
    'sui-gap3',
    'sui-radius3',
    'sui-shadow2',
    toastClassName,
    className,
  )

  // No live role here: screen reader announcements come from the announcer in the
  // Toaster container, which uses `isPoliteTone` to pick `status` or `alert`.
  return (
    <div {...rest} className={toastClasses} style={style} data-ui="Toast">
      <Flex gap={3} alignItems="flex-start" justifyContent="space-between">
        <Flex flexDirection="column" padding={3} gap={3}>
          <Text trim size={1} weight="medium">
            {title}
          </Text>
          {description && (
            <Text trim size={1}>
              {description}
            </Text>
          )}
        </Flex>
        {closable && (
          <Box padding={1} flexShrink={0}>
            <IconButton
              level="tertiary"
              icon={CloseIcon}
              aria-label={`Dismiss: ${title}`}
              onClick={onClose}
            />
          </Box>
        )}
      </Flex>
    </div>
  )
}

export type {ToastProps}
