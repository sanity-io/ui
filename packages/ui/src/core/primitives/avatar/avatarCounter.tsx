import {forwardRef} from 'react'
import {css, styled} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {EMPTY_RECORD} from '../../constants'
import {_getArrayProp, _responsive, rem} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {AvatarSize} from '../../types/avatar'
import {Label} from '../label/label'

function _responsiveAvatarCounterSizeStyle(props: {$size: AvatarSize[]} & ThemeProps) {
  const {avatar, media} = getTheme_v2(props.theme)

  return _responsive(media, props.$size, (size) => {
    const avatarSize = avatar.sizes[size]

    if (!avatarSize) return EMPTY_RECORD

    return {
      borderRadius: rem(avatarSize.size / 2),
      minWidth: rem(avatarSize.size),
      height: rem(avatarSize.size),
    }
  })
}

function _avatarCounterBaseStyle(props: ThemeProps) {
  const {space} = getTheme_v2(props.theme)

  return css`
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    user-select: none;
    color: inherit;
    color: var(--card-fg-color);
    background: var(--card-bg-color);
    box-shadow:
      0 0 0 1px var(--card-bg-color),
      inset 0 0 0 1px var(--card-hairline-hard-color);
    padding: 0 ${rem(space[2])};

    &:not([hidden]) {
      display: flex;
    }
  `
}

const StyledAvatarCounter = styled.div<{$size: AvatarSize[]}>(
  _responsiveAvatarCounterSizeStyle,
  _avatarCounterBaseStyle,
)

/**
 * @public
 */
export interface AvatarCounterProps {
  count: number
  size?: AvatarSize | AvatarSize[]
  /** @deprecated No longer supported. */
  tone?: never
}

/**
 * @public
 */
export const AvatarCounter = forwardRef(function AvatarCounter(
  props: AvatarCounterProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {count, size: sizeProp = 1} = props
  const size = _getArrayProp(sizeProp)

  return (
    <StyledAvatarCounter $size={size} data-ui="AvatarCounter" ref={ref}>
      <Label
        as="span"
        size={size.map((s) => {
          if (s === 1) return 1
          if (s === 2) return 3
          if (s === 3) return 5

          return 0
        })}
        weight="medium"
      >
        {count}
      </Label>
    </StyledAvatarCounter>
  )
})
