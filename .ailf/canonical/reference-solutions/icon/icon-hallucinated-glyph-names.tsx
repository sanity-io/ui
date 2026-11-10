// Real icons — there is no SendIcon / SettingsIcon in @sanity/icons.
// v5 requires per-icon subpath imports; the root entry no longer exports named icons.
import {CogIcon} from '@sanity/icons/Cog'
import {PublishIcon} from '@sanity/icons/Publish'
import {Button} from '@sanity/ui'

export function Actions() {
  return (
    <>
      <Button text="Send" iconStart={PublishIcon} level="primary" />
      <Button text="Settings" iconStart={CogIcon} level="tertiary" />
    </>
  )
}
