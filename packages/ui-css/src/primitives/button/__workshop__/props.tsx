import {SpinnerIcon} from '@sanity/icons'
import {BUTTON_MODES, ELEMENT_TONES} from '@sanity/ui-tokens/system'
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
import {button} from '../button'

export default function PropsStory() {
  const mode = useSelect('Mode', BUTTON_MODES, 'default')
  const tone = useSelect('Tone', ELEMENT_TONES, 'default')

  return (
    <div className={stack({flex: 1, height: 'fill', overflow: 'auto', gap: 4, padding: 4})}>
      <div className={code({size: 1})}>{`button`}</div>
      <div className={box({display: 'flex'})}>
        <button className={button({mode, tone})}>
          <div className={box({padding: 3})}>
            {/* <div className={text({})}>button</div> */}
            <Content />
          </div>
        </button>
      </div>

      <div className={code({size: 1})}>{`button[data-hovered]`}</div>
      <div className={box({display: 'flex'})}>
        <button className={button({mode, tone})} data-hovered="">
          <div className={box({padding: 3})}>
            {/* <div className={text({})}>button</div> */}
            <Content />
          </div>
        </button>
      </div>

      <div className={code({size: 1})}>{`button[data-selected]`}</div>
      <div className={box({display: 'flex'})}>
        <button className={button({mode, tone})} data-selected="">
          <div className={box({padding: 3})}>
            {/* <div className={text({})}>button</div> */}
            <Content />
          </div>
        </button>
      </div>

      <div className={code({size: 1})}>{`button:disabled`}</div>
      <div className={box({display: 'flex'})}>
        <button className={button({mode, tone})} disabled>
          <div className={box({padding: 3})}>
            {/* <div className={text({})}>button</div> */}
            <Content />
          </div>
        </button>
      </div>
    </div>
  )
}

// function Content() {
//   return (
//     <div className={stack({gap: 3})}>
//       <div className={text({})}>Text</div>
//       <div className={box({muted: true, padding: 2})}>
//         <div className={text({muted: true})}>Text</div>
//       </div>
//       {/* <div className={code({})}>Code</div> */}
//     </div>
//   )
// }

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
      <div className={hotkeys({})}>
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
