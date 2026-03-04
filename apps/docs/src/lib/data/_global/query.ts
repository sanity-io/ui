import groq from 'groq'

const NAV_PROJECTION = groq`
  _id,
  title,
  items[]{
    hidden,
    collapsed,
    "title": coalesce(title, route.title),
    menuTitle,
    segment,
    "targetId": target->_id,
    "isComponent": target->apiMember.isComponent,
    "isHook": target->apiMember.isHook,
    items[]{
      hidden,
      collapsed,
      "title": coalesce(title, route.title),
      menuTitle,
      segment,
      "targetId": target->_id,
      "isComponent": target->apiMember.isComponent,
      "isHook": target->apiMember.isHook,
      title,
      items[]{
        hidden,
        collapsed,
        "title": coalesce(title, route.title),
        menuTitle,
        segment,
        "targetId": target->_id,
        "isComponent": target->apiMember.isComponent,
        "isHook": target->apiMember.isHook,
        title
      }
    }
  }
`

export const MAIN_NAV_QUERY = groq`
*[_type == "nav" && id == $navId]{
  ${NAV_PROJECTION}
}[0]
`

export const SETTINGS_QUERY = groq`*[_id == "settings"]{_id,banner}[0]`

export const GLOBAL_QUERY = groq`{
  "nav": ${MAIN_NAV_QUERY},
  "navTrees": *[_type == "nav" && defined(id) && id != "main"]{
    _id,
    id,
    title
  }|order(id asc),
  "settings": ${SETTINGS_QUERY}
}`
