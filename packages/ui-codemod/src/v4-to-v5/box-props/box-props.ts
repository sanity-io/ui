import {type API, type FileInfo} from 'jscodeshift'

import {type AttributeMods} from '../../types/AnyExpression'
import {transformAttributes} from '../../utils/transformAttributes'

const MODS: AttributeMods = {
  alignItems: {
    type: 'style-only',
    style: 'alignItems',
  },
  border: {
    type: 'mapped-only',
    mappings: {
      none: false,
      muted: true,
      default: true,
    },
  },
  borderTop: {
    type: 'mapped-only',
    mappings: {
      none: false,
      muted: true,
      default: true,
    },
  },
  borderRight: {
    type: 'mapped-only',
    mappings: {
      none: false,
      muted: true,
      default: true,
    },
  },
  borderBottom: {
    type: 'mapped-only',
    mappings: {
      none: false,
      muted: true,
      default: true,
    },
  },
  borderLeft: {
    type: 'mapped-only',
    mappings: {
      none: false,
      muted: true,
      default: true,
    },
  },
  borderWidth: {type: 'remove'},
  flex: {
    type: 'style-only',
    style: 'flex',
  },
  flexDirection: {
    type: 'style-only',
    style: 'flexDirection',
  },
  flexWrap: {
    type: 'style-only',
    style: 'flexWrap',
  },
  gapX: {
    type: 'rename',
    name: 'rowGap',
  },
  gapY: {
    type: 'rename',
    name: 'columnGap',
  },
  gridAutoColumns: {
    type: 'style-only',
    style: 'gridAutoColumns',
  },
  gridAutoFlow: {
    type: 'style-only',
    style: 'gridAutoFlow',
  },
  gridAutoRows: {
    type: 'style-only',
    style: 'gridAutoRow',
  },
  gridColumn: {
    type: 'mapped-only',
    mappings: {
      auto: 'auto',
      full: '1 / -1',
      1: 'span 1 / span 1',
      2: 'span 2 / span 2',
      3: 'span 3 / span 3',
      4: 'span 4 / span 4',
      5: 'span 5 / span 5',
      6: 'span 6 / span 6',
      7: 'span 7 / span 7',
      8: 'span 8 / span 8',
      9: 'span 9 / span 9',
      10: 'span 10 / span 10',
      11: 'span 11 / span 11',
      12: 'span 12 / span 12',
    },
  },
  gridColumnEnd: {
    type: 'mapped-only',
    mappings: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },
  },
  gridColumnStart: {
    type: 'mapped-only',
    mappings: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },
  },
  gridRow: {
    type: 'mapped-only',
    mappings: {
      auto: 'auto',
      full: '1 / -1',
      1: 'span 1 / span 1',
      2: 'span 2 / span 2',
      3: 'span 3 / span 3',
      4: 'span 4 / span 4',
      5: 'span 5 / span 5',
      6: 'span 6 / span 6',
      7: 'span 7 / span 7',
      8: 'span 8 / span 8',
      9: 'span 9 / span 9',
      10: 'span 10 / span 10',
      11: 'span 11 / span 11',
      12: 'span 12 / span 12',
    },
  },
  gridRowEnd: {
    type: 'mapped-only',
    mappings: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },
  },
  gridRowStart: {
    type: 'mapped-only',
    mappings: {
      auto: 'auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },
  },
  gridTemplateColumns: {
    type: 'style-only',
    style: 'gridTemplateColumns',
  },
  gridTemplateRows: {
    type: 'style-only',
    style: 'gridTemplateRows',
  },
  height: {
    type: 'mapped-only',
    mappings: {
      fill: '100%',
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      stretch: 'stretch',
    },
  },
  insetTop: {
    type: 'rename',
    name: 'top',
  },
  insetRight: {
    type: 'rename',
    name: 'right',
  },
  insetBottom: {
    type: 'rename',
    name: 'bottom',
  },
  insetLeft: {
    type: 'rename',
    name: 'left',
  },
  justifyContent: {
    type: 'style-only',
    style: 'justifyContent',
  },
  minWidth: {
    type: 'mapped-only',
    mappings: {
      full: '100%',
      0: '0',
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    },
  },
  muted: {type: 'remove'},
  outline: {
    type: 'style-only',
    style: 'outline',
  },
  pointerEvents: {
    type: 'style-only',
    style: 'pointerEvents',
  },
  shadow: {type: 'remove'},
  sizing: {
    type: 'style-mapped',
    style: 'boxSizing',
    mappings: {
      content: 'content-box',
      border: 'border-box',
    },
  },
  textAlign: {
    type: 'style-only',
    style: 'textAlign',
  },
  width: {
    type: 'mapped-only',
    mappings: {
      auto: 'auto',
      fill: '100%',
      stretch: 'stretch',
      min: 'min-content',
      max: 'max-content',
      0: '20rem',
      1: '40rem',
      2: '60rem',
      3: '80rem',
      4: '100rem',
      5: '120rem',
    },
  },
}

export const TODO_WARNING = 'Codemod could not update the prop below'

export default function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Box'},
    })
    .forEach((path) => {
      transformAttributes(j, path, MODS, TODO_WARNING)
    })

  return root.toSource()
}
