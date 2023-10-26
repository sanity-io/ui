import {ThemeColorBase} from '../base'
import {ThemeColorBuilderOpts} from '../factory'
import {ThemeColorName} from '../types'
import {ThemeColorMuted} from './types'

export function createMutedTones(
  opts: ThemeColorBuilderOpts,
  base: ThemeColorBase,
  dark: boolean,
  name: ThemeColorName,
): ThemeColorMuted {
  return {
    default: {
      enabled: opts.muted({base, dark, tone: 'default', name, state: 'enabled'}),
      disabled: opts.muted({base, dark, tone: 'default', name, state: 'disabled'}),
      hovered: opts.muted({base, dark, tone: 'default', name, state: 'hovered'}),
      pressed: opts.muted({base, dark, tone: 'default', name, state: 'pressed'}),
      selected: opts.muted({base, dark, tone: 'default', name, state: 'selected'}),
    },
    transparent: {
      enabled: opts.muted({base, dark, tone: 'transparent', name, state: 'enabled'}),
      disabled: opts.muted({base, dark, tone: 'transparent', name, state: 'disabled'}),
      hovered: opts.muted({base, dark, tone: 'transparent', name, state: 'hovered'}),
      pressed: opts.muted({base, dark, tone: 'transparent', name, state: 'pressed'}),
      selected: opts.muted({base, dark, tone: 'transparent', name, state: 'selected'}),
    },
    primary: {
      enabled: opts.muted({base, dark, tone: 'primary', name, state: 'enabled'}),
      disabled: opts.muted({base, dark, tone: 'primary', name, state: 'disabled'}),
      hovered: opts.muted({base, dark, tone: 'primary', name, state: 'hovered'}),
      pressed: opts.muted({base, dark, tone: 'primary', name, state: 'pressed'}),
      selected: opts.muted({base, dark, tone: 'primary', name, state: 'selected'}),
    },
    positive: {
      enabled: opts.muted({base, dark, tone: 'positive', name, state: 'enabled'}),
      disabled: opts.muted({base, dark, tone: 'positive', name, state: 'disabled'}),
      hovered: opts.muted({base, dark, tone: 'positive', name, state: 'hovered'}),
      pressed: opts.muted({base, dark, tone: 'positive', name, state: 'pressed'}),
      selected: opts.muted({base, dark, tone: 'positive', name, state: 'selected'}),
    },
    caution: {
      enabled: opts.muted({base, dark, tone: 'caution', name, state: 'enabled'}),
      disabled: opts.muted({base, dark, tone: 'caution', name, state: 'disabled'}),
      hovered: opts.muted({base, dark, tone: 'caution', name, state: 'hovered'}),
      pressed: opts.muted({base, dark, tone: 'caution', name, state: 'pressed'}),
      selected: opts.muted({base, dark, tone: 'caution', name, state: 'selected'}),
    },
    critical: {
      enabled: opts.muted({base, dark, tone: 'critical', name, state: 'enabled'}),
      disabled: opts.muted({base, dark, tone: 'critical', name, state: 'disabled'}),
      hovered: opts.muted({base, dark, tone: 'critical', name, state: 'hovered'}),
      pressed: opts.muted({base, dark, tone: 'critical', name, state: 'pressed'}),
      selected: opts.muted({base, dark, tone: 'critical', name, state: 'selected'}),
    },
  }
}
