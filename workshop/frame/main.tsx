import {WorkshopFrame} from '@sanity/ui-workshop'
import React from 'react'
import ReactDOM from 'react-dom'
import Refractor from 'react-refractor'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import {scopes} from '$workshop'

Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

ReactDOM.render(
  <WorkshopFrame frameUrl="/frame/" scopes={scopes} title="@sanity/ui" />,
  document.getElementById('root')
)
