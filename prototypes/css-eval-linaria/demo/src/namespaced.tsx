import {createRoot} from 'react-dom/client'

import * as v1 from '../../button-lib/dist/namespaced/index.js'
import '../../button-lib/dist/namespaced/style.css'
import * as v2 from '../../button-lib-v2/dist/namespaced/index.js'
import '../../button-lib-v2/dist/namespaced/style.css'

import {App} from './App'

const tonesV1 = ['default', 'primary', 'positive', 'caution', 'critical']
const tonesV2 = ['default', 'brand', 'primary', 'positive', 'caution', 'critical']

createRoot(document.getElementById('root')!).render(
  <App
    flavor="namespaced"
    v1={{...v1, version: '1.0.0', tones: tonesV1}}
    v2={{...v2, version: '2.0.0', tones: tonesV2}}
  />,
)
