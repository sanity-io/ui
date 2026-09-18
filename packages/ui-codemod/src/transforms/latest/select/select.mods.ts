import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const SELECT_MODS: AttributeMods = {
  customValidity: {
    type: 'warn-only',
    warning:
      'Please double check the Select migration below. The customValidity prop is no longer supported. Handle validation externally and pass hasError to toggle the invalid styling.',
  },
  fontSize: {
    type: 'warn-only',
    warning:
      'Please double check the Select migration below. The fontSize prop is no longer supported. Select renders at the body1 text size.',
  },
  gap: {
    type: 'warn-only',
    warning:
      'Please double check the Select migration below. The gap prop is no longer supported. The spacing between the control and the icon is fixed.',
  },
  padding: {
    type: 'warn-only',
    warning:
      'Please double check the Select migration below. The padding prop is no longer supported. Use the density prop (regular or loose) instead.',
  },
  radius: {
    type: 'warn-only',
    warning:
      'Please double check the Select migration below. The radius prop is no longer supported. Select uses a fixed radius.',
  },
  readOnly: {
    type: 'warn-only',
    warning:
      'Please double check the Select migration below. The readOnly prop is no longer valid, as the readonly HTML attribute is invalid on select elements.',
  },
  space: {type: 'remove'},
}
