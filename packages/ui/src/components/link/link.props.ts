import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface LinkProps extends React.ComponentProps<'a'> {
  /**
   * Sets the link to `target="_blank"` and `rel="noopener noreferrer"`.
   */
  openInNewTab?: boolean
  /**
   * Underlines the link.
   */
  underlined?: boolean
}

export const linkProps: Record<string, PropDef> = {
  openInNewTab: {
    type: 'boolean',
  },
  underlined: {
    type: 'boolean',
    className: 'underlined',
  },
}
