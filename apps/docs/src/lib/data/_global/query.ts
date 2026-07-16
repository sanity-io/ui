import {defineQuery} from 'next-sanity'

const MAIN_NAV_QUERY = defineQuery(`
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
`)

const SETTINGS_QUERY = defineQuery(`*[_id == "settings"]{_id,banner}[0]`)

export const GLOBAL_QUERY = defineQuery(`{
  "nav": ${MAIN_NAV_QUERY},
  "settings": ${SETTINGS_QUERY}
}`)
