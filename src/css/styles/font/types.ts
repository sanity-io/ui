import {FontWeight} from '@sanity/ui/theme'

/**
 * @public
 */
export type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'initial'

/** @public */
export interface FontStyleProps {
  align?: TextAlign
  weight?: FontWeight
}
