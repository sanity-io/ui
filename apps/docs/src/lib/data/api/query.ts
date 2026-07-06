import groq from 'groq'

export const API_SYMBOLS_QUERY = groq`
*[_type in $memberTypes && references(^._id)] | order(name asc) {
  "_key": _id,
  _type,
  name,
  isReactComponentType
}
`

export const API_EXPORTS_QUERY = groq`
*[_type == "api.export" && references(^._id)] {
  "_key": _id,
  _type,
  name,
  path,
  "symbolNames": *[_type in $memberTypes && references(^._id)] | order(name asc) .name,
  "symbols": ${API_SYMBOLS_QUERY}
}
`

const API_RELEASES_QUERY = groq`
*[_type == "api.release" && references(^._id)] {
  "_key": _id,
  _type,
  _updatedAt,
  "exports": ${API_EXPORTS_QUERY},
  version
}
`

export const API_PACKAGES_QUERY = groq`
*[_type == "api.package" && name in ["types", "sanity"]] {
  "_key": _id,
  _type,
  _updatedAt,
  name,
  "latestVersion": latestRelease->{version}.version,
  "releases": ${API_RELEASES_QUERY},
  scope
}
`

const API_CLASS_PROJECTION = groq`
_id,
_type,
_updatedAt,
comment,
export->{name,path},
members[]{
  _type == 'api.constructorMember' => {
    _key,
    _type,
    comment,
    parameters[]{
      _key,
      _type,
      name,
      releaseTag,
      type[]{
        ...,
        symbol->
      }
    },
    releaseTag
  },
  _type == 'api.methodMember' => {
    _key,
    _type,
    comment,
    name,
    isOptional,
    isStatic,
    parameters[]{
      _key,
      _type,
      name,
      releaseTag,
      type[]{
        ...,
        symbol->
      }
    },
    releaseTag,
    returnType[]{
      ...,
      symbol->
    },
    typeParameters
  },
  _type == 'api.propertyMember' => {
    _key,
    _type,
    comment,
    name,
    isEventProperty,
    isOptional,
    isStatic,
    releaseTag,
    type[]{
      ...,
      symbol->
    }
  }
},
name,
package->{scope,name},
release->{version},
releaseTag
`

// TODO
const API_ENUM_PROJECTION = groq`
...,
export->{name,path},
package->{scope,name},
release->{version}
`

const API_FUNCTION_PROJECTION = groq`
_id,
_type,
_updatedAt,
comment,
export->{name,path},
isReactComponentType,
name,
package->{scope,name},
parameters[]{
  _key,
  _type,
  name,
  releaseTag,
  type[]{
    ...,
    symbol->
  }
},
'referrers': *[references(^._id)] {
  _type,
  name,
  export->{path},
  package->{scope,name},
  release->{version}
},
release->{version},
releaseTag,
returnType[]{
  ...,
  symbol->
},
typeParameters
`

const API_INTERFACE_PROJECTION = groq`
_id,
_type,
_updatedAt,
comment,
export->{name,path},
extends,
members[]{
  _type == 'api.callSignatureMember' => {
    _key,
    _type,
    comment,
    parameters[]{
      _key,
      _type,
      name,
      releaseTag,
      type[]{
        ...,
        symbol->
      }
    },
    releaseTag,
    returnType[]{
      ...,
      symbol->
    },
    typeParameters
  },

  _type == 'api.methodSignatureMember' => {
    _key,
    _type,
    comment,
    isOptional,
    name,
    parameters[]{
      _key,
      _type,
      name,
      releaseTag,
      type[]{
        ...,
        symbol->
      }
    },
    releaseTag,
    returnType[]{
      ...,
      symbol->
    },
    typeParameters
  },

  _type == 'api.indexSignatureMember' => {
    _key,
    _type,
    comment,
    releaseTag,
    parameters[]{
      _key,
      _type,
      name,
      releaseTag,
      type[]{
        ...,
        symbol->
      }
    },
    returnType[]{
      ...,
      symbol->
    }
  },

  _type == 'api.propertySignatureMember' => {
    _key,
    _type,
    comment,
    isOptional,
    name,
    releaseTag,
    comment,
    type[]{
      ...,
      symbol->
    }
  }
},
name,
package->{scope,name},
'referrers': *[references(^._id)] {
  _type,
  name,
  export->{path},
  package->{scope,name},
  release->{version}
},
release->{version},
releaseTag,
slug,
typeParameters
`

const API_NAMESPACE_PROJECTION = groq`
_id,
_type,
_updatedAt,
comment,
export->{name,path},
members[]{
  _type == 'api.functionMember' => {
    _key,
    _type,
    comment,
    name,
    parameters[]{
      _key,
      _type,
      name,
      releaseTag,
      type[]{
        ...,
        symbol->
      }
    },
    releaseTag,
    returnType[]{
      ...,
      symbol->
    },
    typeParameters
  }
},
name,
package->{scope,name},
release->{version},
releaseTag
`

const API_TYPE_ALIAS_PROJECTION = groq`
_id,
_type,
_updatedAt,
comment,
export->{name,path},
name,
package->{scope,name},
release->{version},
releaseTag,
type[]{
  ...,
  symbol->
}
`

const API_VARIABLE_PROJECTION = groq`
_id,
_type,
comment,
export->{name,path},
isReactComponentType,
name,
package->{scope,name},
propsType->,
release->{version},
releaseTag,
'referrers': *[references(^._id)] {
  _type,
  name,
  export->{path},
  package->{scope,name},
  release->{version}
},
type[]{
  ...,
  symbol->
}
`

export const API_SYMBOL_PROJECTION = groq`
_type == 'api.class' => {
  ${API_CLASS_PROJECTION}
},

_type == 'api.enum' => {
  ${API_ENUM_PROJECTION}
},

_type == 'api.function' => {
  ${API_FUNCTION_PROJECTION}
},

_type == 'api.interface' => {
  ${API_INTERFACE_PROJECTION}
},

_type == 'api.namespace' => {
  ${API_NAMESPACE_PROJECTION}
},

_type == 'api.typeAlias' => {
  ${API_TYPE_ALIAS_PROJECTION}
},

_type == 'api.variable' => {
  ${API_VARIABLE_PROJECTION}
}
`

export const API_SYMBOL_QUERY = groq`
*[
  _type in $symbolTypes &&
  name == $symbolName &&
  package->name == $packageName &&
  package->scope == $packageScope &&
  release->version == $version
] {
  ${API_SYMBOL_PROJECTION}
}[0]
`
