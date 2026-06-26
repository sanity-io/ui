import {Welcome} from '../welcome/welcome'
import type {Route} from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [{title: 'Sanity UI in React Router'}]
}

export default function Home() {
  return <Welcome />
}
