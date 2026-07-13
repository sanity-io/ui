import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface LinkProps extends React.ComponentProps<'a'> {
  /** If true, sets `target="_blank"` and `rel="noopener noreferrer"` */
  openInNewTab?: boolean
  /**
   * If true, sets `text-decoration: underline`
   *
   * @defaultValue true
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
