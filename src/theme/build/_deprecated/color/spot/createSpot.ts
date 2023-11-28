import {ThemeColorBase, ThemeColorSpot} from '../../../../system'
import {ThemeColorBuilderOpts} from '../factory'

export function createSpot(
  opts: ThemeColorBuilderOpts,
  base: ThemeColorBase,
  dark: boolean,
): ThemeColorSpot {
  return {
    gray: opts.spot({base, dark, key: 'gray'}),
    blue: opts.spot({base, dark, key: 'blue'}),
    purple: opts.spot({base, dark, key: 'purple'}),
    magenta: opts.spot({base, dark, key: 'magenta'}),
    red: opts.spot({base, dark, key: 'red'}),
    orange: opts.spot({base, dark, key: 'orange'}),
    yellow: opts.spot({base, dark, key: 'yellow'}),
    green: opts.spot({base, dark, key: 'green'}),
    cyan: opts.spot({base, dark, key: 'cyan'}),
  }
}
