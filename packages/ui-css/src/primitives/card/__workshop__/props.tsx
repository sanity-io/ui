import {BG_PATTERNS, CARD_TONES} from '@sanity/ui-tokens/system'
import {useSelect} from '@sanity/ui-workshop'

import {box} from '../../box/box'
import {code} from '../../code/code'
import {stack} from '../../stack/stack'
import {text} from '../../text/text'
import {card} from '../card'

const CARD_PATTERN_OPTIONS = [undefined, ...BG_PATTERNS]

export default function PropsStory() {
  const tone = useSelect('Tone', CARD_TONES, 'default')
  const pattern = useSelect('Pattern', CARD_PATTERN_OPTIONS)

  return (
    <div className={stack({gap: 4, padding: 4})}>
      <div className={code({size: 1})}>{`button.card`}</div>
      <div className={box({display: 'flex'})}>
        <button className={card({__unstable_pattern: pattern, tone})}>
          <div className={box({padding: 3})}>
            <Content />
          </div>
        </button>
      </div>
      <div className={code({size: 1})}>{`button.card[data-hovered]`}</div>
      <div className={box({display: 'flex'})}>
        <button className={card({__unstable_pattern: pattern, tone})} data-hovered="">
          <div className={box({padding: 3})}>
            <Content />
          </div>
        </button>
      </div>
      <div className={code({size: 1})}>{`button.card[data-pressed]`}</div>
      <div className={box({display: 'flex'})}>
        <button className={card({__unstable_pattern: pattern, tone})} data-pressed="">
          <div className={box({padding: 3})}>
            <Content />
          </div>
        </button>
      </div>
      <div className={code({size: 1})}>{`button.card[data-selected]`}</div>
      <div className={box({display: 'flex'})}>
        <button className={card({__unstable_pattern: pattern, tone})} data-selected="">
          <div className={box({padding: 3})}>
            <Content />
          </div>
        </button>
      </div>
      <div className={code({size: 1})}>{`button.card:disabled`}</div>
      <div className={box({display: 'flex'})}>
        <button className={card({__unstable_pattern: pattern, tone})} disabled>
          <div className={box({padding: 3})}>
            <Content />
          </div>
        </button>
      </div>
    </div>
  )
}

function Content() {
  return (
    <div className={stack({gap: 3})}>
      <div className={text({})}>Text</div>
      <div className={box({muted: true, padding: 2})}>
        <div className={text({muted: true})}>Text</div>
      </div>
      {/* <div className={code({})}>Code</div> */}
    </div>
  )
}
