import type {Route} from './+types/home'
import {Welcome} from '../welcome/welcome'

export function meta({}: Route.MetaArgs) {
  return [{title: 'Sanity UI in React Router'}]
}

export default function Home() {
  return <Welcome />
}
