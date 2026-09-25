import {CopyIcon} from '@sanity/icons/Copy'
import {EditIcon} from '@sanity/icons/Edit'
import {EllipsisHorizontalIcon} from '@sanity/icons/EllipsisHorizontal'
import {TrashIcon} from '@sanity/icons/Trash'
import {Box, Button, Card, Text, useRootTheme} from '@sanity/ui'
import {Menu, MenuButton, MenuDivider, MenuItem} from '@sanity/ui/menu'
import {Tooltip} from '@sanity/ui/tooltip'
import {useState} from 'react'

import {useThemer} from './context'
import {displayTitle, ThemerTheme} from './themes'
import {ThemeThumbnail} from './ThemeThumbnail'

import {frame, menuCard, menuSlot, pickButton, root} from './ThemeCard.css'

/**
 * One theme in the list: the floating preview with the title below it, like
 * an appearance option in macOS System Settings. Clicking it applies the
 * theme to the whole Studio; its menu holds the edit, duplicate and remove
 * flows that apply to the theme.
 *
 * @internal
 */
export function ThemeCard(props: {active: boolean; theme: ThemerTheme}) {
  const {active, theme} = props
  const {send} = useThemer()
  const {scheme} = useRootTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const title = displayTitle(theme.title)

  return (
    <div className={root}>
      <button
        aria-pressed={active}
        className={pickButton}
        onClick={() => send({type: 'theme.pick', slug: theme.slug})}
        type="button"
      >
        <span className={frame}>
          <ThemeThumbnail options={theme.options} />
        </span>
        <Box as="span" display="block" paddingTop={2} paddingX={2}>
          <Text
            align="center"
            as="span"
            size={1}
            textOverflow="ellipsis"
            weight={active ? 'medium' : 'regular'}
          >
            {title}
          </Text>
        </Box>
      </button>

      {/* The tooltip wraps a card rather than the button: the menu button
          clones its button to wire it up, which a tooltip in between would
          swallow. The card keeps the button dark, as it sits on the dark
          half of the thumbnail, while the menu opens in the sidebar's scheme */}
      <div className={menuSlot} data-visible={menuOpen}>
        <Tooltip animate content={<Text size={1}>Show more</Text>} placement="bottom" portal>
          <Card className={menuCard} radius={2} scheme="dark">
            <MenuButton
              button={
                <Button
                  aria-label={`Show more for ${title}`}
                  fontSize={1}
                  icon={EllipsisHorizontalIcon}
                  mode="ghost"
                  padding={1}
                  radius={2}
                />
              }
              id={`themer-theme-${theme.slug}`}
              menu={
                <Menu>
                  {theme.source === 'custom' && (
                    <MenuItem
                      icon={EditIcon}
                      onClick={() => send({type: 'theme.edit', slug: theme.slug})}
                      text="Edit"
                    />
                  )}
                  <MenuItem
                    icon={CopyIcon}
                    onClick={() => send({type: 'theme.duplicate', slug: theme.slug})}
                    text={theme.source === 'custom' ? 'Duplicate' : 'Duplicate to edit'}
                  />
                  {theme.source !== 'config' && (
                    <>
                      <MenuDivider />
                      <MenuItem
                        icon={TrashIcon}
                        onClick={() => send({type: 'theme.remove', slug: theme.slug})}
                        text="Remove"
                        tone="critical"
                      />
                    </>
                  )}
                </Menu>
              }
              onClose={() => setMenuOpen(false)}
              onOpen={() => setMenuOpen(true)}
              popover={{animate: true, placement: 'bottom-end', portal: true, scheme}}
            />
          </Card>
        </Tooltip>
      </div>
    </div>
  )
}
