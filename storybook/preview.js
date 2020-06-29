import './base.css'

import {addDecorator} from '@storybook/react'
// import Refractor from 'react-refractor'
// import json from 'refractor/lang/json'
// import php from 'refractor/lang/php'
import {withTheme} from './decorators/theme'

addDecorator(withTheme)

// Refractor.registerLanguage(json)
// Refractor.registerLanguage(php)
