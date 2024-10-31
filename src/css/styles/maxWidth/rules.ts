import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const maxWidthRules: Rules = {
  ...responsiveRules('max-w-0', {maxWidth: `var(--container-0)`}),
  ...responsiveRules('max-w-1', {maxWidth: `var(--container-1)`}),
  ...responsiveRules('max-w-2', {maxWidth: `var(--container-2)`}),
  ...responsiveRules('max-w-3', {maxWidth: `var(--container-3)`}),
  ...responsiveRules('max-w-4', {maxWidth: `var(--container-4)`}),
  ...responsiveRules('max-w-5', {maxWidth: `var(--container-5)`}),
  ...responsiveRules('max-w-auto', {maxWidth: 'none'}),
  ...responsiveRules('max-w-fill', {maxWidth: '100%'}),
}
