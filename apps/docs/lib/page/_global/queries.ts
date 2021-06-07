import groq from 'groq'
import {MAIN_NAV_QUERY, SETTINGS_QUERY} from '$queries'

export const DATA_QUERY = groq`{
  'nav': ${MAIN_NAV_QUERY},
  'settings': ${SETTINGS_QUERY}
}`
