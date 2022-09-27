import groq from 'groq'

export const MAIN_NAV_QUERY = groq`
*[_type == "nav" && id in ["main"]]{
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
}[0]
`

export const SETTINGS_QUERY = groq`*[_id == "settings"]{_id,banner}[0]`

export const GLOBAL_QUERY = groq`{
  "nav": ${MAIN_NAV_QUERY},
  "settings": ${SETTINGS_QUERY}
}`
