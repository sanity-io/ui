import {SpinnerIcon} from '@sanity/icons'
import {ELEMENT_TONES} from '@sanity/ui-tokens/constants'
import {useSelect} from '@sanity/ui-workshop'

import {hotkeys} from '../../../components/hotkeys/hotkeys'
import {avatar} from '../../avatar/avatar'
import {badge} from '../../badge/badge'
import {box} from '../../box/box'
import {code} from '../../code/code'
import {kbd} from '../../kbd/kbd'
import {skeleton} from '../../skeleton/skeleton'
import {spinner, spinner_animatedIcon} from '../../spinner/spinner'
import {stack} from '../../stack/stack'
import {text} from '../../text/text'
import {selectable, selectable_hotkeys} from '../selectable'

export default function PropsStory() {
  const tone = useSelect('Tone', ELEMENT_TONES, 'default')

  return (
    <div className={stack({gap: 4, padding: 4})}>
      <div className={code({size: 1})}>{`button.selectable`}</div>
      <div className={box({display: 'flex'})}>
        <button className={selectable({radius: 3, tone})}>
          <div className={box({padding: 3})}>
            <Content />
          </div>
        </button>
      </div>
      <div className={code({size: 1})}>{`button.selectable[data-hovered]`}</div>
      <div className={box({display: 'flex'})}>
        <button className={selectable({radius: 3, tone})} data-hovered="">
          <div className={box({padding: 3})}>
            <Content />
          </div>
        </button>
      </div>
      <div className={code({size: 1})}>{`button.selectable[data-pressed]`}</div>
      <div className={box({display: 'flex'})}>
        <button className={selectable({radius: 3, tone})} data-pressed="">
          <div className={box({padding: 3})}>
            <Content />
          </div>
        </button>
      </div>
      <div className={code({size: 1})}>{`button.selectable[data-selected][data-focused]`}</div>
      <div className={box({display: 'flex'})}>
        <button className={selectable({radius: 3, tone})} data-focused="" data-selected="">
          <div className={box({padding: 3})}>
            <Content />
          </div>
        </button>
      </div>
      <div className={code({size: 1})}>{`button.selectable:disabled`}</div>
      <div className={box({display: 'flex'})}>
        <button className={selectable({radius: 3, tone})} disabled>
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
      <div className={box({borderTop: 'muted'})} />
      <div className={box({borderTop: 'default'})} />
      {/* <div className={box({borderTop: 'none'})} /> */}
      <div className={box({muted: true, padding: 2})}>
        <div className={text({muted: true})}>Text</div>
      </div>
      {/* <div className={code({})}>Code</div> */}
      <div className={badge({})}>
        <div className={text({size: 1})}>Badge</div>
      </div>
      <div
        className={avatar({
          color: 'magenta',
          size: 1,
        })}
      ></div>
      <div className={hotkeys({className: selectable_hotkeys()})}>
        <kbd className={kbd({})}>⌘</kbd>
        <kbd className={kbd({})}>+</kbd>
      </div>
      <div className={spinner({})}>
        <div className={text({size: 1})}>
          <SpinnerIcon className={spinner_animatedIcon()} />
        </div>
      </div>
      <div
        className={skeleton({radius: 2})}
        data-animated=""
        data-visible=""
        style={{width: 60, height: 9}}
      ></div>
      <pre className={code({size: 1})}>
        <code>Code</code>
      </pre>
    </div>
  )
}
