import {style, StyleRule} from '@vanilla-extract/css'
import {MEDIA_1, MEDIA_2, MEDIA_3, MEDIA_4, MEDIA_5, MEDIA_6} from '../constants'
import {Media} from '../types'

export function responsiveStyles<Prefix extends string | number>(
  prefix: Prefix,
  rule: StyleRule,
): Record<`${Prefix}_${Media}`, string> {
  return {
    [`${prefix}_0`]: style(rule),
    [`${prefix}_1`]: style({'@media': {[MEDIA_1]: rule}}),
    [`${prefix}_2`]: style({'@media': {[MEDIA_2]: rule}}),
    [`${prefix}_3`]: style({'@media': {[MEDIA_3]: rule}}),
    [`${prefix}_4`]: style({'@media': {[MEDIA_4]: rule}}),
    [`${prefix}_5`]: style({'@media': {[MEDIA_5]: rule}}),
    [`${prefix}_6`]: style({'@media': {[MEDIA_6]: rule}}),
  } as Record<`${Prefix}_${Media}`, string>
}
