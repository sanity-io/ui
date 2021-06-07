import {APITokensInput} from './components/APITokensInput'

export const apiTokens = {
  type: 'array',
  name: 'api.tokens',
  title: 'Tokens',
  of: [{type: 'api.text'}, {type: 'api.reference'}],
  inputComponent: APITokensInput,
}
