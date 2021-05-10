import {WorkshopFrame} from '@sanity/ui-workshop'
import React from 'react'
import ReactDOM from 'react-dom'
import {scopes} from '$workshop'

ReactDOM.render(
  <WorkshopFrame frameUrl="/frame/" scopes={scopes} title="@sanity/ui" />,
  document.getElementById('root')
)
