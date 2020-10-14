import {Theme} from '../../theme'
import {createObject, rem, responsive} from '../helpers'

export function getResponsiveSpace(theme: Theme, props: string[], spaceIndexes: number[] = []) {
  if (!Array.isArray(spaceIndexes)) {
    throw new Error('the property must be array of numbers')
  }

  return responsive(
    theme,
    spaceIndexes.map((spaceIndex) => createObject(props, rem(theme.space[spaceIndex])))
  )
}
