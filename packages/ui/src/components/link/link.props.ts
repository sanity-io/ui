import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface LinkProps extends React.ComponentProps<'a'> {
  /**
   * Sets `target="_blank"` and `rel="noopener noreferrer"` on its own.
   */
  openInNewTab?: boolean
  /**
   * Adds `text-decoration: underline`.
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
