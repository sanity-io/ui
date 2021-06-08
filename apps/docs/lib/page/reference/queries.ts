import groq from 'groq'
import {MAIN_NAV_QUERY, SETTINGS_QUERY} from '$queries'

export const DATA_QUERY = groq`{
  'nav': ${MAIN_NAV_QUERY},

  'packages': * [_type == 'api.package']{
    name
  },

  'package': * [_type == "api.package" && name == $name] {
    releases[]->{
      version,
    },

    'release': * [_id in ^.releases[]._ref && _type == "api.release" && version == $version][0] {
      _id,
      'currentMember': * [references(^._id) && slug.current == $slug][0] {
        ...,
        extends[]{
          ...,
          type[]{
            ...,
            reference->
          }
        },
        members[]{
          ...,
          type[]{
            ...,
            reference->{
              ...,
              members[]{
                ...,
                type[]{
                  ...,
                  reference->
                }
              },
              type[]{
                ...,
                reference->
              }
            }
          }
        },
        parameters[]{
          ...,
          type[]{
            ...,
            reference->
          }
        },
        propsType->{
          ...,
          extends[]{
            ...,
            type[]{
              ...,
              reference->{
                ...,
                members[]{
                  ...,
                  type[]{
                    ...,
                    reference->{
                      ...,
                      members[]{
                        ...,
                        type[]{
                          ...,
                          reference->
                        }
                      },
                      type[]{
                        ...,
                        reference->
                      }
                    }
                  }
                }
              }
            }
          },
          members[]{
            ...,
            type[]{
              ...,
              reference->{
                ...,
                members[]{
                  ...,
                  type[]{
                    ...,
                    reference->
                  }
                },
                type[]{
                  ...,
                  reference->
                }
              }
            }
          }
        },
        'referrers': * [_type != 'api.release' && references(^._id)]{
          'slug': slug.current,
          name
        }
      },
      version,
      content,
      members[]->{
        _type,
        name,
        'slug': slug.current,
        releaseTag,
        isReactComponentType
      }
    },
  }[0],

  'settings': ${SETTINGS_QUERY},
}`
