import {CopyIcon} from '@sanity/icons/Copy'
import {EditIcon} from '@sanity/icons/Edit'
import {EllipsisHorizontalIcon} from '@sanity/icons/EllipsisHorizontal'
import {TrashIcon} from '@sanity/icons/Trash'
import {Box, Button, Text} from '@sanity/ui'
import {Menu, MenuButton, MenuDivider, MenuItem} from '@sanity/ui/menu'
import {useState} from 'react'
import {styled} from 'styled-components'

import {useThemer} from './context'
import {displayTitle, ThemerTheme} from './themes'
import {ThemeThumbnail} from './ThemeThumbnail'

/** The height of the title row, matching the menu button that overlays its right end */
const TITLE_ROW_HEIGHT = 25

const Root = styled.div`
  position: relative;
`

/** A bare button, so that the thumbnail and the title can carry the styling */
const PickButton = styled.button`
  appearance: none;
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: center;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

/**
 * Wraps the thumbnail with a gap for the ring that marks the applied theme —
 * hovering shows a faint ring, the applied theme the focus ring color, and
 * keyboard focus an outline further out so it shows on the applied theme too.
 */
const Frame = styled.span`
  display: block;
  padding: 2px;
  border-radius: 9px;
  transition: box-shadow 100ms;

  ${PickButton}:hover & {
    box-shadow: 0 0 0 2px var(--card-border-color);
  }

  ${PickButton}[aria-pressed='true'] & {
    box-shadow: 0 0 0 2px var(--card-focus-ring-color);
  }

  ${PickButton}:focus-visible & {
    outline: 2px solid var(--card-focus-ring-color);
    outline-offset: 2px;
  }
`

const TitleRow = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: ${TITLE_ROW_HEIGHT}px;
  margin-top: 4px;
  padding: 0 ${TITLE_ROW_HEIGHT + 4}px;
`

/**
 * The actions menu sits at the right end of the title row, and only shows for
 * the applied theme, on hover, on keyboard focus, and while it is open —
 * its popover is portaled, so an open menu does not count as focus within
 */
const MenuSlot = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 100ms;

  ${Root}:hover &,
  ${Root}:focus-within &,
  &[data-visible='true'] {
    opacity: 1;
  }
`

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
  const [menuOpen, setMenuOpen] = useState(false)
  const title = displayTitle(theme.title)

  return (
    <Root>
      <PickButton
        aria-pressed={active}
        onClick={() => send({type: 'theme.pick', slug: theme.slug})}
        title={active ? `${title} (applied)` : `Apply ${title}`}
        type="button"
      >
        <Frame>
          <ThemeThumbnail options={theme.options} />
        </Frame>
        <TitleRow>
          <Box as="span" flex={1} style={{minWidth: 0}}>
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
        </TitleRow>
      </PickButton>

      <MenuSlot data-visible={active || menuOpen}>
        <MenuButton
          button={
            <Button
              aria-label={`Actions for ${title}`}
              fontSize={1}
              icon={EllipsisHorizontalIcon}
              mode="bleed"
              padding={1}
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
          popover={{placement: 'bottom-end', portal: true}}
        />
      </MenuSlot>
    </Root>
  )
}
