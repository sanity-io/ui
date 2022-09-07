import {Text} from '@sanity/ui'
import {ReferenceClassContent} from './classArticle'
import {ReferenceFunctionContent} from './functionArticle'
import {ReferenceInterfaceContent} from './interfaceArticle'
import {ReferenceTypeAliasContent} from './typeAliasArticle'
import {ReferenceVariableContent} from './variableArticle'

export function ReferenceArticleContent(props: any) {
  const {data} = props

  if (data._type === 'api.class') {
    return <ReferenceClassContent data={data} />
  }

  if (data._type === 'api.function') {
    return <ReferenceFunctionContent data={data} />
  }

  if (data._type === 'api.interface') {
    return <ReferenceInterfaceContent data={data} />
  }

  if (data._type === 'api.typeAlias') {
    return <ReferenceTypeAliasContent data={data} />
  }

  if (data._type === 'api.variable') {
    return <ReferenceVariableContent data={data} />
  }

  return (
    <Text>
      Unknown node type: <code>{data._type}</code>
    </Text>
  )
}
