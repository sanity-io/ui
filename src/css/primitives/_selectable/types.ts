import type {ThemeColorStateToneKey} from '@sanity/ui/theme'

import type {RadiusStyleProps} from '../../aspects'

/** @internal */
export interface SelectableStyleProps extends RadiusStyleProps {
  tone?: ThemeColorStateToneKey
}
