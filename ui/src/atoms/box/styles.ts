import {Theme} from '../../theme'

export function boxBaseStyles() {
  return {
    display: 'block',
    padding: 0,
    margin: 0,
    // outline: '1px solid red',
  }
}

export function boxFlexStyles(props: {flex: number[]; theme: Theme}) {
  const {theme} = props

  return props.flex.map((flex, mqIndex) => {
    if (mqIndex === 0) return {flex}

    const mediaKey = `@media(min-width:${theme.media[mqIndex - 1]}px)`

    return {[mediaKey]: {flex}}
  })
}
