/**
 * Documented gaps: everything here is wrong CSS but compiles. These are the
 * limits of Griffel's typing (shared with every csstype-based API, including
 * vanilla-extract's `style()` for the value cases).
 */
import {makeStyles} from '@griffel/react'

// 1. Misspelled property names are accepted: `GriffelStyle` is a union with an
//    index signature (`[Property: string]: GriffelStyle | GriffelStylesCSSValue`)
//    that exists to allow nested selectors such as '& > span' and ':hover'.
//    @griffel/eslint-plugin and the devtools catch these at lint/run time instead.
makeStyles({root: {colr: 'red', paddingTpo: '4px'}})

// 2. Most known properties accept any string: csstype's unions end in `(string & {})`
//    (properties with a closed keyword set, e.g. `position`, are strict — see caught.tsx).
makeStyles({root: {display: 'flexx', alignItems: 'centre'}})

// 3. A raw `var()` string bypasses the typed `tokens` object. Convention (or a
//    lint rule banning the string form) is what keeps tokens typed.
makeStyles({root: {paddingTop: 'var(--sui-space-99)'}})
