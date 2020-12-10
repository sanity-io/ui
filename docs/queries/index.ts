import {groq} from 'next-sanity'

export const FEATURES_QUERY = groq`
  *[_type == "features" && _id == "features"][0]
`

export const MAIN_NAV_QUERY = groq`
  *[_type == "nav" && id == "main"]{
    // id,
    items[]{
      hidden,
      collapsed,
      "title": coalesce(title, route.title),
      menuTitle,
      segment,
      "targetId": target->_id,
      items[]{
        hidden,
        collapsed,
        "title": coalesce(title, route.title),
        menuTitle,
        segment,
        "targetId": target->_id,
        title,
        items[]{
          hidden,
          collapsed,
          "title": coalesce(title, route.title),
          menuTitle,
          segment,
          "targetId": target->_id,
          title
        }
      }
    }
  }[0]
`

export const TARGET_QUERY = groq`*[_id == $id][0]`
