import {AVATAR_COLORS, AVATAR_SIZE} from '@sanity/ui-tokens/system'
import {useSelect} from '@sanity/ui-workshop'

import {box} from '../../box/box'
import {avatar} from '../avatar'

export default function PropsStory() {
  const color = useSelect('Color', AVATAR_COLORS)
  const size = useSelect('Size', AVATAR_SIZE)

  return (
    <div
      className={box({
        alignItems: 'center',
        display: 'flex',
        height: 'fill',
        justifyContent: 'center',
        padding: 4,
      })}
    >
      <div
        className={avatar({
          color,
          size,
        })}
      ></div>
    </div>
  )
}
